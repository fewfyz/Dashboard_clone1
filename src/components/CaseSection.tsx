'use client';

import React from 'react';
import { RefreshCw, ChevronRight } from 'lucide-react';
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

export default function CaseSection({ caseNumber, shaftItems, capacitiveItems, blanketItems }: CaseSectionProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-800">CASE {caseNumber}</h3>
      </div>
      
      <div className="grid grid-cols-3 gap-6">
        {/* Shaft Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
            <span className="font-semibold text-gray-700">Shaft</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {shaftItems.map((item) => (
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
        
        {/* Capacitive Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <span className="font-semibold text-gray-700">Capacitive</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {capacitiveItems.map((item) => (
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
        
        {/* Insulating Blanket Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
            <span className="font-semibold text-gray-700">Insulating blanket</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {blanketItems.map((item) => (
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
      </div>
      
      {/* Pagination Dots */}
      <div className="flex justify-center gap-2 mt-4">
        <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
        <div className="w-2 h-2 bg-gray-300 rounded-full"></div>
      </div>
    </div>
  );
}
