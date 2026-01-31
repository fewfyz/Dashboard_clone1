'use client';

import React, { useState } from 'react';
import { MapPin, Hexagon } from 'lucide-react';

export default function LocationMap() {
  const [activeView, setActiveView] = useState<'location' | 'geometry'>('location');
  const [mapEnabled, setMapEnabled] = useState(false);

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm h-full">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">LOCATION</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-500">OFF</span>
          <button
            onClick={() => setMapEnabled(!mapEnabled)}
            className={`w-12 h-6 rounded-full p-1 transition-colors ${mapEnabled ? 'bg-teal-500' : 'bg-gray-300'}`}
          >
            <div className={`w-4 h-4 bg-white rounded-full shadow transition-transform ${mapEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
          </button>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative h-32 sm:h-40 bg-gradient-to-br from-green-50 to-blue-50 rounded-xl mb-3 overflow-hidden">
        {/* Simulated map grid */}
        <svg className="absolute inset-0 w-full h-full opacity-30">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#94a3b8" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        
        {/* Map roads simulation */}
        <svg className="absolute inset-0 w-full h-full">
          <line x1="20%" y1="30%" x2="80%" y2="30%" stroke="#f97316" strokeWidth="2" opacity="0.6"/>
          <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="#f97316" strokeWidth="2" opacity="0.6"/>
          <line x1="30%" y1="50%" x2="70%" y2="70%" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5"/>
          <line x1="20%" y1="60%" x2="60%" y2="40%" stroke="#94a3b8" strokeWidth="1.5" opacity="0.5"/>
        </svg>

        {/* Location marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center shadow-lg animate-pulse">
              <MapPin size={16} className="text-white" />
            </div>
            <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-teal-500 rotate-45"></div>
          </div>
        </div>
      </div>

      {/* View Toggle Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => setActiveView('location')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-colors ${
            activeView === 'location'
              ? 'bg-teal-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <MapPin size={18} />
          <span>Location</span>
        </button>
        <button
          onClick={() => setActiveView('geometry')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl font-medium transition-colors ${
            activeView === 'geometry'
              ? 'bg-teal-500 text-white'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <Hexagon size={18} />
          <span>Geometry</span>
        </button>
      </div>
    </div>
  );
}
