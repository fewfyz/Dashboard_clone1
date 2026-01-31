'use client';

import React, { useState, useEffect } from 'react';
import { Droplets, Thermometer } from 'lucide-react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState(new Date());

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
    <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-6 py-4 px-4 sm:px-8">
      {/* Time */}
      <div className="text-gray-700 font-semibold text-base sm:text-lg">
        {formatTime(currentTime)}
      </div>
      
      {/* Date */}
      <div className="text-gray-600 text-sm sm:text-base">
        {formatDate(currentTime)}
      </div>
      
      {/* Humidity */}
      <div className="flex items-center gap-1 text-gray-600 text-sm sm:text-base">
        <Droplets size={18} className="text-teal-500" />
        <span>63%</span>
      </div>
      
      {/* Temperature */}
      <div className="flex items-center gap-1 text-gray-600 text-sm sm:text-base">
        <Thermometer size={18} className="text-orange-400" />
        <span>26°C</span>
      </div>
      
      {/* Toggle */}
      <div className="w-12 sm:w-14 h-6 sm:h-7 bg-teal-500 rounded-full p-1 cursor-pointer">
        <div className="w-4 sm:w-5 h-4 sm:h-5 bg-white rounded-full ml-auto shadow-md"></div>
      </div>
    </div>
  );
}
