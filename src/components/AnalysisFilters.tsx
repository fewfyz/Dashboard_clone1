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
      className={`min-h-[44px] px-5 sm:px-6 py-2.5 rounded-2xl text-sm font-semibold transition-all duration-200
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
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 mb-4 sm:mb-5 animate-fade-in">
      {/* Top Filter Buttons */}
      <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-5">
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex flex-wrap gap-1.5 sm:gap-2" role="tablist">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              role="tab"
              aria-selected={activeTab === tab}
              className={`min-h-[32px] px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200
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
          className="self-start sm:self-auto w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
            rounded-full flex items-center justify-center transition-all duration-150 shadow-sm
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Add filter"
        >
          <Plus size={18} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
