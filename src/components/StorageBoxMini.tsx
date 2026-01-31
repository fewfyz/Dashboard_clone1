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
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 xl:p-6 animate-fade-in">
      {/* Header */}
      <h3 className="text-sm sm:text-base lg:text-lg font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">NO.{boxNumber} Storage box</h3>
      
      {/* Stats Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 mb-3 sm:mb-4">
        <div className="flex items-center gap-3 sm:gap-4 lg:gap-6 xl:gap-8">
          <div className="text-center">
            <div className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-400 uppercase tracking-wide">Total</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-800">{data.total}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-400 uppercase tracking-wide">Delay</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00b4b4]">{data.delay}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-400 uppercase tracking-wide">Detection</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-500">{data.detection}</div>
          </div>
          <div className="text-center">
            <div className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-400 uppercase tracking-wide">Scrap</div>
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-[#00b4b4]">{data.scrap}</div>
          </div>
          
          {/* Environment */}
          <div className="hidden sm:flex items-center gap-1 sm:gap-1.5 ml-2 sm:ml-4">
            <Droplets size={16} className="sm:w-[18px] sm:h-[18px] text-[#00b4b4]" />
            <span className="text-xs sm:text-sm font-medium text-gray-600">{data.humidity}%</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 sm:gap-1.5">
            <Thermometer size={16} className="sm:w-[18px] sm:h-[18px] text-orange-400" />
            <span className="text-xs sm:text-sm font-medium text-gray-600">{data.temperature}°C</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button 
            className={`min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${data.doorStatus === 'on' 
                ? 'bg-[#00b4b4] text-white focus-visible:ring-[#00b4b4]' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 focus-visible:ring-gray-400'
              }`}
          >
            <DoorOpen size={16} className="sm:w-[18px] sm:h-[18px]" />
            <div className="text-[10px] sm:text-xs text-left">
              <div className="font-medium">Door</div>
              <div className="font-bold uppercase">{data.doorStatus}</div>
            </div>
          </button>
          
          <button 
            className={`min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl transition-all duration-200
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
              ${data.lightStatus === 'on' 
                ? 'bg-[#00b4b4] text-white focus-visible:ring-[#00b4b4]' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200 focus-visible:ring-gray-400'
              }`}
          >
            <Lightbulb size={16} className="sm:w-[18px] sm:h-[18px]" />
            <div className="text-[10px] sm:text-xs text-left">
              <div className="font-medium">Light</div>
              <div className="font-bold uppercase">{data.lightStatus}</div>
            </div>
          </button>
        </div>
      </div>

      {/* Status Badges */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3">
        <span className="bg-[#00b4b4] text-white px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium">
          Normal <span className="bg-white/30 px-1.5 sm:px-2 py-0.5 rounded-full ml-1 sm:ml-1.5">{data.normalCount}</span>
        </span>
        <span className="bg-[#fbbf24] text-gray-800 px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs lg:text-sm font-medium">
          Testing <span className="bg-white/30 px-1.5 sm:px-2 py-0.5 rounded-full ml-1 sm:ml-1.5">{data.testingCount}</span>
        </span>
      </div>
    </div>
  );
}
