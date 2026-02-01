'use client';

import React from 'react';
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

interface LocationMapProps {
  sensorId: string;
  latitude: number;
  longitude: number;
  mapView: 'street' | 'satellite';
  onMapViewChange: (view: 'street' | 'satellite') => void;
}

export default function LocationMap({ sensorId, latitude, longitude, mapView, onMapViewChange }: LocationMapProps) {
  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <div className="flex items-center gap-2">
          <MapPin size={16} className="sm:w-[18px] sm:h-[18px] text-teal-500" />
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">SENSOR LOCATION - {sensorId}</h3>
        </div>
      </div>

      {/* Map Area */}
      <div className="relative flex-1 min-h-[480px] sm:min-h-[560px] lg:min-h-[640px] bg-gradient-to-br from-emerald-50 via-cyan-50 to-blue-50 rounded-xl sm:rounded-2xl mb-2 sm:mb-3 overflow-hidden shadow-inner">
        <MapComponent
          latitude={latitude}
          longitude={longitude}
          zoom={15}
          markerTitle={`Sensor ${sensorId}`}
          mapType={mapView}
        />
      </div>

      {/* View Toggle Buttons */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3">
        <button
          onClick={() => onMapViewChange('street')}
          className={`min-h-[36px] sm:min-h-[40px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${mapView === 'street'
              ? 'bg-[#00b4b4] text-white shadow-lg shadow-teal-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
          aria-pressed={mapView === 'street'}
        >
          <MapPin size={14} className="sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Location</span>
        </button>
        <button
          onClick={() => onMapViewChange('satellite')}
          className={`min-h-[36px] sm:min-h-[40px] flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 rounded-lg sm:rounded-xl font-semibold 
            transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary
            ${mapView === 'satellite'
              ? 'bg-[#00b4b4] text-white shadow-lg shadow-teal-500/25'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
            }`}
          aria-pressed={mapView === 'satellite'}
        >
          <Hexagon size={14} className="sm:w-4 sm:h-4" />
          <span className="text-xs sm:text-sm">Geometry</span>
        </button>
      </div>
    </div>
  );
}
