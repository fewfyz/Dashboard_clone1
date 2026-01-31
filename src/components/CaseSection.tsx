'use client';

import React from 'react';
import ItemCard from './ItemCard';

interface CaseSectionProps {
  caseNumber: string;
  shaftItems: Array<{
    id: number;
    name: string;
    status: string;
    statusType: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap' | 'idle';
    count?: number;
  }>;
  capacitiveItems: Array<{
    id: number;
    name: string;
    status: string;
    statusType: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap' | 'idle';
    count?: number;
  }>;
  blanketItems: Array<{
    id: number;
    name: string;
    status: string;
    statusType: 'normal' | 'testing' | 'lost' | 'damage' | 'scrap' | 'idle';
    count?: number;
  }>;
}

const sections = [
  { key: 'shaft', label: 'Shaft', color: 'bg-[#00b4b4]' },
  { key: 'capacitive', label: 'Capacitive', color: 'bg-[#fbbf24]' },
  { key: 'blanket', label: 'Insulating blanket', color: 'bg-[#f97316]' },
];

export default function CaseSection({ caseNumber, shaftItems, capacitiveItems, blanketItems }: CaseSectionProps) {
  const itemsMap = {
    shaft: shaftItems,
    capacitive: capacitiveItems,
    blanket: blanketItems,
  };

  return (
    <div className="glass-card p-5 animate-fade-in" style={{ animationDelay: '50ms' }}>
      <div className="flex items-center justify-between mb-5">
        <h3 className="text-lg font-semibold text-gray-800 tracking-tight">CASE {caseNumber}</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {sections.map((section) => (
          <div key={section.key}>
            <div className="flex items-center gap-2.5 mb-3">
              <div className={`w-2.5 h-2.5 ${section.color} rounded-full shadow-sm`}></div>
              <span className="font-semibold text-gray-700 text-sm">{section.label}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {itemsMap[section.key as keyof typeof itemsMap].map((item) => (
                <ItemCard
                  key={item.id}
                  name={item.name}
                  status={item.status}
                  statusType={item.statusType}
                  count={item.count}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-5">
        {[0, 1, 2].map((dot) => (
          <button
            key={dot}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              dot === 0 
                ? 'bg-[#00b4b4] w-6' 
                : 'bg-gray-300 hover:bg-gray-400'
            }`}
            aria-label={`Page ${dot + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
