'use client';

import React from 'react';

interface StatusBadgeProps {
  status: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap';
  count: number;
}

const statusConfig = {
  normal: { bg: 'bg-teal-500', text: 'text-white', label: 'Normal' },
  testing: { bg: 'bg-yellow-400', text: 'text-gray-800', label: 'Testing' },
  lost: { bg: 'bg-orange-500', text: 'text-white', label: 'Lost' },
  damage: { bg: 'bg-red-500', text: 'text-white', label: 'Damage' },
  scrap: { bg: 'bg-gray-400', text: 'text-white', label: 'Scrap' },
};

export default function StatusBadge({ status, count }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <span className={`${config.bg} ${config.text} px-3 py-1 rounded-full text-xs font-medium inline-flex items-center gap-1`}>
      {config.label}
      <span className="bg-white/30 px-1.5 rounded-full text-[10px]">{count}</span>
    </span>
  );
}
