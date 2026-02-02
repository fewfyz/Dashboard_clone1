import React, { useState } from 'react';
import Link from 'next/link';
import '../styles/record.css';

const menuList = [
  { name: 'Home', icon: '🏠', href: '/' },
  { name: 'Monitor', icon: '🕑', href: '/monitor' },
  { name: 'Analysis', icon: '📊', href: '/analysis' },
  { name: 'Record', icon: '🗂', href: '/record' },
];

export default function RecordPage() {
  const [recordMode, setRecordMode] = useState(true);

  return (
    <div className={`flex min-h-screen bg-[#e0f7fa] ${recordMode ? 'record-mode' : ''}`}>
      {/* Sidebar */}
      <aside className="w-64 bg-white/60 rounded-r-3xl p-6 flex flex-col gap-6 shadow-lg">
        <div className="mb-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00b4b4] rounded-full flex items-center justify-center text-white font-bold">⦿</div>
          <span className="font-bold text-[#008080] text-lg">DASHBOARD</span>
        </div>
        <nav className="flex flex-col gap-3">
          {menuList.map(menu => (
            <Link href={menu.href} key={menu.name} legacyBehavior>
              <a className={`sidebar-btn ${menu.name === 'Record' ? 'active' : 'normal'} flex items-center gap-2 px-4 py-3 rounded-xl text-left font-semibold`}>
                <span>{menu.icon}</span>
                {menu.name}
              </a>
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex gap-2">
          <button className="w-8 h-8 bg-[#e0f7fa] rounded-full flex items-center justify-center">⚙️</button>
          <button className="w-8 h-8 bg-[#e0f7fa] rounded-full flex items-center justify-center">❓</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 record-dashboard">
        {/* Toggle for Record mode (applies styles from test_dashboard.txt via record.css) */}
        <div className="mb-4 flex items-center gap-4">
          <button onClick={() => setRecordMode(m => !m)} className="px-4 py-2 rounded bg-[#007C84] text-white">Toggle Record View</button>
          <span className="text-sm text-gray-600">Record mode is {recordMode ? 'ON' : 'OFF'}</span>
        </div>

        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
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

        {/* Top Controls Row */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#00b4b4] mb-2">OFF</span>
            <span className="text-gray-500">LIGHT</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
            <span className="text-2xl font-bold text-[#00b4b4] mb-2">ON</span>
            <span className="text-gray-500">DOOR</span>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#00b4b4] font-semibold">HEATER</span>
              <span className="bg-[#00b4b4] text-white px-2 py-1 rounded-full text-xs">ON</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#00b4b4]">25℃</span>
              <button className="bg-gray-100 rounded-full px-2">+</button>
              <button className="bg-gray-100 rounded-full px-2">-</button>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 flex flex-col items-center justify-center">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#00b4b4] font-semibold">DEHUMIDIFIER</span>
              <span className="bg-[#00b4b4] text-white px-2 py-1 rounded-full text-xs">ON</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-[#00b4b4]">40%</span>
              <button className="bg-gray-100 rounded-full px-2">+</button>
              <button className="bg-gray-100 rounded-full px-2">-</button>
            </div>
          </div>
        </div>

        {/* Main Charts Row */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="col-span-2 bg-white rounded-2xl shadow p-4 flex flex-col">
            <h3 className="text-[#00b4b4] font-semibold mb-2">MONITORING</h3>
            <div className="relative h-[260px] w-full bg-white rounded-lg shadow flex items-end">
              {/* Chart placeholder */}
              {/* Y-axis labels, spaced with more left margin */}
              <div className="absolute left-4 top-4 text-xs text-gray-500">500</div>
              <div className="absolute left-4" style={{top: '25%'}}><span className="text-xs text-gray-500">400</span></div>
              <div className="absolute left-4" style={{top: '50%'}}><span className="text-xs text-gray-500">300</span></div>
              <div className="absolute left-4" style={{top: '75%'}}><span className="text-xs text-gray-500">200</span></div>
              <div className="absolute left-4 bottom-4 text-xs text-gray-500">100</div>
              {/* X-axis labels, spaced with more bottom margin and right offset */}
              <div className="absolute bottom-2 left-12 text-xs text-gray-500">Mon</div>
              <div className="absolute bottom-2 left-1/5 text-xs text-gray-500">Tue</div>
              <div className="absolute bottom-2 left-2/5 text-xs text-gray-500">Wed</div>
              <div className="absolute bottom-2 left-3/5 text-xs text-gray-500">Thu</div>
              <div className="absolute bottom-2 left-4/5 text-xs text-gray-500">Fri</div>
              <div className="absolute bottom-2 right-20 text-xs text-gray-500">Sat</div>
              <div className="absolute bottom-2 right-4 text-xs text-gray-500">Sun</div>
            </div>
          </div>
          <div className="bg-white rounded-2xl shadow p-4 flex flex-col">
            <h3 className="text-[#00b4b4] font-semibold mb-2">EARLY WARNING</h3>
            <div className="flex-1 flex flex-col items-center justify-center">
              {/* Early warning chart placeholder */}
              <div className="w-40 h-40 bg-[#e0f7fa] rounded-full flex items-center justify-center relative">
                <span className="absolute top-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full text-[#00b4b4] font-bold shadow">25℃</span>
                <span className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-2 py-1 rounded-full text-[#00b4b4] font-bold shadow">53%</span>
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
        <div className="grid grid-cols-3 gap-4">
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
