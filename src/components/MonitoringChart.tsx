'use client';

import React, { useState } from 'react';

export default function MonitoringChart() {
  const [showTemp, setShowTemp] = useState(true);
  const [showWet, setShowWet] = useState(true);

  // Sample data points for the chart
  const dataPoints = [
    { time: '01:24', temp: 45, wet: 55 },
    { time: '05:26', temp: 50, wet: 60 },
    { time: '09:26', temp: 42, wet: 48 },
    { time: '13:26', temp: 55, wet: 45 },
    { time: '17:27', temp: 48, wet: 52 },
    { time: '21:27', temp: 52, wet: 58 },
  ];

  const maxValue = 70;
  const chartHeight = 120;

  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-800">📊 MONITORING</h3>
        <div className="flex gap-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showTemp}
              onChange={(e) => setShowTemp(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-3 h-3 rounded-full ${showTemp ? 'bg-red-400' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600">Temp</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showWet}
              onChange={(e) => setShowWet(e.target.checked)}
              className="sr-only"
            />
            <div className={`w-3 h-3 rounded-full ${showWet ? 'bg-teal-400' : 'bg-gray-300'}`}></div>
            <span className="text-xs text-gray-600">Wet</span>
          </label>
        </div>
      </div>

      {/* Chart */}
      <div className="relative h-32">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-6 w-8 flex flex-col justify-between text-[10px] text-gray-400">
          <span>70</span>
          <span>50</span>
          <span>30</span>
        </div>

        {/* Chart area */}
        <div className="ml-8 h-full">
          <svg className="w-full h-full" viewBox="0 0 300 140" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="#f0f0f0" strokeWidth="1" />
            <line x1="0" y1="100" x2="300" y2="100" stroke="#f0f0f0" strokeWidth="1" />

            {/* Temperature line */}
            {showTemp && (
              <polyline
                fill="none"
                stroke="#f87171"
                strokeWidth="2"
                points={dataPoints.map((d, i) => `${i * 60},${chartHeight - (d.temp / maxValue) * chartHeight}`).join(' ')}
              />
            )}

            {/* Wet line */}
            {showWet && (
              <polyline
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="2"
                points={dataPoints.map((d, i) => `${i * 60},${chartHeight - (d.wet / maxValue) * chartHeight}`).join(' ')}
              />
            )}
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between text-[10px] text-gray-400 mt-1">
            {dataPoints.map((d) => (
              <span key={d.time}>{d.time}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
