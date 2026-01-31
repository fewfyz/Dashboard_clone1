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
    <div className="min-h-screen w-full bg-[#c5e8e8] p-2 sm:p-4 flex flex-col lg:flex-row">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 bg-teal-500 text-white p-2 rounded-lg shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 transition-transform duration-300 ease-in-out`}>
        <Sidebar 
          activeItem="monitor" 
          onItemClick={(item) => { 
            onNavigate(item); 
            setSidebarOpen(false); 
          }} 
        />
      </div>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden" 
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Main Content */}
      <div className="flex-1 lg:ml-4 flex flex-col overflow-hidden mt-14 lg:mt-0">
        {/* Header */}
        <Header />
        
        {/* Monitor Content */}
        <div className="flex-1 overflow-y-auto pr-0 sm:pr-2 pb-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
              {/* Sensor Controls */}
              <SensorControls />
              
              {/* Charts Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <MonitoringChart />
                <EquipmentChart />
              </div>
            </div>
            
            {/* Right Column */}
            <div className="flex flex-col gap-4">
              {/* Location Map */}
              <LocationMap />
              
              {/* Alarm Status */}
              <AlarmStatus />
              
              {/* All Items List */}
              <AllItemsList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
