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
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">📊 EQUIPMENT</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showTemp}
              onChange={(e) => setShowTemp(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-3 h-3 rounded-full ${showTemp ? 'bg-teal-400' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600">Temp</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showDoor}
              onChange={(e) => setShowDoor(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-3 h-3 rounded-full ${showDoor ? 'bg-gray-600' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600">Door</span>
          </label>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="relative h-32">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] text-gray-400">
          <span>100</span>
          <span>50</span>
          <span>0</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full flex items-end justify-between gap-2 pb-6">
          {data.map((item, index) => (
            <div key={index} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full flex justify-center gap-1 h-24">
                {showTemp && (
                  <div
                    className="w-3 bg-teal-400 rounded-t"
                    style={{ height: `${item.temp}%` }}
                  ></div>
                )}
                {showDoor && (
                  <div
                    className="w-3 bg-gray-600 rounded-t"
                    style={{ height: `${item.door}%` }}
                  ></div>
                )}
              </div>
              <span className="text-[10px] text-gray-400">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
