'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import SensorControls from '@/components/SensorControls';
import LocationMap from '@/components/LocationMap';
import AlarmStatus from '@/components/AlarmStatus';
import MonitoringChart from '@/components/MonitoringChart';
import EquipmentChart from '@/components/EquipmentChart';
import AllItemsList from '@/components/AllItemsList';

interface MonitorPageProps {
  onNavigate: (page: string) => void;
}

export default function MonitorPage({ onNavigate }: MonitorPageProps) {
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
          activeItem="monitor" 
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
        
        {/* Monitor Content */}
        <div className="flex-1 overflow-y-auto px-1 sm:px-2 pb-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-5">
            {/* Left Column */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {/* Sensor Controls */}
              <SensorControls />
              
              {/* Charts Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
                <MonitoringChart />
                <EquipmentChart />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="flex flex-col gap-4 lg:gap-5">
              {/* Location Map */}
              <LocationMap />
              
              {/* Alarm Status */}
              <AlarmStatus />
              
              {/* All Items List */}
              <AllItemsList />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
