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
    <header className="flex flex-wrap items-center justify-center sm:justify-end gap-2 sm:gap-3 lg:gap-4 xl:gap-5 py-2 sm:py-3 lg:py-4 px-2 sm:px-4 lg:px-6">
      {/* Time */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        <span className="text-gray-800 font-semibold text-sm sm:text-base lg:text-lg tracking-tight">
          {formatTime(currentTime)}
        </span>
      </div>
      
      {/* Date */}
      <div className="text-gray-500 text-xs sm:text-sm lg:text-base font-medium">
        {formatDate(currentTime)}
      </div>
      
      {/* Divider */}
      <div className="hidden sm:block w-px h-5 lg:h-6 bg-gray-300"></div>
      
      {/* Humidity */}
      <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600">
        <div className="p-1 sm:p-1.5 bg-[#e8f4f4] rounded-md sm:rounded-lg">
          <Droplets size={14} className="sm:w-4 sm:h-4 text-[#00b4b4]" />
        </div>
        <span className="text-xs sm:text-sm font-medium">63%</span>
      </div>
      
      {/* Temperature */}
      <div className="flex items-center gap-1 sm:gap-1.5 text-gray-600">
        <div className="p-1 sm:p-1.5 bg-orange-50 rounded-md sm:rounded-lg">
          <Thermometer size={14} className="sm:w-4 sm:h-4 text-orange-400" />
        </div>
        <span className="text-xs sm:text-sm font-medium">26°C</span>
      </div>
      
      {/* Dark Mode Toggle (iOS Style) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`relative w-11 h-6 sm:w-14 sm:h-8 rounded-full transition-colors duration-300 ${
          isDarkMode ? 'bg-teal-500' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={isDarkMode}
        aria-label="Toggle dark mode"
      >
        <div 
          className={`absolute top-0.5 sm:top-1 w-5 h-5 sm:w-6 sm:h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${
            isDarkMode ? 'translate-x-5 sm:translate-x-7' : 'translate-x-0.5 sm:translate-x-1'
          }`}
        />
      </button>
    </header>
  );
}
