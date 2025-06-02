


import React, { useState, useContext, useEffect } from 'react';
import { PlantContext } from '../src/context/PlantContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];
const MAX_PLANT_NAME_LENGTH = 30;

const UserDashboard = () => {
  const {
    favorites,
    bookmarks,
    wateringSchedule,
    addWateringSchedule,
    removeFavorite,
    removeBookmark,
    removeWateringSchedule,
    isLoading,
    error,
    token,
    setToken,
    userEmail
  } = useContext(PlantContext);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    plantName: '',
    date: '',
    time: ''
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (!token) {
      toast.error('Please login to access your dashboard');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!formData.plantName.trim()) {
      errors.plantName = 'Plant name is required';
      isValid = false;
    } else if (formData.plantName.length > MAX_PLANT_NAME_LENGTH) {
      errors.plantName = `Plant name must be less than ${MAX_PLANT_NAME_LENGTH} characters`;
      isValid = false;
    }

    if (!formData.date) {
      errors.date = 'Date is required';
      isValid = false;
    }

    if (!formData.time) {
      errors.time = 'Time is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

 const formatScheduleDate = (dateString, timeString) => {
  try {
    if (!dateString) return 'Date not set';
    
    // Extract just the date part (YYYY-MM-DD)
    const datePart = dateString.split('T')[0];
    
    // Format time string (ensure HH:MM:SS format)
    let formattedTime = '00:00:00'; // default
    if (timeString) {
      const timeParts = timeString.split(':');
      if (timeParts.length >= 2) {
        formattedTime = `${timeParts[0].padStart(2, '0')}:${timeParts[1].padStart(2, '0')}:00`;
      }
    }
    
    const date = new Date(`${datePart}T${formattedTime}`);
    
    if (isNaN(date.getTime())) {
      console.error('Invalid date:', { dateString, timeString });
      return 'Invalid date';
    }
    
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  } catch (error) {
    console.error('Date formatting error:', error);
    return 'Invalid date format';
  }
};

  const handleAddWateringSchedule = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    
    try {
      // Combine date and time with proper formatting
      const formattedTime = formData.time.includes(':') && formData.time.split(':').length === 2 
        ? `${formData.time}:00` 
        : formData.time;
      
      const wateringDateTime = new Date(`${formData.date}T${formattedTime}`);
      
      if (isNaN(wateringDateTime.getTime())) {
        throw new Error('Invalid date/time combination');
      }

      const isoString = wateringDateTime.toISOString();

      const requestBody = {
        plantName: formData.plantName,
        wateringDate: formData.date,
        wateringTime: formData.time,
        emailData: {
          email: userEmail,
          plantName: formData.plantName,
          wateringDate: isoString
        }
      };

      const response = await fetch('https://grow-backend-1.onrender.com/api/watering/watering-schedules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(requestBody)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to schedule watering');
      }

      // Update local state with email status
      const newSchedule = {
        _id: data._id,
        plantName: formData.plantName,
        wateringDate: formData.date,
        wateringTime: formData.time,
        createdAt: data.createdAt,
        emailSent: data.emailSent || false
      };
      
      addWateringSchedule(newSchedule);

      // Show appropriate message
      if (data.emailSent) {
        toast.success('Watering scheduled! Check your email for confirmation.');
      } else {
        toast.warning('Watering scheduled, but email confirmation failed');
      }

      setFormData({ plantName: '', date: '', time: '' });
      
    } catch (err) {
      console.error('Scheduling error:', err);
      toast.error(err.message || 'Failed to schedule watering');
      
      if (err.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        navigate('/login');
      }
    } finally {
      setIsSubmitting(false);
    }
  };
const handleSendEmail = async (scheduleId, plantName, wateringDate, wateringTime) => {
  try {
    const userEmail = localStorage.getItem('email') || '';
    
    if (!userEmail) {
      throw new Error('User email not found');
    }
    const formattedDate = formatScheduleDate(wateringDate, wateringTime);
    const response = await fetch('https://grow-backend-1.onrender.com/api/email/send-reminder', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        email: userEmail,
        plantName,
        wateringDate: formattedDate
      })
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to send email');
    }

    toast.success('Email reminder sent successfully!');
    
    // Update the local state to reflect email was sent
    const updatedSchedules = wateringSchedule.map(schedule => {
      if (schedule._id === scheduleId) {
        return { ...schedule, emailSent: true };
      }
      return schedule;
    });
    
    // You'll need to add a function in your context to update schedules
    // Or use a state management solution to update this
    
  } catch (err) {
    console.error('Email sending error:', err);
    toast.error(err.message || 'Failed to send email reminder');
  }
};
  const handleRemoveSchedule = async (scheduleId) => {
    try {
      await removeWateringSchedule(scheduleId);
      toast.success('Watering schedule removed');
    } catch (err) {
      toast.error(err.message || 'Failed to remove schedule');
    }
  };

  const chartData = [
    { name: 'Favorites', value: favorites.length },
    { name: 'Bookmarks', value: bookmarks.length },
    { name: 'Watering', value: wateringSchedule.length },
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8">
      <h1 className="text-4xl font-bold text-center text-[#2F855A] mb-8">
  My Plant Dashboard
</h1>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {chartData.map((stat, index) => (
          <div 
            key={stat.name}
            className="bg-white rounded-xl p-6 shadow-sm text-center transition-all hover:-translate-y-1 hover:shadow-md"
          >
            <h3 className="text-gray-600 text-lg font-semibold">{stat.name}</h3>
            <p 
              className="text-4xl font-bold mt-2"
              style={{ color: COLORS[index] }}
            >
              {stat.value}
            </p>
          </div>
        ))}
      </div>
{/* Pie Chart Visualization */}
<div className="bg-white rounded-xl p-6 shadow-sm mb-8">
  <h3 className="text-xl font-semibold text-green-800 mb-4">Your Plant Stats</h3>
  <div className="w-full" style={{ height: '300px' }}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
        >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
          contentStyle={{
            backgroundColor: '#2F855A',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
          }}
        />
        <Legend 
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            paddingTop: '20px'
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>

      {/* Watering Schedule Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-xl font-semibold text-green-800">Upcoming Watering</h3>
          <span className="bg-green-800 text-white rounded-full px-3 py-1 text-sm font-bold">
            {wateringSchedule.length}
          </span>
        </div>

        <form onSubmit={handleAddWateringSchedule} className="space-y-4 mt-6">
          <div className="space-y-2">
            <label htmlFor="plantName" className="block text-sm font-medium text-gray-600">
              Plant Name
            </label>
            <input
              id="plantName"
              name="plantName"
              type="text"
              value={formData.plantName}
              onChange={handleInputChange}
              maxLength={MAX_PLANT_NAME_LENGTH}
              placeholder="Enter plant name"
              className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                formErrors.plantName 
                  ? 'border-red-500 focus:ring-red-500' 
                  : 'border-gray-300 focus:ring-green-800'
              }`}
              disabled={isSubmitting || isLoading}
            />
            {formErrors.plantName && (
              <p className="text-red-500 text-xs mt-1">{formErrors.plantName}</p>
            )}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="date" className="block text-sm font-medium text-gray-600">
                Date
              </label>
              <input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formErrors.date 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-green-800'
                }`}
                disabled={isSubmitting || isLoading}
              />
              {formErrors.date && (
                <p className="text-red-500 text-xs mt-1">{formErrors.date}</p>
              )}
            </div>
            
            <div className="space-y-2">
              <label htmlFor="time" className="block text-sm font-medium text-gray-600">
                Time
              </label>
              <input
                id="time"
                name="time"
                type="time"
                value={formData.time}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 ${
                  formErrors.time 
                    ? 'border-red-500 focus:ring-red-500' 
                    : 'border-gray-300 focus:ring-green-800'
                }`}
                disabled={isSubmitting || isLoading}
              />
              {formErrors.time && (
                <p className="text-red-500 text-xs mt-1">{formErrors.time}</p>
              )}
            </div>
          </div>
          
          <button
            type="submit"
            disabled={isSubmitting || isLoading}
          className={`w-full bg-[#2F855A] hover:bg-[#2F855A] text-white font-bold py-3 px-4 rounded-md transition-colors ${
  isSubmitting || isLoading ? 'opacity-50 cursor-not-allowed' : ''
}`}

          >
            {isSubmitting ? 'Scheduling...' : 'Schedule Watering'}
          </button>
        </form>

        {wateringSchedule.length > 0 && (
          <div className="mt-6 space-y-3">
           
            {wateringSchedule.map((item) => (
  <div
    key={`water-${item._id}`}
    className={`bg-green-50 rounded-lg p-4 flex justify-between items-center transition-all hover:-translate-y-1 ${
      item.emailSent === false ? 'border-l-4 border-yellow-500' : ''
    }`}
  >
    <div className="flex-1 min-w-0">
      <h4 className="font-semibold text-gray-800 truncate">
        {item.plantName}
      </h4>
      <p className="text-gray-700 text-sm">
        <strong>Water on:</strong> {formatScheduleDate(item.wateringDate, item.wateringTime)}
      </p>
      {item.emailSent === false && (
        <p className="text-yellow-600 text-xs mt-1">
          (Email confirmation failed)
        </p>
      )}
    </div>
    <div className="flex items-center space-x-2">
    
    <button
  onClick={() => handleSendEmail(item._id, item.plantName, item.wateringDate, item.wateringTime)}
  disabled={!!isLoading}
  className={`relative flex items-center justify-center gap-2 text-sm font-medium px-4 py-2 rounded-md transition-all duration-200 focus:outline-none ${
    isLoading
      ? 'bg-emerald-300 text-white cursor-not-allowed opacity-70'
      : 'bg-emerald-500 text-white hover:bg-emerald-600 active:bg-emerald-700 shadow-sm hover:shadow-md'
  }`}
  aria-label="Send email reminder"
>
  <span className="text-base">📨</span>
  <span>{isLoading ? 'Sending...' : 'Send Reminder'}</span>
</button>


      <button
        onClick={() => handleRemoveSchedule(item._id)}
        disabled={isLoading}
        className="text-gray-500 text-xl hover:text-red-600 px-2 transition-colors"
        aria-label="Remove watering schedule"
      >
        ×
      </button>
    </div>
  </div>
))}
          </div>
        )}
      </div>

      {/* Favorites Section */}
      <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
        <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
          <h3 className="text-xl font-semibold text-green-800">Favorite Plants</h3>
          <span className="bg-green-800 text-white rounded-full px-3 py-1 text-sm font-bold">
            {favorites.length}
          </span>
        </div>
        {favorites.length === 0 ? (
          <p className="text-gray-600 text-center py-6 px-4 bg-gray-50 rounded-lg">
            No favorite plants yet.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
            {favorites.map((plant) => (
              <div
                key={`fav-${plant._id}`}
                className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-green-800 transition-all hover:-translate-y-1 hover:shadow-md"
              >
                <div className="flex justify-between items-start mb-2">
                  <h4 className="text-lg font-semibold text-gray-800 truncate">
                    {plant.name || plant.plant_name}
                  </h4>
                  <button
                    onClick={() => removeFavorite(plant._id)}
                    className="text-gray-500 text-xl hover:text-red-600 px-2 transition-colors"
                    aria-label="Remove from favorites"
                  >
                    ×
                  </button>
                </div>
                {plant.botanical_name && (
                  <p className="text-gray-600 italic text-sm mb-1 truncate">
                    {plant.botanical_name}
                  </p>
                )}
                {plant.description && (
                  <p className="text-gray-700 text-sm mt-2 line-clamp-2">
                    {plant.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

    {/* Bookmarks Section */}
<div className="bg-white rounded-xl p-6 shadow-sm mb-8">
  <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-4">
    <h3 className="text-xl font-semibold text-green-800">Bookmarked Plants</h3>
    <span className="bg-green-800 text-white rounded-full px-3 py-1 text-sm font-bold">
      {bookmarks.length}
    </span>
  </div>
  {bookmarks.length === 0 ? (
    <p className="text-gray-600 text-center py-6 px-4 bg-gray-50 rounded-lg">
      No bookmarked plants yet.
    </p>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
      {bookmarks.map((plant) => (
        <div
          key={`bookmark-${plant._id}`}
          className="bg-white rounded-lg p-5 shadow-sm border-l-4 border-green-800 transition-all hover:-translate-y-1 hover:shadow-md"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-lg font-semibold text-gray-800 truncate">
              {plant.name || plant.plant_name}
            </h4>
            <button
              onClick={() => removeBookmark(plant._id)}
              className="text-gray-500 text-xl hover:text-red-600 px-2 transition-colors"
              aria-label="Remove from bookmarks"
            >
              ×
            </button>
          </div>

          {plant.botanical_name && (
            <p className="text-gray-600 italic text-sm mb-1 truncate">
              {plant.botanical_name}
            </p>
          )}

          {plant.how_to_grow && (
            <details className="mt-3 pt-3 border-t border-gray-200 text-sm">
              <summary className="text-green-800 font-bold cursor-pointer">
                Growing Tips
              </summary>
              <ul className="list-disc pl-5 mt-2 text-gray-700 space-y-1 max-h-40 overflow-y-auto pr-2">
                {plant.how_to_grow.map((tip, i) => (
                  <li key={`tip-${plant._id}-${i}`}>
                    {tip}
                  </li>
                ))}
              </ul>
            </details>
          )}
        </div>
      ))}
    </div>
  )}
</div>
</div>
  );
};

export default UserDashboard;

