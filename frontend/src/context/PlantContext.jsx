import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

export const PlantContext = createContext();


export const PlantProvider = ({ children }) => {
  // Enhanced localStorage handling
  const loadFromLocalStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.error(`Error loading ${key} from localStorage:`, error);
      toast.error('Error loading your data. Please refresh the page.');
      return defaultValue;
    }
  };

  // State initialization with validation
  const [favorites, setFavorites] = useState(() => {
    const loaded = loadFromLocalStorage('plantFavorites', []);
    return Array.isArray(loaded) ? loaded : [];
  });

  const [bookmarks, setBookmarks] = useState(() => {
    const loaded = loadFromLocalStorage('plantBookmarks', []);
    return Array.isArray(loaded) ? loaded : [];
  });

  const [wateringSchedule, setWateringSchedule] = useState(() => {
    const loaded = loadFromLocalStorage('plantWateringSchedule', []);
    return Array.isArray(loaded) ? loaded : [];
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(() => {
    const storedToken = localStorage.getItem('token');
    return storedToken || null;
  });

  // Configure axios instance with interceptors
  const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
    timeout: 10000,
  });

  // Enhanced request interceptor
  api.interceptors.request.use((config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['Content-Type'] = 'application/json';
    return config;
  }, (error) => {
    toast.error('Network error. Please check your connection.');
    return Promise.reject(error);
  });

  // Enhanced response interceptor
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        setToken(null);
        setError('Your session has expired. Please log in again.');
        toast.error('Session expired. Please log in again.');
      } else if (error.response) {
        const message = error.response.data?.message || 'An error occurred';
        setError(message);
        toast.error(message);
      } else if (error.request) {
        setError('No response from server. Please try again later.');
        toast.error('Server not responding. Please try again later.');
      } else {
        setError('An unexpected error occurred.');
        toast.error('An unexpected error occurred.');
      }
      return Promise.reject(error);
    }
  );

  // Save states to localStorage with error handling
  useEffect(() => {
    try {
      localStorage.setItem('plantFavorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error saving favorites:', error);
    }
  }, [favorites]);

  useEffect(() => {
    try {
      localStorage.setItem('plantBookmarks', JSON.stringify(bookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  }, [bookmarks]);

  useEffect(() => {
    try {
      localStorage.setItem('plantWateringSchedule', JSON.stringify(wateringSchedule));
    } catch (error) {
      console.error('Error saving watering schedule:', error);
    }
  }, [wateringSchedule]);

  // Handle token changes
  useEffect(() => {
    if (token) {
      try {
        localStorage.setItem('token', token);
      } catch (error) {
        console.error('Error saving token:', error);
      }
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  // Enhanced favorites and bookmarks functions
  const addFavorite = useCallback((plant) => {
    try {
      if (!plant?._id) {
        throw new Error('Invalid plant data: missing _id');
      }
      
      setFavorites(prev => {
        const exists = prev.some(p => p._id === plant._id);
        if (exists) {
          toast.info('This plant is already in your favorites');
          return prev;
        }
        toast.success('Plant added to favorites!');
        return [...prev, plant];
      });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to add to favorites');
      throw err;
    }
  }, []);

  const addBookmark = useCallback((plant) => {
    try {
      if (!plant?._id) {
        throw new Error('Invalid plant data: missing _id');
      }
      
      setBookmarks(prev => {
        const exists = prev.some(p => p._id === plant._id);
        if (exists) {
          toast.info('This plant is already in your bookmarks');
          return prev;
        }
        toast.success('Plant added to bookmarks!');
        return [...prev, plant];
      });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to add to bookmarks');
      throw err;
    }
  }, []);

  const removeFavorite = useCallback((plantId) => {
    try {
      setFavorites(prev => {
        const updated = prev.filter(plant => plant._id !== plantId);
        if (updated.length === prev.length) {
          toast.warning('Plant not found in favorites');
          return prev;
        }
        toast.success('Plant removed from favorites');
        return updated;
      });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to remove from favorites');
    }
  }, []);

  const removeBookmark = useCallback((plantId) => {
    try {
      setBookmarks(prev => {
        const updated = prev.filter(plant => plant._id !== plantId);
        if (updated.length === prev.length) {
          toast.warning('Plant not found in bookmarks');
          return prev;
        }
        toast.success('Plant removed from bookmarks');
        return updated;
      });
    } catch (err) {
      setError(err.message);
      toast.error('Failed to remove from bookmarks');
    }
  }, []);

//   const addWateringSchedule = useCallback(async (plantOrSchedule, wateringDate) => {
//   try {
//     let plant, scheduleDate;
    
//     // Handle both parameter formats
//     if (wateringDate) {
//       // Old format: (plant, date)
//       plant = plantOrSchedule;
//       scheduleDate = wateringDate;
//     } else if (plantOrSchedule.plantName && plantOrSchedule.wateringDate) {
//       // New format: complete schedule object
//       plant = {
//         _id: plantOrSchedule._id || `temp_${Date.now()}`,
//         name: plantOrSchedule.plantName
//       };
//       scheduleDate = new Date(`${plantOrSchedule.wateringDate}T${plantOrSchedule.wateringTime || '00:00'}`);
//     } else {
//       throw new Error('Invalid parameters for addWateringSchedule');
//     }

//     // Rest of your validation and logic...
//     if (!plant?._id || !plant?.name || !scheduleDate) {
//       throw new Error('Invalid plant or watering date data');
//     }

//     const parsedDate = new Date(scheduleDate);
//     if (isNaN(parsedDate.getTime())) {
//       throw new Error('Invalid watering date format');
//     }

//     // ... rest of the function remains the same
//   } catch (error) {
//     // ... error handling
//   }
// }, [token, api]);
const addWateringSchedule = useCallback(async (newSchedule) => {
  try {
    setIsLoading(true);
    
    // Validate the schedule object
    if (!newSchedule?.plantName || !newSchedule?.wateringDate) {
      throw new Error('Invalid schedule data');
    }

    // For local state update
    const tempId = `local_${Date.now()}`;
    
    // Create the schedule object
    const scheduleToAdd = {
      _id: tempId,
      plantName: newSchedule.plantName,
      wateringDate: newSchedule.wateringDate,
      wateringTime: newSchedule.wateringTime || '00:00',
      createdAt: new Date().toISOString()
    };

    // Update local state immediately
    setWateringSchedule(prev => [...prev, scheduleToAdd]);
    
    // If authenticated, also save to server
    if (token) {
      const response = await api.post('/watering/watering-schedules', {
        plantName: newSchedule.plantName,
        wateringDate: newSchedule.wateringDate,
        wateringTime: newSchedule.wateringTime
      });
      
      // Replace the local schedule with server response
      setWateringSchedule(prev => 
        prev.map(item => 
          item._id === tempId ? response.data : item
        )
      );
    }

    toast.success('Watering scheduled successfully!');
    return true;
    
  } catch (error) {
    // Revert local changes if error occurs
    setWateringSchedule(prev => prev.filter(item => !item._id.startsWith('local_')));
    
    const errorMsg = error.response?.data?.message || error.message || 'Failed to schedule watering';
    setError(errorMsg);
    toast.error(errorMsg);
    throw error;
  } finally {
    setIsLoading(false);
  }
}, [token, api]);

  const removeWateringSchedule = useCallback(async (scheduleId) => {
    try {
      setIsLoading(true);
      
      if (scheduleId.startsWith('local_')) {
        // Handle local-only schedules
        setWateringSchedule(prev => prev.filter(item => item._id !== scheduleId));
        toast.success('Local watering schedule removed');
        return;
      }

      if (!token) {
        throw new Error('Authentication required to remove server schedules');
      }

      // Make authenticated API request
      await api.delete(`/watering/watering-schedules/${scheduleId}`);
      setWateringSchedule(prev => prev.filter(item => item._id !== scheduleId));
      toast.success('Watering schedule removed');
      
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Failed to remove schedule';
      setError(errorMsg);
      toast.error(errorMsg);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [token, api]);

  // Clear error function
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <PlantContext.Provider
      value={{
        favorites,
        bookmarks,
        wateringSchedule,
        isLoading,
        error,
        token,
        setToken,
        addFavorite,
        addBookmark,
        addWateringSchedule,
        removeFavorite,
        removeBookmark,
        removeWateringSchedule,
        clearError
      }}
    >
      {children}
    </PlantContext.Provider>
  );
};