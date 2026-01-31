'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';
import StorageBox from '@/components/StorageBox';
import CaseSection from '@/components/CaseSection';

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
  const [activeMenuItem, setActiveMenuItem] = useState('home');

  return (
    <div className="w-[1920px] h-[1080px] bg-[#c5e8e8] p-4 flex">
      {/* Sidebar */}
      <Sidebar activeItem={activeMenuItem} onItemClick={setActiveMenuItem} />
      
      {/* Main Content */}
      <div className="flex-1 ml-4 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />
        
        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto pr-2">
          <div className="grid grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="flex flex-col gap-4">
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
            <div className="flex flex-col gap-4">
              {/* Storage Box 2 */}
              <StorageBox boxNumber={2} data={storageBox2Data} />
              
              {/* Additional content area */}
              <div className="card flex-1 min-h-[300px]">
                <h3 className="text-lg font-bold text-gray-800 mb-4">System Overview</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gradient-to-br from-teal-50 to-teal-100 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Total Items</div>
                    <div className="text-3xl font-bold text-teal-600">60</div>
                    <div className="text-xs text-green-500 mt-1">↑ 5% from last week</div>
                  </div>
                  <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">In Testing</div>
                    <div className="text-3xl font-bold text-yellow-600">8</div>
                    <div className="text-xs text-yellow-500 mt-1">3 pending review</div>
                  </div>
                  <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Damaged</div>
                    <div className="text-3xl font-bold text-red-600">3</div>
                    <div className="text-xs text-red-500 mt-1">Needs attention</div>
                  </div>
                  <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                    <div className="text-sm text-gray-500 mb-1">Normal Status</div>
                    <div className="text-3xl font-bold text-green-600">44</div>
                    <div className="text-xs text-green-500 mt-1">73% of total</div>
                  </div>
                </div>
                
                {/* Activity Timeline */}
                <div className="mt-4">
                  <h4 className="font-semibold text-gray-700 mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Shaft 1 status updated to Normal</span>
                      <span className="text-xs text-gray-400 ml-auto">2 min ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                      <span className="text-sm text-gray-600">Capacitive 3 moved to Testing</span>
                      <span className="text-xs text-gray-400 ml-auto">15 min ago</span>
                    </div>
                    <div className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                      <span className="text-sm text-gray-600">Blanket 5 marked as Damage</span>
                      <span className="text-xs text-gray-400 ml-auto">1 hour ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
