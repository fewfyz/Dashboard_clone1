'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap' | 'storage' | 'late';
  count: number;
}

const statusConfig = {
  normal: { 
    bg: 'bg-[#00b4b4]', 
    text: 'text-white', 
    label: 'Normal'
  },
  testing: { 
    bg: 'bg-[#fbbf24]', 
    text: 'text-gray-800', 
    label: 'Testing'
  },
  lost: { 
    bg: 'bg-[#ef4444]', 
    text: 'text-white', 
    label: 'Lost'
  },
  storage: { 
    bg: 'bg-[#f97316]', 
    text: 'text-white', 
    label: 'Storage'
  },
  late: { 
    bg: 'bg-[#3b82f6]', 
    text: 'text-white', 
    label: 'Late'
  },
  damage: { 
    bg: 'bg-[#ef4444]', 
    text: 'text-white', 
    label: 'Damage'
  },
  scrap: { 
    bg: 'bg-[#9ca3af]', 
    text: 'text-white', 
    label: 'Scrap'
  },
};

export default function StatusBadge({ status, count }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span 
      className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-medium 
        inline-flex items-center gap-1.5 cursor-default`}
    >
      {config.label}
      <span className="bg-white/30 px-1.5 py-0.5 rounded-full text-[10px] font-bold min-w-[18px] text-center">
        {count}
      </span>
    </span>
  );
}
