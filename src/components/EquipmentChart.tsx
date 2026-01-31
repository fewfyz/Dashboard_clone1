'use client';

import React, { useState } from 'react';

export default function EquipmentChart() {
  const [showTemp, setShowTemp] = useState(true);
  const [showDoor, setShowDoor] = useState(true);

  const data = [
    { label: '01:24', temp: 65, door: 45 },
    { label: '05:26', temp: 75, door: 55 },
    { label: '09:26', temp: 50, door: 70 },
    { label: '13:26', temp: 85, door: 60 },
    { label: '17:27', temp: 70, door: 80 },
    { label: '21:27', temp: 60, door: 40 },
  ];

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-2.5 sm:p-3 lg:p-4 h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
        <h3 className="text-[10px] sm:text-xs font-semibold text-gray-800 tracking-wide">📊 EQUIPMENT</h3>
        <div className="flex gap-2 sm:gap-3">
          <label className="flex items-center gap-1 sm:gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showTemp}
              onChange={(e) => setShowTemp(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200
              ${showTemp ? 'bg-[#00b4b4]' : 'bg-gray-300'}`}></div>
            <span className="text-[9px] sm:text-[10px] font-medium text-gray-600">Temp</span>
          </label>
          <label className="flex items-center gap-1 sm:gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showDoor}
              onChange={(e) => setShowDoor(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200
              ${showDoor ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <span className="text-[9px] sm:text-[10px] font-medium text-gray-600">Door</span>
          </label>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="relative flex-1 min-h-0">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-4 w-5 sm:w-6 flex flex-col justify-between text-[8px] sm:text-[9px] font-medium text-gray-400">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-5 sm:ml-6 h-full flex items-end justify-between gap-1 sm:gap-1.5 pb-4">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center h-full">
              <div className="w-full flex justify-center items-end gap-0.5 sm:gap-1 flex-1">
                {showTemp && (
                  <div
                    className="w-2 sm:w-2.5 lg:w-3 bg-[#00b4b4] rounded-t-sm transition-all duration-300"
                    style={{ height: `${item.temp}%` }}
                  ></div>
                )}
                {showDoor && (
                  <div
                    className="w-2 sm:w-2.5 lg:w-3 bg-gray-500 rounded-t-sm transition-all duration-300"
                    style={{ height: `${item.door}%` }}
                  ></div>
                )}
              </div>
              <span className="text-[8px] sm:text-[9px] font-medium text-gray-400 mt-1">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
