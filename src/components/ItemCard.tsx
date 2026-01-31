'use client';

import React from 'react';

interface ItemCardProps {
  name: string;
  status: string;
  statusType: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap' | 'idle';
  count?: number;
}

const statusColors = {
  normal: 'bg-[#00b4b4]',
  testing: 'bg-[#fbbf24]',
  lost: 'bg-[#ef4444]',
  damage: 'bg-[#ef4444]',
  scrap: 'bg-[#9ca3af]',
  idle: 'bg-gray-300',
};

export default function ItemCard({ name, status, statusType, count }: ItemCardProps) {
  return (
    <div className="bg-white rounded-lg sm:rounded-xl p-2 sm:p-3 hover:shadow-md transition-all duration-200 cursor-pointer active:scale-[0.98] group border border-gray-100">
      <div className="font-semibold text-gray-800 text-xs sm:text-sm mb-1.5 sm:mb-2 group-hover:text-[#00b4b4] transition-colors truncate">{name}</div>
      <div className="flex items-center justify-between gap-1">
        <span className="text-[10px] sm:text-xs text-gray-500 truncate">{status}</span>
        {count !== undefined && (
          <span className={`${statusColors[statusType]} ${statusType === 'testing' ? 'text-gray-800' : 'text-white'} text-[10px] sm:text-[11px] font-semibold px-1.5 sm:px-2 py-0.5 rounded-full min-w-[20px] sm:min-w-[24px] text-center flex-shrink-0`}>
            {count}
          </span>
        )}
      </div>
    </div>
  );
}
