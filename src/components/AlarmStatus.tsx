'use client';

import React from 'react';

interface AlarmItemProps {
  number: string;
  status: 'normal' | 'hot' | 'dry' | 'open';
  isActive?: boolean;
}

const statusConfig = {
  normal: { 
    bg: 'bg-[#00b4b4]', 
    text: 'NORMAL' 
  },
  hot: { 
    bg: 'bg-[#ef4444]', 
    text: 'HOT' 
  },
  dry: { 
    bg: 'bg-[#fbbf24]', 
    text: 'DRY' 
  },
  open: { 
    bg: 'bg-[#f97316]', 
    text: 'OPEN' 
  },
};

function AlarmItem({ number, status, isActive }: AlarmItemProps) {
  const config = statusConfig[status];
  return (
    <div className={`flex flex-col items-center gap-1 sm:gap-1.5 lg:gap-2 p-1.5 sm:p-2 lg:p-3 rounded-lg sm:rounded-xl transition-all duration-200
      ${isActive ? 'bg-gray-100/80 ring-2 ring-[#00b4b4]/50' : 'hover:bg-gray-50'}`}>
      <span className="text-[9px] sm:text-[10px] lg:text-xs text-gray-600 font-semibold">{number}</span>
      <span className={`${config.bg} text-white text-[8px] sm:text-[9px] lg:text-[10px] px-1.5 sm:px-2 lg:px-2.5 py-0.5 sm:py-1 
        rounded-full font-semibold`}>
        {config.text}
      </span>
    </div>
  );
}

export default function AlarmStatus() {
  const alarms = [
    { number: 'NO.1', status: 'normal' as const },
    { number: 'NO.2', status: 'hot' as const },
    { number: 'NO.3', status: 'dry' as const },
    { number: 'NO.4', status: 'open' as const },
    { number: 'NO.5', status: 'open' as const },
    { number: 'NO.6', status: 'open' as const },
  ];

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 xl:p-6 animate-fade-in">
      <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3 lg:mb-4 tracking-wide">ALARM</h3>
      <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 sm:gap-1.5 lg:gap-2">
        {alarms.map((alarm, index) => (
          <AlarmItem
            key={alarm.number}
            number={alarm.number}
            status={alarm.status}
            isActive={index === 0}
          />
        ))}
      </div>
    </div>
  );
}
