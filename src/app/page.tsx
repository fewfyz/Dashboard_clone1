'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StorageBox from '@/components/StorageBox';
import CaseSection from '@/components/CaseSection';
import MonitorPage from '@/components/MonitorPage';
import AnalysisPage from '@/components/AnalysisPage';

// Mock data for Storage Box 1
const storageBox1Data = {
  total: 40,
  delay: 7,
  detection: 3,
  scrap: 5,
  humidity: 30,
  temperature: 28,
  statusCounts: {
    normal: 25,
    testing: 7,
    lost: 3,
    damage: 2,
    scrap: 4,
  },
  doorStatus: 'on' as const,
  lightStatus: 'off' as const,
};

// Mock data for Storage Box 2
const storageBox2Data = {
  total: 20,
  delay: 0,
  detection: 0,
  scrap: 0,
  humidity: 38,
  temperature: 28,
  statusCounts: {
    normal: 19,
    testing: 1,
    lost: 0,
    damage: 0,
    scrap: 0,
  },
  doorStatus: 'off' as const,
  lightStatus: 'on' as const,
};

// Mock data for Case 01
const case01Data = {
  shaftItems: [
    { id: 1, name: 'Shaft 1', status: 'Normal', statusType: 'normal' as const, count: 8 },
    { id: 2, name: 'Shaft 2', status: 'Lost', statusType: 'lost' as const, count: 1 },
    { id: 3, name: 'Shaft 3', status: 'Testing', statusType: 'testing' as const, count: 2 },
    { id: 4, name: 'Shaft 4', status: 'Scrap', statusType: 'scrap' as const, count: 1 },
    { id: 5, name: 'Shaft 5', status: 'Lost', statusType: 'lost' as const, count: 1 },
    { id: 6, name: 'Shaft 6', status: 'Damage', statusType: 'damage' as const, count: 1 },
  ],
  capacitiveItems: [
    { id: 1, name: 'Capacitive 1', status: 'Normal', statusType: 'normal' as const, count: 5 },
    { id: 2, name: 'Capacitive 2', status: 'Lost', statusType: 'lost' as const, count: 1 },
    { id: 3, name: 'Capacitive 3', status: 'Testing', statusType: 'testing' as const, count: 1 },
    { id: 4, name: 'Capacitive 4', status: 'Scrap', statusType: 'scrap' as const, count: 1 },
  ],
  blanketItems: [
    { id: 1, name: 'Blanket 1', status: '正常', statusType: 'normal' as const, count: 10 },
    { id: 2, name: 'Blanket 2', status: '測試', statusType: 'testing' as const, count: 1 },
    { id: 3, name: 'Blanket 3', status: '遺失', statusType: 'lost' as const, count: 1 },
    { id: 4, name: 'Blanket 4', status: '遺失', statusType: 'lost' as const, count: 1 },
    { id: 5, name: 'Blanket 5', status: '損壞', statusType: 'damage' as const, count: 1 },
  ],
};

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('home');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Render Monitor page
  if (currentPage === 'monitor') {
    return <MonitorPage onNavigate={setCurrentPage} />;
  }

  // Render Analysis page
  if (currentPage === 'analysis') {
    return <AnalysisPage onNavigate={setCurrentPage} />;
  }

  // Render Record page
  if (currentPage === 'record') {
    return (
      <div className="h-screen w-full bg-[#e8f4f4] flex">
        {/* Sidebar */}
        <Sidebar activeItem={currentPage} onItemClick={setCurrentPage} />
        {/* Main Content */}
        <main className="flex-1 p-8">
          {/* Top Tabs */}
          <div className="flex items-center gap-4 mb-6">
            {["NO.1", "NO.2", "NO.3", "NO.4", "NO.5", "NO.6"].map((tab, idx) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-xl font-semibold shadow ${idx === 1 ? 'bg-[#00b4b4] text-white' : 'bg-white text-[#008080]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          {/* Top Controls */}
          <div className="grid grid-cols-4 gap-6 mb-6">
            <div className="bg-[#008b8b] rounded-2xl p-8 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-white mb-2">OFF</span>
              <span className="text-white/80">LIGHT</span>
            </div>
            <div className="bg-[#e0f7fa] rounded-2xl p-8 flex flex-col items-center justify-center">
              <span className="text-2xl font-bold text-[#008080] mb-2">ON</span>
              <span className="text-[#008080]">DOOR</span>
            </div>
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#008080] font-semibold">DEHUMIDIFIER</span>
                <span className="bg-[#00b4b4] text-white px-2 py-1 rounded-full text-xs">ON</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#008080]">40%</span>
                <button className="bg-gray-100 rounded-full px-2">+</button>
                <button className="bg-gray-100 rounded-full px-2">-</button>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 flex flex-col items-center justify-center shadow">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[#008080] font-semibold">HEATER</span>
                <span className="bg-[#00b4b4] text-white px-2 py-1 rounded-full text-xs">ON</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-[#008080]">25℃</span>
                <button className="bg-gray-100 rounded-full px-2">+</button>
                <button className="bg-gray-100 rounded-full px-2">-</button>
              </div>
            </div>
          </div>
          {/* Charts Row */}
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
              <h3 className="text-[#00b4b4] font-semibold mb-2">MONITORING</h3>
              <div className="relative h-[300px] w-full bg-white rounded-lg shadow flex items-end">
                {/* Chart placeholder */}
                <div className="absolute left-0 bottom-0 ml-4 mb-2 text-xs text-gray-500">Mon</div>
                <div className="absolute left-[16%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Tue</div>
                <div className="absolute left-[32%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Wed</div>
                <div className="absolute left-[48%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Thu</div>
                <div className="absolute left-[64%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Fri</div>
                <div className="absolute left-[80%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Sat</div>
                <div className="absolute right-0 bottom-0 mr-4 mb-2 text-xs text-gray-500">Sun</div>
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 ml-2 mt-2 text-xs text-gray-500">500</div>
                <div className="absolute left-0 top-[25%] ml-2 text-xs text-gray-500">400</div>
                <div className="absolute left-0 top-[50%] ml-2 text-xs text-gray-500">300</div>
                <div className="absolute left-0 top-[75%] ml-2 text-xs text-gray-500">200</div>
                <div className="absolute left-0 bottom-0 ml-2 mb-2 text-xs text-gray-500">100</div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
              <h3 className="text-[#00b4b4] font-semibold mb-2">EARLY WARNING</h3>
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Early warning chart placeholder */}
                <div className="w-44 h-44 bg-[#e0f7fa] rounded-full flex items-center justify-center relative">
                  <span className="absolute top-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full text-[#00b4b4] font-bold shadow">25℃</span>
                  <span className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full text-[#00b4b4] font-bold shadow">53%</span>
                </div>
                <div className="flex gap-4 mt-4">
                  <div className="bg-[#f97316]/10 rounded-xl px-4 py-2 text-[#f97316] font-semibold">OPEN</div>
                  <div className="bg-[#6366f1]/10 rounded-xl px-4 py-2 text-[#6366f1] font-semibold">DRY</div>
                  <div className="bg-[#ef4444]/10 rounded-xl px-4 py-2 text-[#ef4444] font-semibold">HOT</div>
                </div>
              </div>
            </div>
          </div>
          {/* Bottom Row */}
          <div className="grid grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
              <div className="flex gap-8">
                <div className="flex flex-col items-center">
                  <span className="text-[#6366f1] font-bold text-lg mb-2">NO.3</span>
                  <span className="bg-[#6366f1]/10 text-[#6366f1] font-semibold px-6 py-2 rounded-xl">DRY</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-[#f97316] font-bold text-lg mb-2">NO.4</span>
                  <span className="bg-[#f97316]/10 text-[#f97316] font-semibold px-6 py-2 rounded-xl">OPEN</span>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
              <h3 className="text-[#00b4b4] font-semibold mb-2">EQUIPMENT</h3>
              {/* Equipment chart placeholder */}
              <div className="h-32 w-full bg-[#e0f7fa] rounded-lg mt-2"></div>
            </div>
            <div className="bg-white rounded-2xl shadow p-6 flex flex-col">
              <h3 className="text-[#00b4b4] font-semibold mb-2">ALL</h3>
              <div className="flex flex-col gap-3 mt-2">
                <div className="flex items-center justify-between bg-white/80 rounded-xl p-3">
                  <span className="font-bold text-[#008080]">NO.1</span>
                  <span className="text-gray-600">63% 26°C</span>
                  <span className="bg-[#f97316] text-white px-3 py-1 rounded-full font-semibold">OPEN</span>
                </div>
                <div className="flex items-center justify-between bg-white/80 rounded-xl p-3">
                  <span className="font-bold text-[#008080]">NO.2</span>
                  <span className="text-gray-600">43% 28°C</span>
                  <span className="bg-[#00b4b4] text-white px-3 py-1 rounded-full font-semibold">NORMAL</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Render Home page (default)
  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#e8f4f4] to-[#d4ebeb] p-2 sm:p-3 lg:p-4 xl:p-5 flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Menu Button - Apple Style */}
      <button 
        className="lg:hidden fixed top-3 left-3 z-50 bg-white/80 backdrop-blur-xl text-gray-800 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg 
          border border-white/20 transition-all duration-200 active:scale-95"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={sidebarOpen}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 transition-transform duration-300 ease-out`}>
        <Sidebar activeItem={currentPage} onItemClick={(item) => { setCurrentPage(item); setSidebarOpen(false); }} />
      </aside>
      
      {/* Overlay for mobile - Blur effect */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden animate-fade-in" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-3 xl:ml-4 flex flex-col min-h-0 mt-14 sm:mt-16 lg:mt-0">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto px-0.5 sm:px-1 lg:px-2 pb-2 sm:pb-4">
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
              {/* Storage Box 1 */}
              <StorageBox boxNumber={1} data={storageBox1Data} />
              
              {/* Case Section */}
              <CaseSection
                caseNumber="01"
                shaftItems={case01Data.shaftItems}
                capacitiveItems={case01Data.capacitiveItems}
                blanketItems={case01Data.blanketItems}
              />
            </div>
            
            {/* Right Column */}
            <div className="flex flex-col gap-2 sm:gap-3 lg:gap-4">
              {/* Storage Box 2 */}
              <StorageBox boxNumber={2} data={storageBox2Data} />
              
              {/* System Overview - Glass Card */}
              <div className="glass-card p-3 sm:p-4 lg:p-5 flex-1 min-h-[250px] sm:min-h-[280px] lg:min-h-[300px] animate-fade-in" style={{ animationDelay: '100ms' }}>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 mb-3 sm:mb-4 lg:mb-5 tracking-tight">System Overview</h3>
                <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:gap-4">
                  {[
                    { label: 'Total Items', value: '60', change: '↑ 5% from last week', color: 'teal', positive: true },
                    { label: 'In Testing', value: '8', change: '3 pending review', color: 'yellow', positive: null },
                    { label: 'Damaged', value: '3', change: 'Needs attention', color: 'red', positive: false },
                    { label: 'Normal Status', value: '44', change: '73% of total', color: 'green', positive: true },
                  ].map((stat, index) => (
                    <div 
                      key={stat.label}
                      className={`bg-gradient-to-br from-${stat.color}-50 to-${stat.color}-100/50 rounded-xl sm:rounded-2xl p-2.5 sm:p-3 lg:p-4 
                        transition-all duration-300 hover:shadow-lg hover:scale-[1.02] cursor-default`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="text-[10px] sm:text-xs font-medium text-gray-500 mb-0.5 sm:mb-1">{stat.label}</div>
                      <div className={`text-lg sm:text-2xl lg:text-3xl font-bold text-${stat.color}-600 tabular-nums`}>{stat.value}</div>
                      <div className={`text-[10px] sm:text-xs mt-0.5 sm:mt-1 font-medium ${
                        stat.positive === true ? 'text-green-500' : 
                        stat.positive === false ? 'text-red-500' : 
                        'text-gray-400'
                      }`}>{stat.change}</div>
                    </div>
                  ))}
                </div>
                
                {/* Activity Timeline - Apple Style */}
                <div className="mt-3 sm:mt-4 lg:mt-5">
                  <h4 className="font-semibold text-gray-700 mb-2 sm:mb-3 text-xs sm:text-sm">Recent Activity</h4>
                  <div className="space-y-1.5 sm:space-y-2">
                    {[
                      { color: 'teal', text: 'Shaft 1 status updated to Normal', time: '2 min ago' },
                      { color: 'yellow', text: 'Capacitive 3 moved to Testing', time: '15 min ago' },
                      { color: 'red', text: 'Blanket 5 marked as Damage', time: '1 hour ago' },
                    ].map((activity, index) => (
                      <div 
                        key={index}
                        className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 bg-gray-50/80 rounded-lg sm:rounded-xl hover:bg-gray-100 transition-colors duration-200"
                      >
                        <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 bg-${activity.color}-500 rounded-full flex-shrink-0 animate-pulse`}></div>
                        <span className="text-xs sm:text-sm text-gray-600 flex-1 truncate">{activity.text}</span>
                        <span className="text-[10px] sm:text-xs text-gray-400 font-medium whitespace-nowrap">{activity.time}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
