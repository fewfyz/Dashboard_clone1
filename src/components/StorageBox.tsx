'use client';

import React from 'react';
import { Droplets, Thermometer, DoorOpen, Lightbulb, ChevronDown, RefreshCw } from 'lucide-react';
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
    <div className="glass-card p-5 mb-4 animate-fade-in">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800 tracking-tight">
          NO.{boxNumber} Storage box
        </h2>
        <div className="flex items-center gap-1">
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Refresh"
          >
            <RefreshCw size={16} className="text-teal-500" />
          </button>
          <button 
            className="p-2.5 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
            aria-label="Expand"
          >
            <ChevronDown size={16} className="text-teal-500" />
          </button>
        </div>
      </div>
      
      {/* Status Badges */}
      <div className="flex flex-wrap gap-2 mb-5">
        <StatusBadge status="normal" count={data.statusCounts.normal} />
        <StatusBadge status="testing" count={data.statusCounts.testing} />
        <StatusBadge status="lost" count={data.statusCounts.lost} />
        <StatusBadge status="damage" count={data.statusCounts.damage} />
        {data.statusCounts.scrap > 0 && <StatusBadge status="scrap" count={data.statusCounts.scrap} />}
      </div>
      
      {/* Stats and Controls */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        {/* Stats */}
        <div className="flex flex-wrap items-center gap-5">
          {[
            { label: 'Total', value: data.total, color: 'text-gray-800' },
            { label: 'Delay', value: data.delay, color: 'text-teal-500' },
            { label: 'Detection', value: data.detection, color: 'text-red-500' },
            { label: 'Scrap', value: data.scrap, color: 'text-teal-500' },
          ].map((stat) => (
            <div key={stat.label} className="text-center min-w-[48px]">
              <div className="text-[11px] font-medium text-gray-400 uppercase tracking-wide">{stat.label}</div>
              <div className={`text-xl font-bold ${stat.color} tabular-nums`}>{stat.value}</div>
            </div>
          ))}
          
          {/* Divider */}
          <div className="hidden sm:block w-px h-10 bg-gray-200/60 mx-1"></div>
          
          {/* Environment */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-teal-50 rounded-lg">
            <Droplets size={16} className="text-teal-500" />
            <span className="text-sm font-medium text-gray-700">{data.humidity}%</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-orange-50 rounded-lg">
            <Thermometer size={16} className="text-orange-400" />
            <span className="text-sm font-medium text-gray-700">{data.temperature}°C</span>
          </div>
        </div>
        
        {/* Controls - iOS Style Buttons */}
        <div className="flex items-center gap-2">
          <button 
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 min-h-[44px] ${
              data.doorStatus === 'on' 
                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <DoorOpen size={18} />
            <div className="text-left">
              <div className="text-[10px] font-medium opacity-80 uppercase">Door</div>
              <div className="text-sm font-semibold uppercase tracking-wide">{data.doorStatus}</div>
            </div>
          </button>
          
          <button 
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl transition-all duration-200 active:scale-95 min-h-[44px] ${
              data.lightStatus === 'on' 
                ? 'bg-teal-500 text-white shadow-md shadow-teal-500/30' 
                : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            <Lightbulb size={18} />
            <div className="text-left">
              <div className="text-[10px] font-medium opacity-80 uppercase">Light</div>
              <div className="text-sm font-semibold uppercase tracking-wide">{data.lightStatus}</div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
