import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import Blog from '../pages/Blog';
import Learnmore from '../pages/Learnmore';
import UserDashboard from '../pages/UserDashboard';
import LanguageSelection from '../pages/LanguageSelection';
import { PlantProvider } from './context/PlantContext';
import { AuthProvider } from './context/AuthContext';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [language, setLanguage] = useState(localStorage.getItem('language') || '');
  const [languageSelected, setLanguageSelected] = useState(!!localStorage.getItem('language'));

  useEffect(() => {
    if (window.google && window.google.translate) {
      const select = document.querySelector('select.goog-te-combo');
      if (select) {
        select.value = language;
        select.dispatchEvent(new Event('change'));
      } else {
        setTimeout(() => {
          const select = document.querySelector('select.goog-te-combo');
          if (select) {
            select.value = language;
            select.dispatchEvent(new Event('change'));
          }
        }, 500);
      }
    }
  }, [language]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('language');
    setIsLoggedIn(false);
    setLanguage('');
    setLanguageSelected(false);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
    setLanguageSelected(true);
  };

  return (
    <Router>
      <AuthProvider>
      <PlantProvider>
        <div className="flex flex-col min-h-screen">
          <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login onLogin={handleLogin} />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/learn-more" element={<Learnmore />} />
              <Route
                path="/language-selection"
                element={
                  isLoggedIn ? (
                    <LanguageSelection setLanguage={handleLanguageChange} />
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/dashboard"
                element={
                  isLoggedIn ? (
                    languageSelected ? (
                      <Dashboard language={language} />
                    ) : (
                      <Navigate to="/language-selection" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/blog"
                element={
                  isLoggedIn ? (
                    languageSelected ? (
                      <Blog />
                    ) : (
                      <Navigate to="/language-selection" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route
                path="/user-dashboard"
                element={
                  isLoggedIn ? (
                    languageSelected ? (
                      <UserDashboard />
                    ) : (
                      <Navigate to="/language-selection" replace />
                    )
                  ) : (
                    <Navigate to="/login" replace />
                  )
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PlantProvider>
      </AuthProvider>
    </Router>
  );
};

export default App;
