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
    <div className="flex items-center justify-between py-3 sm:py-4 border-b border-gray-100/80 last:border-0
      hover:bg-gray-50/50 -mx-2 px-2 rounded-xl transition-colors">
      <div className="flex items-center gap-3">
        <div className="w-2.5 h-2.5 bg-gradient-to-br from-teal-400 to-teal-600 rounded-full shadow-sm"></div>
        <span className="text-sm sm:text-base font-semibold text-gray-700">{number}</span>
      </div>
      <div className="flex items-center gap-3 sm:gap-5">
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Droplets size={16} className="text-teal-500" />
          <span className="font-medium">{humidity}%</span>
        </div>
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <Thermometer size={16} className="text-orange-400" />
          <span className="font-medium">{temperature}°C</span>
        </div>
        <span className={`${config.bg} text-white text-[10px] sm:text-xs px-2.5 py-1 rounded-full font-semibold shadow-md ${config.shadow}`}>
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
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <h3 className="text-sm font-semibold text-gray-800 tracking-wide">ALL</h3>
        <button className="w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full
          hover:bg-gray-100 active:bg-gray-200 transition-colors
          focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="View all items"
        >
          <ChevronRight size={18} className="text-gray-400" />
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
