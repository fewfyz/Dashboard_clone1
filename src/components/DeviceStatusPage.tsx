'use client';

import React, { useState, useEffect } from 'react';
import { Wifi, WifiOff, Download } from 'lucide-react';

interface Device {
  id: number;
  buildingName: string;
  deviceName: string;
  energyConsumption: number;
  power: number;
  operate: string;
  status: 'online' | 'offline';
}

interface DeviceStatusPageProps {
  onNavigate: (page: string) => void;
}

export default function DeviceStatusPage({ onNavigate }: DeviceStatusPageProps) {
  const [devices, setDevices] = useState<Device[]>([]);
  const [filteredDevices, setFilteredDevices] = useState<Device[]>([]);
  const [statusFilter, setStatusFilter] = useState<'all' | 'online' | 'offline'>('all');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [selectedBuilding, setSelectedBuilding] = useState('');

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockDevices: Device[] = [
      { id: 1, buildingName: 'อาคาร MD', deviceName: 'MDB DP', energyConsumption: 39318.64, power: 19.68, operate: 'Using', status: 'online' },
      { id: 2, buildingName: 'อาคาร MD', deviceName: 'อาคารชั้น 3', energyConsumption: 7087.82, power: 4.61, operate: 'Using', status: 'online' },
      { id: 3, buildingName: 'อาคาร MD', deviceName: 'LP5', energyConsumption: 2761.17, power: 2.82, operate: 'Using', status: 'online' },
      { id: 4, buildingName: 'อาคาร MD', deviceName: 'LP4', energyConsumption: 1776.09, power: 2.36, operate: 'Using', status: 'online' },
      { id: 5, buildingName: 'อาคาร MD', deviceName: 'อาคารชั้น 2', energyConsumption: 1184.09, power: 0.44, operate: 'Using', status: 'online' },
      { id: 6, buildingName: 'อาคาร MD', deviceName: 'ลิฟท์', energyConsumption: 62.50, power: 0.03, operate: 'Using', status: 'online' },
      { id: 7, buildingName: 'อาคาร MD', deviceName: 'Lab สวัสและกายภาคา', energyConsumption: 1287.84, power: 0.02, operate: 'Using', status: 'online' },
    ];
    setDevices(mockDevices);
    setFilteredDevices(mockDevices);
  }, []);

  // Filter devices based on status and search
  useEffect(() => {
    let filtered = devices;

    // Filter by status
    if (statusFilter === 'online') {
      filtered = filtered.filter(d => d.status === 'online');
    } else if (statusFilter === 'offline') {
      filtered = filtered.filter(d => d.status === 'offline');
    }

    // Filter by search keyword
    if (searchKeyword.trim()) {
      filtered = filtered.filter(d => 
        d.deviceName.toLowerCase().includes(searchKeyword.toLowerCase()) ||
        d.buildingName.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    // Filter by building
    if (selectedBuilding) {
      filtered = filtered.filter(d => d.buildingName === selectedBuilding);
    }

    setFilteredDevices(filtered);
  }, [statusFilter, searchKeyword, selectedBuilding, devices]);

  const totalDevices = devices.length;
  const onlineDevices = devices.filter(d => d.status === 'online').length;
  const offlineDevices = devices.filter(d => d.status === 'offline').length;

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#e8f4f4] to-[#d4ebeb] p-8">
      <div className="max-w-7xl mx-auto">
        {/* Status Cards */}
        <div className="grid grid-cols-3 gap-6 mb-6">
          {/* Total Devices */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Download className="w-12 h-12 text-gray-800 mb-3" />
            <div className="text-4xl font-bold text-gray-800">{totalDevices}</div>
            <button className="mt-3 px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold hover:bg-blue-600 transition">
              Device
            </button>
          </div>

          {/* Online Devices */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <Wifi className="w-12 h-12 text-green-500 mb-3" />
            <div className="text-4xl font-bold text-green-500">{onlineDevices}</div>
            <button className="mt-3 px-6 py-2 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition">
              On-line
            </button>
          </div>

          {/* Offline Devices */}
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
            <WifiOff className="w-12 h-12 text-red-500 mb-3" />
            <div className="text-4xl font-bold text-red-500">{offlineDevices}</div>
            <button className="mt-3 px-6 py-2 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition">
              Off-line
            </button>
          </div>
        </div>

        {/* Filter and Search Section */}
        <div className="bg-gray-900 rounded-t-2xl p-6">
          <div className="flex items-center justify-between gap-4">
            {/* Status Filter */}
            <div className="flex items-center gap-4">
              <label className="text-white font-semibold">Status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as 'all' | 'online' | 'offline')}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All</option>
                <option value="online">Online</option>
                <option value="offline">Offline</option>
              </select>
            </div>

            {/* Search */}
            <div className="flex items-center gap-4 flex-1 max-w-md">
              <input
                type="text"
                placeholder="Enter the keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-500"
              />
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search
              </button>
            </div>

            {/* Building Filter */}
            <div className="flex items-center gap-2">
              <label className="text-white font-semibold">Building:</label>
              <div className="bg-gray-800 px-4 py-2 rounded-lg text-white flex items-center gap-2">
                {selectedBuilding || 'อาคาร MD'}
                <button 
                  onClick={() => setSelectedBuilding('')}
                  className="text-gray-400 hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gray-900 rounded-b-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">No.</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Building Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Device Name</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Energy Consumption (kWh)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Power (kW)</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Operate</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Status</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">View</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800">
                {filteredDevices.map((device) => (
                  <tr key={device.id} className="hover:bg-gray-800/50 transition">
                    <td className="px-6 py-4 text-white">{device.id}</td>
                    <td className="px-6 py-4 text-white">{device.buildingName}</td>
                    <td className="px-6 py-4 text-blue-400 font-semibold">{device.deviceName}</td>
                    <td className="px-6 py-4 text-white">{device.energyConsumption.toFixed(2)}</td>
                    <td className="px-6 py-4 text-white">{device.power.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span className="text-red-500 flex items-center gap-1">
                        <span>▶▶</span>
                        <span>{device.operate}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="flex items-center gap-2">
                        <Wifi className="w-4 h-4 text-green-500" />
                        <span className="text-white">{device.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1">
                        <div className="w-1 h-6 bg-green-500 rounded"></div>
                        <div className="w-1 h-6 bg-green-500 rounded"></div>
                        <div className="w-1 h-6 bg-green-500 rounded"></div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
