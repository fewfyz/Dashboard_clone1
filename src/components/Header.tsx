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
    <header className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 lg:gap-5 py-3 sm:py-4 lg:py-5 px-2 sm:px-4 lg:px-6">
      {/* Time */}
      <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-white/80 backdrop-blur-sm rounded-xl sm:rounded-2xl border border-teal-100/50 shadow-sm">
        <span className="text-gray-800 font-semibold text-sm sm:text-base lg:text-lg tracking-tight tabular-nums">
          {formatTime(currentTime)}
        </span>
      </div>
      
      {/* Date */}
      <div className="text-gray-500 text-xs sm:text-sm lg:text-base font-medium tracking-wide tabular-nums">
        {formatDate(currentTime)}
      </div>
      
      {/* Divider */}
      <div className="hidden sm:block w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent"></div>
      
      {/* Humidity */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-teal-100/50 shadow-sm transition-all hover:shadow-md">
        <div className="p-1.5 bg-gradient-to-br from-teal-50 to-cyan-100 rounded-lg">
          <Droplets size={16} className="text-[#00b4b4]" />
        </div>
        <span className="text-sm font-semibold text-gray-700 tabular-nums">63%</span>
      </div>
      
      {/* Temperature */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white/80 backdrop-blur-sm rounded-xl border border-orange-100/50 shadow-sm transition-all hover:shadow-md">
        <div className="p-1.5 bg-gradient-to-br from-orange-50 to-amber-100 rounded-lg">
          <Thermometer size={16} className="text-orange-500" />
        </div>
        <span className="text-sm font-semibold text-gray-700 tabular-nums">26°C</span>
      </div>
      
      {/* Dark Mode Toggle (iOS Style) */}
      <button
        onClick={() => setIsDarkMode(!isDarkMode)}
        className={`relative w-12 h-7 rounded-full transition-all duration-300 shadow-inner ${
          isDarkMode ? 'bg-gradient-to-r from-teal-500 to-cyan-500' : 'bg-gray-300'
        }`}
        role="switch"
        aria-checked={isDarkMode}
        aria-label="Toggle dark mode"
      >
        <div 
          className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-all duration-300 ${
            isDarkMode ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </header>
  );
}
