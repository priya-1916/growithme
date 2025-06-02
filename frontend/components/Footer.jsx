import React from 'react';

const Footer = () => (
  <footer className="bg-white shadow-inner">
    <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <span className="text-gray-600 text-sm text-center md:text-left">
        &copy; {new Date().getFullYear()} GroWithMe. All rights reserved.
      </span>
      <div className="flex space-x-6 text-sm">
        <a href="#" className="text-gray-600 hover:text-green-600 transition">Privacy Policy</a>
        <a href="#" className="text-gray-600 hover:text-green-600 transition">Terms of Service</a>
      </div>
    </div>
  </footer>
);

export default Footer;
