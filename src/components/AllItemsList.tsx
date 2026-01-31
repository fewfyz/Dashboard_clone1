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
    normal: { bg: 'bg-teal-500', text: 'NORMAL' },
    warning: { bg: 'bg-yellow-500', text: 'WARNING' },
    danger: { bg: 'bg-red-500', text: 'DANGER' },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
        <span className="text-sm font-medium text-gray-700">{number}</span>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Droplets size={14} className="text-teal-500" />
          <span>{humidity}%</span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <Thermometer size={14} className="text-orange-400" />
          <span>{temperature}°C</span>
        </div>
        <span className={`${config.bg} text-white text-xs px-2 py-0.5 rounded font-medium`}>
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
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-800">ALL</h3>
        <ChevronRight size={16} className="text-gray-400" />
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
