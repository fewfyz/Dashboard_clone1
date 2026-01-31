'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap';
  count: number;
}

const statusConfig = {
  normal: { 
    bg: 'bg-gradient-to-r from-teal-500 to-teal-400', 
    text: 'text-white', 
    label: 'Normal',
    shadow: 'shadow-teal-500/25'
  },
  testing: { 
    bg: 'bg-gradient-to-r from-yellow-400 to-amber-400', 
    text: 'text-gray-800', 
    label: 'Testing',
    shadow: 'shadow-yellow-400/25'
  },
  lost: { 
    bg: 'bg-gradient-to-r from-orange-500 to-orange-400', 
    text: 'text-white', 
    label: 'Lost',
    shadow: 'shadow-orange-500/25'
  },
  damage: { 
    bg: 'bg-gradient-to-r from-red-500 to-red-400', 
    text: 'text-white', 
    label: 'Damage',
    shadow: 'shadow-red-500/25'
  },
  scrap: { 
    bg: 'bg-gradient-to-r from-gray-500 to-gray-400', 
    text: 'text-white', 
    label: 'Scrap',
    shadow: 'shadow-gray-500/25'
  },
};

export default function StatusBadge({ status, count }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span 
      className={`${config.bg} ${config.text} ${config.shadow} px-3 py-1.5 rounded-full text-xs font-semibold 
        inline-flex items-center gap-1.5 shadow-sm transition-transform duration-200 hover:scale-105 cursor-default`}
    >
      {config.label}
      <span className="bg-white/25 px-1.5 py-0.5 rounded-full text-[10px] font-bold min-w-[20px] text-center">
        {count}
      </span>
    </span>
  );
}
