'use client';

import React from 'react';

interface ItemCardProps {
  name: string;
  status: string;
  statusType: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap' | 'idle';
  count?: number;
}

const statusColors = {
  normal: 'bg-teal-500',
  testing: 'bg-yellow-400',
  lost: 'bg-orange-500',
  damage: 'bg-red-500',
  scrap: 'bg-gray-400',
  idle: 'bg-gray-300',
};

export default function ItemCard({ name, status, statusType, count }: ItemCardProps) {
  return (
    <div className="bg-gray-50 rounded-xl p-3 hover:bg-gray-100 transition-colors cursor-pointer">
      <div className="font-semibold text-gray-800 text-sm mb-2">{name}</div>
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">{status}</span>
        {count !== undefined && (
          <span className={`${statusColors[statusType]} text-white text-xs px-2 py-0.5 rounded-full min-w-[24px] text-center`}>
            {count}
          </span>
        )}
      </div>
    </div>
  );
}
