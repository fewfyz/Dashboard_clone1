'use client';

import React from 'react';

interface AlarmItemProps {
  number: string;
  status: 'normal' | 'hot' | 'dry' | 'open';
  isActive?: boolean;
}

const statusConfig = {
  normal: { bg: 'bg-teal-500', text: 'NORMAL' },
  hot: { bg: 'bg-red-500', text: 'HOT' },
  dry: { bg: 'bg-yellow-500', text: 'DRY' },
  open: { bg: 'bg-orange-500', text: 'OPEN' },
};

function AlarmItem({ number, status, isActive }: AlarmItemProps) {
  const config = statusConfig[status];
  return (
    <div className={`flex flex-col items-center gap-1 p-2 rounded-xl ${isActive ? 'bg-gray-100' : ''}`}>
      <span className="text-xs text-gray-600 font-medium">{number}</span>
      <span className={`${config.bg} text-white text-[10px] px-2 py-0.5 rounded-full font-medium`}>
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
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-800 mb-3">ALARM</h3>
      <div className="grid grid-cols-6 gap-1">
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
