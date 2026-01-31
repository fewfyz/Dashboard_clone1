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
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 xl:p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-5">
        <h3 className="text-xs sm:text-sm font-semibold text-gray-800 tracking-wide">📊 EQUIPMENT</h3>
        <div className="flex gap-3 sm:gap-4 lg:gap-6">
          <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer min-h-[36px] sm:min-h-[44px] px-1.5 sm:px-2 -mx-1.5 sm:-mx-2 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={showTemp}
              onChange={(e) => setShowTemp(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-200 shadow-sm
              ${showTemp ? 'bg-gradient-to-br from-teal-400 to-teal-500' : 'bg-gray-300'}`}></div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-600">Temp</span>
          </label>
          <label className="flex items-center gap-1.5 sm:gap-2 cursor-pointer min-h-[36px] sm:min-h-[44px] px-1.5 sm:px-2 -mx-1.5 sm:-mx-2 rounded-lg hover:bg-gray-50 transition-colors">
            <input
              type="checkbox"
              checked={showDoor}
              onChange={(e) => setShowDoor(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-3 h-3 sm:w-3.5 sm:h-3.5 rounded-full transition-all duration-200 shadow-sm
              ${showDoor ? 'bg-gradient-to-br from-gray-500 to-gray-700' : 'bg-gray-300'}`}></div>
            <span className="text-[10px] sm:text-xs lg:text-sm font-medium text-gray-600">Door</span>
          </label>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="relative h-28 sm:h-32 lg:h-36 xl:h-40">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-5 sm:bottom-6 w-6 sm:w-8 flex flex-col justify-between text-[9px] sm:text-[10px] lg:text-xs font-medium text-gray-400">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-6 sm:ml-8 lg:ml-10 h-full flex items-end justify-between gap-1.5 sm:gap-2 lg:gap-3 pb-5 sm:pb-6">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-0.5 sm:gap-1">
              <div className="w-full flex justify-center gap-0.5 sm:gap-1 lg:gap-1.5 h-20 sm:h-24 lg:h-28">
                {showTemp && (
                  <div
                    className="w-2.5 sm:w-3 lg:w-4 bg-gradient-to-t from-teal-500 to-teal-400 rounded-t-sm sm:rounded-t-md shadow-sm transition-all duration-300"
                    style={{ height: `${item.temp}%` }}
                  ></div>
                )}
                {showDoor && (
                  <div
                    className="w-2.5 sm:w-3 lg:w-4 bg-gradient-to-t from-gray-600 to-gray-500 rounded-t-sm sm:rounded-t-md shadow-sm transition-all duration-300"
                    style={{ height: `${item.door}%` }}
                  ></div>
                )}
              </div>
              <span className="text-[9px] sm:text-[10px] lg:text-xs font-medium text-gray-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
