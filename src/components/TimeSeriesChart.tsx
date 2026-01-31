'use client';

import React, { useState } from 'react';

export default function TimeSeriesChart() {
  const [selectedPoint, setSelectedPoint] = useState<number | null>(7); // July selected by default

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
  
  // Data for three lines
  const loyalCustomers = [250, 280, 220, 200, 280, 320, 380, 350, 300, 280, 250, 220];
  const newCustomers = [220, 200, 180, 160, 200, 280, 350, 320, 280, 240, 200, 120];
  const uniqueCustomers = [280, 320, 280, 300, 350, 380, 350, 320, 340, 300, 260, 200];

  const maxValue = 400;
  const minValue = 100;
  const chartWidth = 1200;  // Full HD optimized
  const chartHeight = 320;  // Better aspect ratio
  const padding = { top: 30, right: 40, bottom: 50, left: 60 };

  const getX = (index: number) => {
    return padding.left + (index / (months.length - 1)) * (chartWidth - padding.left - padding.right);
  };

  const getY = (value: number) => {
    return padding.top + ((maxValue - value) / (maxValue - minValue)) * (chartHeight - padding.top - padding.bottom);
  };

  // Simpler smooth path
  const createSmoothPath = (data: number[]) => {
    const points = data.map((val, i) => ({ x: getX(i), y: getY(val) }));
    
    let path = `M ${points[0].x} ${points[0].y}`;
    
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i === 0 ? i : i - 1];
      const p1 = points[i];
      const p2 = points[i + 1];
      const p3 = points[i + 2 < points.length ? i + 2 : i + 1];
      
      const cp1x = p1.x + (p2.x - p0.x) / 6;
      const cp1y = p1.y + (p2.y - p0.y) / 6;
      const cp2x = p2.x - (p3.x - p1.x) / 6;
      const cp2y = p2.y - (p3.y - p1.y) / 6;
      
      path += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y}`;
    }
    
    return path;
  };

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-6 xl:p-8 animate-fade-in">
      <h2 className="text-sm sm:text-base lg:text-xl xl:text-2xl font-bold text-[#00b4b4] mb-3 sm:mb-4 lg:mb-6 tracking-tight">Time Series Chart</h2>
      
      <div className="w-full overflow-hidden">
        <svg 
          viewBox={`0 0 ${chartWidth} ${chartHeight}`}
          className="w-full h-auto"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Gradient definitions */}
          <defs>
            <linearGradient id="purpleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#9333ea" />
            </linearGradient>
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#ef4444" />
            </linearGradient>
            <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#4ade80" />
              <stop offset="100%" stopColor="#22c55e" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[100, 200, 300, 400].map((val) => (
            <g key={val}>
              <line
                x1={padding.left}
                y1={getY(val)}
                x2={chartWidth - padding.right}
                y2={getY(val)}
                stroke="#e5e7eb"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={padding.left - 12}
                y={getY(val) + 4}
                textAnchor="end"
                className="text-xs font-medium fill-gray-400"
              >
                {val}
              </text>
            </g>
          ))}

          {/* Vertical marker line for selected point */}
          {selectedPoint !== null && (
            <line
              x1={getX(selectedPoint)}
              y1={padding.top}
              x2={getX(selectedPoint)}
              y2={chartHeight - padding.bottom}
              stroke="#ef4444"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              opacity="0.7"
            />
          )}

          {/* Lines */}
          <path
            d={createSmoothPath(loyalCustomers)}
            fill="none"
            stroke="url(#purpleGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={createSmoothPath(newCustomers)}
            fill="none"
            stroke="url(#redGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={createSmoothPath(uniqueCustomers)}
            fill="none"
            stroke="url(#greenGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Data points */}
          {loyalCustomers.map((val, i) => (
            <circle
              key={`loyal-${i}`}
              cx={getX(i)}
              cy={getY(val)}
              r={selectedPoint === i ? 7 : 5}
              fill="#a855f7"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200 hover:r-8"
              onClick={() => setSelectedPoint(i)}
            />
          ))}
          {newCustomers.map((val, i) => (
            <circle
              key={`new-${i}`}
              cx={getX(i)}
              cy={getY(val)}
              r={selectedPoint === i ? 7 : 5}
              fill="#ef4444"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              onClick={() => setSelectedPoint(i)}
            />
          ))}
          {uniqueCustomers.map((val, i) => (
            <circle
              key={`unique-${i}`}
              cx={getX(i)}
              cy={getY(val)}
              r={selectedPoint === i ? 7 : 5}
              fill="#22c55e"
              stroke="white"
              strokeWidth="2"
              className="cursor-pointer transition-all duration-200"
              onClick={() => setSelectedPoint(i)}
            />
          ))}

          {/* X-axis labels */}
          {months.map((month, i) => (
            <text
              key={month}
              x={getX(i)}
              y={chartHeight - 10}
              textAnchor="middle"
              className="text-xs font-medium fill-gray-500"
            >
              {month}
            </text>
          ))}
        </svg>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mt-4 sm:mt-6">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-1.5 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full"></div>
          <span className="text-xs sm:text-sm font-medium text-gray-600">Loyal Customers</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-1.5 bg-gradient-to-r from-red-400 to-red-500 rounded-full"></div>
          <span className="text-xs sm:text-sm font-medium text-gray-600">New Customers</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-1.5 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
          <span className="text-xs sm:text-sm font-medium text-gray-600">Unique Customers</span>
        </div>
      </div>
    </div>
  );
}
