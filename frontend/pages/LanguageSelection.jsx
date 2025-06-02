import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LanguageSelection = ({ setLanguage }) => {
  const navigate = useNavigate();
  const [selectedLang, setSelectedLang] = useState('');

  useEffect(() => {
    const addGoogleTranslateScript = () => {
      if (!document.getElementById('google-translate-script')) {
        const script = document.createElement('script');
        script.id = 'google-translate-script';
        script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        document.body.appendChild(script);
      }

      window.googleTranslateElementInit = () => {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            autoDisplay: false,
          },
          'google_translate_element'
        );
      };
    };

    addGoogleTranslateScript();
  }, []);

  const handleLanguageChange = (e) => {
    const langCode = e.target.value;
    setSelectedLang(langCode);

    const interval = setInterval(() => {
      const select = document.querySelector('.goog-te-combo');
      if (select) {
        select.value = langCode;
        select.dispatchEvent(new Event('change'));
        setLanguage(langCode);
        clearInterval(interval);
        navigate('/dashboard');
      }
    }, 500);
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-8">🌍 Choose Language</h1>
        <p className="text-gray-600 mb-6">Select your preferred language to continue</p>
        
        <select
          value={selectedLang}
          onChange={handleLanguageChange}
          className="w-full px-4 py-3 rounded-xl border border-gray-300 text-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition"
        >
          <option value="">-- Select Language --</option>
          <option value="en">English</option>
          <option value="ta">Tamil</option>
          <option value="hi">Hindi</option>
        </select>

        {selectedLang && (
          <p className="mt-4 text-sm text-gray-600 animate-pulse">
            Translating to {selectedLang.toUpperCase()}...
          </p>
        )}

        {/* Hidden translate widget */}
        <div id="google_translate_element" style={{ display: 'none' }}></div>
      </div>
    </div>
  );
};

export default LanguageSelection;
