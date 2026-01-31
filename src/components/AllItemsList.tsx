'use client';

import React from 'react';
import { Droplets, Thermometer, ChevronRight } from 'lucide-react';

interface AllItemProps {
  number: string;
  humidity: number;
  temperature: number;
  status: 'normal' | 'warning' | 'danger';
}

function AllItem({ number, humidity, temperature, status }: AllItemProps) {
  const statusConfig = {
    normal: { 
      bg: 'bg-gradient-to-r from-emerald-400 to-emerald-600', 
      shadow: 'shadow-emerald-500/25',
      text: 'NORMAL' 
    },
    warning: { 
      bg: 'bg-gradient-to-r from-amber-400 to-amber-600', 
      shadow: 'shadow-amber-500/25',
      text: 'WARNING' 
    },
    danger: { 
      bg: 'bg-gradient-to-r from-red-400 to-red-600', 
      shadow: 'shadow-red-500/25',
      text: 'DANGER' 
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between py-2 sm:py-3 lg:py-4 border-b border-gray-100/80 last:border-0
      hover:bg-gray-50/50 -mx-1.5 sm:-mx-2 px-1.5 sm:px-2 rounded-lg sm:rounded-xl transition-colors">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full shadow-sm"></div>
        <span className="text-xs sm:text-sm lg:text-base font-semibold text-gray-700">{number}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-5">
        <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-600">
          <Droplets size={14} className="sm:w-4 sm:h-4 text-teal-500" />
          <span className="font-medium">{humidity}%</span>
        </div>
        <div className="flex items-center gap-1 sm:gap-1.5 text-xs sm:text-sm text-gray-600">
          <Thermometer size={14} className="sm:w-4 sm:h-4 text-orange-400" />
          <span className="font-medium">{temperature}°C</span>
        </div>
        <span className={`${config.bg} text-white text-[9px] sm:text-[10px] lg:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full font-semibold shadow-md ${config.shadow}`}>
          {config.text}
        </span>
      </div>
    </div>
  );
}

export default function AllItemsList() {
  const items = [
    { number: 'NO.1', humidity: 63, temperature: 26, status: 'normal' as const },
    { number: 'NO.2', humidity: 43, temperature: 28, status: 'normal' as const },
  ];

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 xl:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-2 sm:mb-3 lg:mb-4">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">ALL</h3>
        <button className="w-7 h-7 sm:w-9 sm:h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full
          hover:bg-gray-100 active:bg-gray-200 transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="View all items"
        >
          <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px] text-gray-400" />
        </button>
      </div>
      <div>
        {items.map((item) => (
          <AllItem
            key={item.number}
            number={item.number}
            humidity={item.humidity}
            temperature={item.temperature}
            status={item.status}
          />
        ))}
      </div>
    </div>
  );
}
