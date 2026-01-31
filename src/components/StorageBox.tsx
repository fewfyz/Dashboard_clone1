'use client';

import React from 'react';
import { Droplets, Thermometer, DoorOpen, Lightbulb, ChevronDown, RefreshCw, ChevronRight } from 'lucide-react';
import StatusBadge from './StatusBadge';

interface StorageBoxProps {
  boxNumber: number;
  data: {
    total: number;
    delay: number;
    detection: number;
    scrap: number;
    humidity: number;
    temperature: number;
    statusCounts: {
      normal: number;
      testing: number;
      lost: number;
      damage: number;
      scrap: number;
    };
    doorStatus: 'on' | 'off';
    lightStatus: 'on' | 'off';
  };
}

export default function StorageBox({ boxNumber, data }: StorageBoxProps) {
  return (
    <div className="card mb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">NO.{boxNumber} Storage box</h2>
        <div className="flex items-center gap-2">
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <RefreshCw size={16} className="text-teal-500" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ChevronDown size={16} className="text-teal-500" />
          </button>
        </div>
      </div>
      
      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        <StatusBadge status="normal" count={data.statusCounts.normal} />
        <StatusBadge status="testing" count={data.statusCounts.testing} />
        <StatusBadge status="lost" count={data.statusCounts.lost} />
        <StatusBadge status="damage" count={data.statusCounts.damage} />
        {data.statusCounts.scrap > 0 && <StatusBadge status="scrap" count={data.statusCounts.scrap} />}
      </div>
      
      {/* Stats and Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Stats */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="text-center">
            <div className="text-xs text-gray-400">Total</div>
            <div className="text-lg sm:text-xl font-bold text-gray-800">{data.total}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">Delay</div>
            <div className="text-lg sm:text-xl font-bold text-teal-500">{data.delay}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">Detection</div>
            <div className="text-lg sm:text-xl font-bold text-red-500">{data.detection}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-gray-400">Scrap</div>
            <div className="text-lg sm:text-xl font-bold text-teal-500">{data.scrap}</div>
          </div>
          
          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-gray-200 mx-2"></div>
          
          {/* Environment */}
          <div className="flex items-center gap-1">
            <Droplets size={18} className="text-teal-500" />
            <span className="text-gray-600">{data.humidity}%</span>
          </div>
          <div className="flex items-center gap-1">
            <Thermometer size={18} className="text-orange-400" />
            <span className="text-gray-600">{data.temperature}°C</span>
          </div>
        </div>
        
        {/* Controls */}
        <div className="flex items-center gap-3">
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              data.doorStatus === 'on' 
                ? 'bg-teal-500 text-white' 
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <DoorOpen size={20} />
            <div className="text-left">
              <div className="text-xs opacity-80">Door</div>
              <div className="text-sm font-semibold uppercase">{data.doorStatus}</div>
            </div>
          </button>
          
          <button 
            className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-colors ${
              data.lightStatus === 'on' 
                ? 'bg-teal-500 text-white' 
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <Lightbulb size={20} />
            <div className="text-left">
              <div className="text-xs opacity-80">Light</div>
              <div className="text-sm font-semibold uppercase">{data.lightStatus}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
