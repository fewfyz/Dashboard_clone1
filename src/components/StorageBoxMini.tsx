'use client';

import React from 'react';
import { Droplets, Thermometer, DoorOpen, Lightbulb } from 'lucide-react';

interface StorageBoxMiniProps {
  boxNumber: number;
  data: {
    total: number;
    delay: number;
    detection: number;
    scrap: number;
    humidity: number;
    temperature: number;
    normalCount: number;
    testingCount: number;
    doorStatus: 'on' | 'off';
    lightStatus: 'on' | 'off';
  };
}

export default function StorageBoxMini({ boxNumber, data }: StorageBoxMiniProps) {
  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 animate-fade-in">
      {/* Header */}
      <h3 className="text-base sm:text-lg font-bold text-gray-800 mb-4 tracking-tight">NO.{boxNumber} Storage box</h3>
      
      {/* Stats Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <div className="flex items-center gap-4 sm:gap-6 lg:gap-8">
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wide">Total</div>
            <div className="text-xl sm:text-2xl font-bold text-gray-800">{data.total}</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wide">Delay</div>
            <div className="text-xl sm:text-2xl font-bold text-teal-500">{data.delay}</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wide">Detection</div>
            <div className="text-xl sm:text-2xl font-bold text-red-500">{data.detection}</div>
          </div>
          <div className="text-center">
            <div className="text-[11px] sm:text-xs font-medium text-gray-400 uppercase tracking-wide">Scrap</div>
            <div className="text-xl sm:text-2xl font-bold text-teal-500">{data.scrap}</div>
          </div>
          
          {/* Environment */}
          <div className="hidden sm:flex items-center gap-1.5 ml-4">
            <Droplets size={18} className="text-teal-500" />
            <span className="text-sm font-medium text-gray-600">{data.humidity}%</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Thermometer size={18} className="text-orange-400" />
            <span className="text-sm font-medium text-gray-600">{data.temperature}°C</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${data.doorStatus === 'on' 
                ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg shadow-teal-500/25 focus-visible:ring-teal-500' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 focus-visible:ring-gray-400'
              }`}
          >
            <DoorOpen size={18} />
            <div className="text-xs text-left">
              <div className="font-medium">Door</div>
              <div className="font-bold uppercase">{data.doorStatus}</div>
            </div>
          </button>
          
          <button 
            className={`min-h-[44px] flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${data.lightStatus === 'on' 
                ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-lg shadow-teal-500/25 focus-visible:ring-teal-500' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 focus-visible:ring-gray-400'
              }`}
          >
            <Lightbulb size={18} />
            <div className="text-xs text-left">
              <div className="font-medium">Light</div>
              <div className="font-bold uppercase">{data.lightStatus}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 sm:gap-3">
        <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 text-white px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-emerald-500/25">
          Normal <span className="bg-white/25 px-2 py-0.5 rounded-full ml-1.5">{data.normalCount}</span>
        </span>
        <span className="bg-gradient-to-r from-amber-400 to-amber-500 text-gray-800 px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold shadow-md shadow-amber-500/25">
          Testing <span className="bg-white/30 px-2 py-0.5 rounded-full ml-1.5">{data.testingCount}</span>
        </span>
      </div>
    </div>
  );
}
