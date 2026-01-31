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
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-2.5 sm:p-3 lg:p-4 h-full flex flex-col animate-fade-in">
      <div className="flex items-center justify-between gap-2 mb-2 sm:mb-3">
        <h3 className="text-[10px] sm:text-xs font-semibold text-gray-800 tracking-wide">📊 MONITORING</h3>
        <div className="flex gap-2 sm:gap-3">
          <label className="flex items-center gap-1 sm:gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showTemp}
              onChange={(e) => setShowTemp(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200
              ${showTemp ? 'bg-red-500' : 'bg-gray-300'}`}></div>
            <span className="text-[9px] sm:text-[10px] font-medium text-gray-600">Temp</span>
          </label>
          <label className="flex items-center gap-1 sm:gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={showWet}
              onChange={(e) => setShowWet(e.target.checked)}
              className="sr-only peer"
            />
            <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-200
              ${showWet ? 'bg-[#00b4b4]' : 'bg-gray-300'}`}></div>
            <span className="text-[9px] sm:text-[10px] font-medium text-gray-600">Wet</span>
          </label>
        </div>
      </div>

      {/* Chart */}
      <div className="relative flex-1 min-h-0">
        {/* Y-axis labels */}
        <div className="absolute left-0 top-0 bottom-4 w-5 sm:w-6 flex flex-col justify-between text-[8px] sm:text-[9px] font-medium text-gray-400">
          <span>70</span>
          <span>50</span>
          <span>30</span>
        </div>

        {/* Chart area */}
        <div className="ml-5 sm:ml-6 h-full flex flex-col">
          <svg className="w-full h-full" viewBox="0 0 300 140" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="20" x2="300" y2="20" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="60" x2="300" y2="60" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="0" y1="100" x2="300" y2="100" stroke="#e5e7eb" strokeWidth="1" strokeDasharray="4 4" />

            {/* Temperature line */}
            {showTemp && (
              <polyline
                fill="none"
                stroke="url(#tempGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={dataPoints.map((d, i) => `${i * 60},${chartHeight - (d.temp / maxValue) * chartHeight}`).join(' ')}
              />
            )}

            {/* Wet line */}
            {showWet && (
              <polyline
                fill="none"
                stroke="url(#wetGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={dataPoints.map((d, i) => `${i * 60},${chartHeight - (d.wet / maxValue) * chartHeight}`).join(' ')}
              />
            )}

            {/* Gradients */}
            <defs>
              <linearGradient id="tempGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="100%" stopColor="#ef4444" />
              </linearGradient>
              <linearGradient id="wetGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#2dd4bf" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </svg>

          {/* X-axis labels */}
          <div className="flex justify-between text-[8px] sm:text-[9px] font-medium text-gray-400 mt-1">
            {dataPoints.map((d) => (
              <span key={d.time}>{d.time}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
