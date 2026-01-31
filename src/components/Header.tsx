'use client';

import React, { useState, useEffect } from 'react';
import { Droplets, Thermometer } from 'lucide-react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year} / ${month} / ${day}`;
  };

  return (
    <header className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-5 py-4 px-4 sm:px-6">
      {/* Time */}
      <div className="flex items-center gap-2">
        <span className="text-gray-800 font-semibold text-base sm:text-lg tracking-tight">
          {formatTime(currentTime)}
        </span>
      </div>
      
      {/* Date */}
      <div className="text-gray-500 text-sm sm:text-base font-medium">
        {formatDate(currentTime)}
      </div>
      
      {/* Divider */}
      <div className="hidden sm:block w-px h-6 bg-gray-300"></div>
      
      {/* Humidity */}
      <div className="flex items-center gap-1.5 text-gray-600">
        <div className="p-1.5 bg-[#e8f4f4] rounded-lg">
          <Droplets size={16} className="text-[#00b4b4]" />
        </div>
        <span className="text-sm font-medium">63%</span>
      </div>
      
      {/* Temperature */}
      <div className="flex items-center gap-1.5 text-gray-600">
        <div className="p-1.5 bg-orange-50 rounded-lg">
          <Thermometer size={16} className="text-orange-400" />
        </div>
        <span className="text-sm font-medium">26°C</span>
      </div>
      
      {/* Dark Mode Toggle (iOS Style) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 ${
          isDarkMode ? 'bg-teal-500' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={isDarkMode}
        aria-label="Toggle dark mode"
      >
        <div 
          className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            isDarkMode ? 'translate-x-7' : 'translate-x-1'
          }`}
        />
      </button>
    </header>
  );
}
