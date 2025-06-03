import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://grow-backend-2.onrender.com/api/signup', {
        name,
        email,
        password,
      });
      setSuccessMessage(response.data.message);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || 'An error occurred');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white font-sans px-4">
      <div className="bg-white px-8 py-10 rounded-2xl shadow-2xl w-full max-w-md border border-green-100">
        <h2 className="text-4xl font-bold text-[#2F855A] mb-6 text-center">Create Account</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>}
        {successMessage && <p className="text-[#2ECC71] text-sm mb-4 text-center">{successMessage}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#2ECC71] focus:outline-none"
            required
          />
          <input
            type="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#2ECC71] focus:outline-none"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl shadow-sm focus:ring-2 focus:ring-[#2ECC71] focus:outline-none"
            required
          />
          <button
            type="submit"
            className="w-full bg-[#2F855A] text-white py-3 rounded-xl font-semibold hover:bg-[#27AE60] transition duration-300 shadow-md"
          >
            Sign Up
          </button>
        </form>
        <p className="mt-6 text-sm text-center text-gray-600">
          Already a user?{' '}
          <span
            className="text-[#2F855A] font-medium cursor-pointer hover:underline"
            onClick={() => navigate('/login')}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
