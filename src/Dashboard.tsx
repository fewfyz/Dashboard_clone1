import React from 'react';
import AlarmStatus from './components/AlarmStatus';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#e0f7fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white/60 rounded-r-3xl p-6 flex flex-col gap-6 shadow-lg">
        <div className="mb-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00b4b4] rounded-full flex items-center justify-center text-white font-bold">⦿</div>
          <span className="font-bold text-[#008080] text-lg">DASHBOARD</span>
        </div>
        <nav className="flex flex-col gap-3">
          <button className="sidebar-btn">Dashboard</button>
          <button className="sidebar-btn">Home</button>
          <button className="sidebar-btn">Monitor</button>
          <button className="sidebar-btn">Analysis</button>
          <button className="sidebar-btn active">Record</button>
        </nav>
        <div className="mt-auto flex gap-2">
          <button className="w-8 h-8 bg-[#e0f7fa] rounded-full flex items-center justify-center">⚙️</button>
          <button className="w-8 h-8 bg-[#e0f7fa] rounded-full flex items-center justify-center">❓</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-2">
            {["NO.1", "NO.2", "NO.3", "NO.4", "NO.5", "NO.6"].map((tab, idx) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-xl font-semibold shadow ${idx === 1 ? 'bg-[#00b4b4] text-white' : 'bg-white/80 text-[#008080]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <span className="font-bold text-lg">08:53 PM</span>
            <span className="text-gray-600">2022 / 05 / 26</span>
            <button className="w-8 h-8 bg-[#e0f7fa] rounded-full flex items-center justify-center text-xl">+</button>
            <div className="w-8 h-8 bg-[#e0f7fa] rounded-full"></div>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="flex flex-col gap-6">
            {/* Controls */}
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col items-center justify-center bg-[#00b4b4]/10 rounded-xl p-4">
                  <span className="text-lg font-bold text-[#008080]">OFF</span>
                  <span className="mt-2 text-gray-500">LIGHT</span>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center bg-[#00b4b4]/10 rounded-xl p-4">
                  <span className="text-lg font-bold text-[#00b4b4]">ON</span>
                  <span className="mt-2 text-gray-500">DOOR</span>
                </div>
              </div>
            </div>
            {/* Alarm Status */}
            <AlarmStatus />
          </div>

          {/* Center Column */}
          <div className="flex flex-col gap-6">
            {/* Monitoring Chart */}
            <div className="glass-card p-6 rounded-2xl" style={{ height: 320 }}>
              <h3 className="font-semibold mb-4 text-[#00b4b4]">MONITORING</h3>
              {/* Chart area with axis labels */}
              <div className="relative h-[220px] w-full bg-white rounded-lg shadow flex items-end">
                {/* Chart placeholder */}
                <div className="absolute left-0 bottom-0 ml-4 mb-2 text-xs text-gray-500">Mon</div>
                <div className="absolute left-[16%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Tue</div>
                <div className="absolute left-[32%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Wed</div>
                <div className="absolute left-[48%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Thu</div>
                <div className="absolute left-[64%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Fri</div>
                <div className="absolute left-[80%] bottom-0 ml-4 mb-2 text-xs text-gray-500">Sat</div>
                <div className="absolute right-0 bottom-0 mr-4 mb-2 text-xs text-gray-500">Sun</div>
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 ml-2 mt-2 text-xs text-gray-500">900</div>
                <div className="absolute left-0 top-[25%] ml-2 text-xs text-gray-500">700</div>
                <div className="absolute left-0 top-[50%] ml-2 text-xs text-gray-500">500</div>
                <div className="absolute left-0 top-[75%] ml-2 text-xs text-gray-500">300</div>
                <div className="absolute left-0 bottom-0 ml-2 mb-2 text-xs text-gray-500">100</div>
              </div>
            </div>
            {/* Equipment Status */}
            <div className="glass-card p-6 rounded-2xl flex gap-4">
              <div className="flex-1 flex flex-col items-center justify-center bg-[#6366f1]/10 rounded-xl p-4">
                <span className="font-bold text-[#6366f1]">NO.3</span>
                <span className="mt-2 text-[#6366f1] font-semibold">DRY</span>
              </div>
              <div className="flex-1 flex flex-col items-center justify-center bg-[#f97316]/10 rounded-xl p-4">
                <span className="font-bold text-[#f97316]">NO.4</span>
                <span className="mt-2 text-[#f97316] font-semibold">OPEN</span>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-6">
            {/* Controls */}
            <div className="glass-card p-6 rounded-2xl flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#00b4b4]">HEATER</span>
                <button className="toggle-btn">ON</button>
              </div>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-[#00b4b4]">DEHUMIDIFIER</span>
                <button className="toggle-btn">ON</button>
              </div>
            </div>
            {/* Early Warning */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-semibold mb-4 text-[#00b4b4]">EARLY WARNING</h3>
              <div className="flex gap-4 mt-4">
                <div className="bg-[#f97316]/10 rounded-xl px-4 py-2 text-[#f97316] font-semibold">OPEN</div>
                <div className="bg-[#6366f1]/10 rounded-xl px-4 py-2 text-[#6366f1] font-semibold">DRY</div>
                <div className="bg-[#ef4444]/10 rounded-xl px-4 py-2 text-[#ef4444] font-semibold">HOT</div>
              </div>
            </div>
            {/* All Status */}
            <div className="glass-card p-6 rounded-2xl">
              <h3 className="font-semibold mb-4 text-[#00b4b4]">ALL</h3>
              <div className="flex flex-col gap-3">
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
        </div>
      </main>
    </div>
  );
}
