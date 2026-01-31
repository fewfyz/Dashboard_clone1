'use client';

import React from 'react';

interface ItemCardProps {
  name: string;
  status: string;
  statusType: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap' | 'idle';
  count?: number;
}

const statusColors = {
  normal: 'bg-gradient-to-r from-teal-500 to-teal-400',
  testing: 'bg-gradient-to-r from-yellow-400 to-amber-400',
  lost: 'bg-gradient-to-r from-orange-500 to-orange-400',
  damage: 'bg-gradient-to-r from-red-500 to-red-400',
  scrap: 'bg-gradient-to-r from-gray-500 to-gray-400',
  idle: 'bg-gradient-to-r from-gray-300 to-gray-200',
};

export default function ItemCard({ name, status, statusType, count }: ItemCardProps) {
  return (
    <div className="bg-gray-50/80 rounded-xl p-3 hover:bg-white hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] group">
      <div className="font-semibold text-gray-800 text-sm mb-2 group-hover:text-teal-600 transition-colors">{name}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{status}</span>
        {count !== undefined && (
          <span className={`${statusColors[statusType]} text-white text-[11px] font-semibold px-2 py-0.5 rounded-full min-w-[24px] text-center shadow-sm`}>
            {count}
          </span>
        )}
      </div>
    </div>
  );
}
