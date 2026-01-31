'use client';

import React, { useState } from 'react';
import { MapPin, Hexagon } from 'lucide-react';

export default function LocationMap() {
  const [activeView, setActiveView] = useState<'location' | 'geometry'>('location');
  const [mapEnabled, setMapEnabled] = useState(false);

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 xl:p-6 h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">LOCATION</h3>
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
          <span className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-500">OFF</span>
          <button
            onClick={() => setMapEnabled(!mapEnabled)}
            className={`relative w-[42px] h-[26px] sm:w-[51px] sm:h-[31px] rounded-full transition-all duration-300 ease-out
              ${mapEnabled ? 'bg-[#34c759]' : 'bg-gray-300'}
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
            role="switch"
            aria-checked={mapEnabled}
            aria-label="Toggle map"
          >
            <div className={`absolute top-[2px] w-[22px] h-[22px] sm:w-[27px] sm:h-[27px] bg-white rounded-full shadow-lg 
              transition-transform duration-300 ease-out
              ${mapEnabled ? 'translate-x-[18px] sm:translate-x-[22px]' : 'translate-x-[2px]'}`}
            />
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-28 sm:h-36 lg:h-44 xl:h-48 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl mb-3 sm:mb-4 overflow-hidden shadow-inner">
        {/* Simulated map grid */}
        <svg className="absolute inset-0 w-full h-full opacity-20">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Map roads simulation */}
        <svg className="absolute inset-0 w-full h-full">
          <line x1="20%" y1="30%" x2="80%" y2="30%" stroke="#f97316" strokeWidth="2.5" opacity="0.5" strokeLinecap="round"/>
          <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#f97316" strokeWidth="2.5" opacity="0.5" strokeLinecap="round"/>
          <line x1="30%" y1="50%" x2="70%" y2="70%" stroke="#94a3b8" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
          <line x1="20%" y1="60%" x2="60%" y2="40%" stroke="#94a3b8" strokeWidth="1.5" opacity="0.4" strokeLinecap="round"/>
        </svg>

        {/* Location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full 
              flex items-center justify-center shadow-xl animate-pulse ring-2 sm:ring-4 ring-teal-200/50">
              <MapPin size={16} className="sm:w-5 sm:h-5 text-white" />
            </div>
            <div className="absolute -bottom-1 sm:-bottom-1.5 left-1/2 transform -translate-x-1/2 w-3 h-3 sm:w-4 sm:h-4 
              bg-gradient-to-br from-teal-400 to-teal-600 rotate-45 shadow-md"></div>
          </div>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          onClick={() => setActiveView('location')}
          className={`min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${activeView === 'location'
              ? 'bg-[#00b4b4] text-white shadow-lg shadow-teal-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
          aria-pressed={activeView === 'location'}
        >
          <MapPin size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="text-xs sm:text-sm">Location</span>
        </button>
        <button
          onClick={() => setActiveView('geometry')}
          className={`min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-3 rounded-lg sm:rounded-xl font-semibold 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${activeView === 'geometry'
              ? 'bg-[#00b4b4] text-white shadow-lg shadow-teal-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
          aria-pressed={activeView === 'geometry'}
        >
          <Hexagon size={16} className="sm:w-[18px] sm:h-[18px]" />
          <span className="text-xs sm:text-sm">Geometry</span>
        </button>
      </div>
    </div>
  );
}
