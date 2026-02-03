'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import { Search, Wifi, BarChart3, X } from 'lucide-react';

interface DeviceData {
  id: number;
  buildingName: string;
  deviceName: string;
  energyConsumption: number;
  power: number;
  operate: 'Using' | 'Idle' | 'Off';
  status: 'online' | 'offline';
}

interface DeviceStatusPageProps {
  onNavigate: (page: string) => void;
}

export default function DeviceStatusPage({ onNavigate }: DeviceStatusPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<'All' | 'online' | 'offline' | 'Using' | 'Idle'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [buildingFilter, setBuildingFilter] = useState('');

  const allDevices: DeviceData[] = [
    { id: 1, buildingName: 'อาคาร MD', deviceName: 'MDB DP', energyConsumption: 39318.64, power: 19.68, operate: 'Using', status: 'online' },
    { id: 2, buildingName: 'อาคาร MD', deviceName: 'อาคารชั้น 3', energyConsumption: 7087.82, power: 4.61, operate: 'Using', status: 'online' },
    { id: 3, buildingName: 'อาคาร MD', deviceName: 'LP5', energyConsumption: 2761.17, power: 2.82, operate: 'Using', status: 'online' },
    { id: 4, buildingName: 'อาคาร MD', deviceName: 'LP4', energyConsumption: 1776.09, power: 2.36, operate: 'Using', status: 'online' },
    { id: 5, buildingName: 'อาคาร MD', deviceName: 'อาคารชั้น 2', energyConsumption: 1184.09, power: 0.44, operate: 'Using', status: 'online' },
    { id: 6, buildingName: 'อาคาร MD', deviceName: 'ลิฟท์', energyConsumption: 62.50, power: 0.03, operate: 'Using', status: 'online' },
    { id: 7, buildingName: 'อาคาร MD', deviceName: 'Lab สวัสและภาชภาคา', energyConsumption: 1287.84, power: 0.02, operate: 'Using', status: 'online' },
    { id: 8, buildingName: 'อาคาร A', deviceName: 'Main Panel', energyConsumption: 5432.10, power: 3.21, operate: 'Using', status: 'online' },
    { id: 9, buildingName: 'อาคาร A', deviceName: 'Cooling System', energyConsumption: 8765.43, power: 5.67, operate: 'Idle', status: 'online' },
    { id: 10, buildingName: 'อาคาร B', deviceName: 'HVAC Unit 1', energyConsumption: 3456.78, power: 2.89, operate: 'Using', status: 'offline' },
  ];

  const filteredDevices = allDevices.filter(device => {
    const matchesStatus = statusFilter === 'All' || device.status === statusFilter.toLowerCase() || device.operate === statusFilter;
    const matchesSearch = searchQuery === '' || device.deviceName.toLowerCase().includes(searchQuery.toLowerCase()) || device.buildingName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBuilding = buildingFilter === '' || device.buildingName.toLowerCase().includes(buildingFilter.toLowerCase());
    return matchesStatus && matchesSearch && matchesBuilding;
  });

  const handleSearch = () => {
    console.log('Searching with filters:', { statusFilter, searchQuery, buildingFilter });
  };

  const clearBuildingFilter = () => {
    setBuildingFilter('');
  };

  return (
    <div className="h-screen w-full bg-white p-2 sm:p-3 lg:p-4 xl:p-5 flex flex-col lg:flex-row overflow-hidden">
      <button className="lg:hidden fixed top-3 left-3 z-50 bg-white/80 backdrop-blur-xl text-gray-800 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg border border-white/20 transition-all duration-200 active:scale-95" onClick={() => setSidebarOpen(!sidebarOpen)} aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}>
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>
      <aside className={\`\${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 transition-transform duration-300 ease-out\`}>
        <Sidebar activeItem="device-status" onItemClick={(item) => { onNavigate(item); setSidebarOpen(false); }} />
      </aside>
      {sidebarOpen && (<div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden animate-fade-in" onClick={() => setSidebarOpen(false)} aria-hidden="true" />)}
      <main className="flex-1 lg:ml-3 xl:ml-4 flex flex-col min-h-0 mt-14 sm:mt-16 lg:mt-0">
        <Header />
        <div className="flex-1 overflow-y-auto px-0.5 sm:px-1 lg:px-2 pb-2 sm:pb-4">
          <div className="bg-gray-900 rounded-2xl p-4 mb-4 shadow-lg">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium text-gray-300">Status:</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value as any)} className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none">
                  <option value="All">All</option>
                  <option value="online">Online</option>
                  <option value="offline">Offline</option>
                  <option value="Using">Using</option>
                  <option value="Idle">Idle</option>
                </select>
              </div>
              <div className="flex-1 min-w-[200px]">
                <input type="text" placeholder="Search device or building..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && handleSearch()} className="w-full bg-gray-800 text-white text-sm rounded-lg px-4 py-2 border border-gray-700 focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder-gray-500" />
              </div>
              <button onClick={handleSearch} className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-2">
                <Search size={18} />Search
              </button>
              {buildingFilter && (
                <div className="flex items-center gap-2 bg-gray-800 px-3 py-2 rounded-lg border border-gray-700">
                  <span className="text-sm text-gray-300">Building:</span>
                  <span className="text-sm font-medium text-white">{buildingFilter}</span>
                  <button onClick={clearBuildingFilter} className="text-gray-400 hover:text-white transition-colors"><X size={16} /></button>
                </div>
              )}
            </div>
          </div>
          <div className="text-sm text-gray-600 mb-3 px-1">Showing {filteredDevices.length} of {allDevices.length} devices</div>
          <div className="bg-gray-900 rounded-2xl overflow-hidden shadow-lg">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">No.</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Building Name</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Device Name</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Energy Consumption (kWh)</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Power (kW)</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Operate</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">Status</th>
                    <th className="text-left py-4 px-4 text-sm font-semibold text-gray-400">View</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredDevices.map((device, index) => (
                    <tr key={device.id} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors cursor-pointer" onClick={() => setBuildingFilter(device.buildingName)}>
                      <td className="py-4 px-4 text-sm text-gray-300">{index + 1}</td>
                      <td className="py-4 px-4 text-sm text-gray-300">{device.buildingName}</td>
                      <td className="py-4 px-4 text-sm text-blue-400 font-medium">{device.deviceName}</td>
                      <td className="py-4 px-4 text-sm text-gray-300">{device.energyConsumption.toFixed(2)}</td>
                      <td className="py-4 px-4 text-sm text-gray-300">{device.power.toFixed(2)}</td>
                      <td className="py-4 px-4">
                        <span className={\`inline-flex items-center gap-1 text-xs font-medium \${device.operate === 'Using' ? 'text-red-400' : 'text-gray-400'}\`}>
                          <span className="text-red-400">▶▶</span> {device.operate}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <span className={\`inline-flex items-center gap-1.5 text-xs font-medium \${device.status === 'online' ? 'text-green-400' : 'text-red-400'}\`}>
                          <Wifi size={14} />{device.status}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="text-green-400 hover:text-green-300 transition-colors" onClick={(e) => { e.stopPropagation(); console.log('View device:', device.deviceName); }}>
                          <BarChart3 size={20} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {filteredDevices.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <p className="text-lg">No devices found</p>
                <p className="text-sm mt-2">Try adjusting your filters or search query</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
