'use client';

import React, { useState } from 'react';
import { MapPin, Hexagon } from 'lucide-react';

export default function LocationMap() {
  const [activeView, setActiveView] = useState<'location' | 'geometry'>('location');
  const [mapEnabled, setMapEnabled] = useState(false);

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 h-full animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800 tracking-wide">LOCATION</h3>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[11px] sm:text-xs font-medium text-gray-500">OFF</span>
          <button
            onClick={() => setMapEnabled(!mapEnabled)}
            className={`relative w-[51px] h-[31px] rounded-full transition-all duration-300 ease-out
              ${mapEnabled ? 'bg-[#34c759]' : 'bg-gray-300'}
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
            role="switch"
            aria-checked={mapEnabled}
            aria-label="Toggle map"
          >
            <div className={`absolute top-[2px] w-[27px] h-[27px] bg-white rounded-full shadow-lg 
              transition-transform duration-300 ease-out
              ${mapEnabled ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}
            />
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-36 sm:h-44 lg:h-48 bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 rounded-2xl mb-4 overflow-hidden shadow-inner">
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
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full 
              flex items-center justify-center shadow-xl animate-pulse ring-4 ring-teal-200/50">
              <MapPin size={20} className="text-white" />
            </div>
            <div className="absolute -bottom-1.5 left-1/2 transform -translate-x-1/2 w-4 h-4 
              bg-gradient-to-br from-teal-400 to-teal-600 rotate-45 shadow-md"></div>
          </div>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveView('location')}
          className={`min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl font-semibold 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${activeView === 'location'
              ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg shadow-teal-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
          aria-pressed={activeView === 'location'}
        >
          <MapPin size={18} />
          <span className="text-sm">Location</span>
        </button>
        <button
          onClick={() => setActiveView('geometry')}
          className={`min-h-[44px] flex items-center justify-center gap-2 py-3 rounded-xl font-semibold 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${activeView === 'geometry'
              ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg shadow-teal-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
          aria-pressed={activeView === 'geometry'}
        >
          <Hexagon size={18} />
          <span className="text-sm">Geometry</span>
        </button>
      </div>
    </div>
  );
}
