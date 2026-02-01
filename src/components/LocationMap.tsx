'use client';

import React, { useState } from 'react';
import { MapPin, Hexagon } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the map component to avoid SSR issues
const MapComponent = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 flex items-center justify-center">
      <div className="animate-pulse text-gray-400 text-sm">Loading map...</div>
    </div>
  ),
});

// Dam location coordinates (example: a dam in Thailand)
const DAM_LOCATION = {
  latitude: 14.4426,
  longitude: 101.3705,
  name: "Dam Monitoring Station"
};

export default function LocationMap() {
  const [activeView, setActiveView] = useState<'location' | 'geometry'>('location');
  const [mapEnabled, setMapEnabled] = useState(true);

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">LOCATION</h3>
        <div className="flex items-center gap-1.5 sm:gap-2 lg:gap-3">
          <span className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-500">{mapEnabled ? 'ON' : 'OFF'}</span>
          <button
            onClick={() => setMapEnabled(!mapEnabled)}
            className={`relative w-[42px] h-[26px] sm:w-[48px] sm:h-[28px] rounded-full transition-all duration-300 ease-out
              ${mapEnabled ? 'bg-[#34c759]' : 'bg-gray-300'}
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2`}
            role="switch"
            aria-checked={mapEnabled}
            aria-label="Toggle map"
          >
            <div className={`absolute top-[2px] w-[22px] h-[22px] sm:w-[24px] sm:h-[24px] bg-white rounded-full shadow-lg 
              transition-transform duration-300 ease-out
              ${mapEnabled ? 'translate-x-[18px] sm:translate-x-[22px]' : 'translate-x-[2px]'}`}
            />
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative flex-1 min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl mb-2 sm:mb-3 overflow-hidden shadow-inner">
        {mapEnabled ? (
          <MapComponent
            latitude={DAM_LOCATION.latitude}
            longitude={DAM_LOCATION.longitude}
            zoom={14}
            markerTitle={DAM_LOCATION.name}
            mapType={activeView === 'geometry' ? 'satellite' : 'street'}
          />
        ) : (
          <>
            {/* Simulated map grid when disabled */}
            <svg className="absolute inset-0 w-full h-full opacity-20">
              <defs>
                <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                  <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#64748b" strokeWidth="0.5"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
            
            {/* Disabled state message */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-gray-400 text-sm font-medium">Map disabled</div>
            </div>
          </>
        )}
      </div>

      {/* View Toggle Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          onClick={() => setActiveView('location')}
          className={`min-h-[36px] sm:min-h-[40px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${activeView === 'location'
              ? 'bg-[#00b4b4] text-white shadow-lg shadow-teal-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
          aria-pressed={activeView === 'location'}
        >
          <MapPin size={14} className="sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Location</span>
        </button>
        <button
          onClick={() => setActiveView('geometry')}
          className={`min-h-[36px] sm:min-h-[40px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${activeView === 'geometry'
              ? 'bg-[#00b4b4] text-white shadow-lg shadow-teal-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
          aria-pressed={activeView === 'geometry'}
        >
          <Hexagon size={14} className="sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Geometry</span>
        </button>
      </div>
    </div>
  );
}
