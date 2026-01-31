'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import AnalysisFilters from '@/components/AnalysisFilters';
import TimeSeriesChart from '@/components/TimeSeriesChart';
import StorageBoxMini from '@/components/StorageBoxMini';

interface AnalysisPageProps {
  onNavigate: (page: string) => void;
}

const storageBox2Data = {
  total: 20,
  delay: 0,
  detection: 0,
  scrap: 0,
  humidity: 38,
  temperature: 28,
  normalCount: 18,
  testingCount: 1,
  doorStatus: 'off' as const,
  lightStatus: 'on' as const,
};

export default function AnalysisPage({ onNavigate }: AnalysisPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen min-h-[100dvh] w-full bg-gradient-to-br from-[#e8f4f4] to-[#d4ebeb] p-2 sm:p-4 lg:p-5 flex flex-col lg:flex-row">
      {/* Mobile Menu Button - Apple Style */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 bg-white/80 backdrop-blur-xl text-gray-800 p-3 rounded-2xl shadow-lg 
          border border-white/20 transition-all duration-200 active:scale-95"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 transition-transform duration-300 ease-out`}>
        <Sidebar 
          activeItem="analysis" 
          onItemClick={(item) => { 
            onNavigate(item); 
            setSidebarOpen(false); 
          }} 
        />
      </aside>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden animate-fade-in" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-5 flex flex-col overflow-hidden mt-16 lg:mt-0">
        {/* Header */}
        <Header />
        
        {/* Analysis Content */}
        <div className="flex-1 overflow-y-auto px-1 sm:px-2 pb-6">
          {/* Filter Tabs */}
          <AnalysisFilters />
          
          {/* Time Series Chart */}
          <div className="mb-4 lg:mb-5">
            <TimeSeriesChart />
          </div>
          
          {/* Storage Box Mini */}
          <StorageBoxMini boxNumber={2} data={storageBox2Data} />
        </div>
      </main>
    </div>
  );
}
