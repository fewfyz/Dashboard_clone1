'use client';

import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface FilterTabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function FilterTab({ label, isActive, onClick }: FilterTabProps) {
  return (
    <button
      onClick={onClick}
      className={`min-h-[36px] sm:min-h-[40px] lg:min-h-[44px] px-3 sm:px-4 lg:px-5 xl:px-6 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-semibold transition-all duration-200
        focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4b4] focus-visible:ring-offset-2
        ${isActive
          ? 'bg-[#00b4b4] text-white'
          : 'bg-gray-200 text-gray-600 hover:bg-gray-300 active:bg-gray-400'
        }`}
    >
      {label}
    </button>
  );
}

export default function AnalysisFilters() {
  const [activeFilter, setActiveFilter] = useState('7Days');
  const [activeTab, setActiveTab] = useState('NO.2');

  const filters = [
    { id: '1Day', label: '1 Day' },
    { id: '3Days', label: '3 Days' },
    { id: '7Days', label: '7 Days' },
    { id: '1Month', label: '1 Month' },
  ];

  const tabs = ['NO.1', 'NO.2', 'NO.3', 'NO.4', 'NO.5', 'NO.6'];

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 xl:p-6 mb-2 sm:mb-3 lg:mb-4 xl:mb-5 animate-fade-in">
      {/* Top Filter Buttons */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:gap-3 mb-3 sm:mb-4 lg:mb-5">
        {filters.map((filter) => (
          <FilterTab
            key={filter.id}
            label={filter.label}
            isActive={activeFilter === filter.id}
            onClick={() => setActiveFilter(filter.id)}
          />
        ))}
      </div>

      {/* Number Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
        <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className={`min-h-[28px] sm:min-h-[32px] px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-200
                focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4b4]
                ${activeTab === tab
                  ? 'bg-[#00b4b4] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
        <button 
          className="self-start sm:self-auto w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
            rounded-full flex items-center justify-center transition-all duration-150 shadow-sm
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Add filter"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
        </button>
      </div>
    </div>
  );
}
