'use client';

import React, { useState } from 'react';
import { Lightbulb, DoorOpen, MapPin, Bell, Flame, Droplets, Plus, Minus, ChevronLeft } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface ToggleControlProps {
  label: string;
  icon: React.ReactNode;
  isOn: boolean;
  onToggle: () => void;
}

function ToggleControl({ label, icon, isOn, onToggle }: ToggleControlProps) {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4">
      <div className="flex items-center gap-3">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all
          ${isOn ? 'bg-gradient-to-br from-[#00b4b4] to-[#009999] text-white' : 'bg-gray-100 text-gray-500'}`}>
          {icon}
        </div>
        <span className="text-sm sm:text-base font-semibold text-gray-700">{label}</span>
      </div>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-semibold ${isOn ? 'text-gray-400' : 'text-gray-700'}`}>
          {isOn ? 'ON' : 'OFF'}
        </span>
        <button
          onClick={onToggle}
          className={`relative w-[50px] h-[30px] rounded-full transition-all duration-300 shadow-inner
            ${isOn ? 'bg-gradient-to-r from-[#00b4b4] to-[#009999]' : 'bg-gray-300'}`}
          role="switch"
          aria-checked={isOn}
        >
          <div className={`absolute top-[2px] w-[26px] h-[26px] bg-white rounded-full shadow-lg transition-all duration-300
            ${isOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}`} />
        </button>
      </div>
    </div>
  );
}

interface SensorDetailPageProps {
  sensorNumber: string;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function SensorDetailPage({ sensorNumber, onBack, onNavigate }: SensorDetailPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [light, setLight] = useState(sensorNumber === 'NO.1');
  const [door, setDoor] = useState(false);
  const [guidingLamp, setGuidingLamp] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [heaterOn, setHeaterOn] = useState(true);
  const [heaterTemp, setHeaterTemp] = useState(25);
  const [dehumidifierOn, setDehumidifierOn] = useState(true);
  const [humidity, setHumidity] = useState(40);

  return (
    <div className="h-screen w-full bg-gradient-to-br from-[#e8f4f4] to-[#d4ebeb] p-2 sm:p-3 lg:p-4 xl:p-5 flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-3 left-3 z-50 bg-white/80 backdrop-blur-xl text-gray-800 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg 
          border border-white/20 transition-all duration-200 active:scale-95"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 transition-transform duration-300 ease-out`}>
        <Sidebar activeItem="monitor" onItemClick={(item) => { onNavigate(item); setSidebarOpen(false); }} />
      </aside>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-3 xl:ml-4 flex flex-col min-h-0 mt-14 sm:mt-16 lg:mt-0">
        <Header />
        
        <div className="flex-1 overflow-y-auto px-0.5 sm:px-1 lg:px-2 pb-2 sm:pb-4">
          {/* Back Button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 mb-3 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all"
          >
            <ChevronLeft size={20} className="text-[#00b4b4]" />
            <span className="text-sm font-semibold text-gray-700">Back to Monitor</span>
          </button>

          {/* Sensor Header */}
          <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-3 sm:mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">SENSOR {sensorNumber}</h2>
            <p className="text-sm text-gray-500 mt-1">Control all settings for this sensor</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* Left Column - Toggle Controls */}
            <div className="space-y-3 sm:space-y-4">
              {/* Toggle Switches Card */}
              <div className="glass-card rounded-xl sm:rounded-2xl divide-y divide-gray-100">
                <ToggleControl
                  label="LIGHT"
                  icon={<Lightbulb size={20} />}
                  isOn={light}
                  onToggle={() => setLight(!light)}
                />
                <ToggleControl
                  label="DOOR"
                  icon={<DoorOpen size={20} />}
                  isOn={door}
                  onToggle={() => setDoor(!door)}
                />
                <ToggleControl
                  label="GUIDING LAMP"
                  icon={<MapPin size={20} />}
                  isOn={guidingLamp}
                  onToggle={() => setGuidingLamp(!guidingLamp)}
                />
                <ToggleControl
                  label="ALARM"
                  icon={<Bell size={20} />}
                  isOn={alarm}
                  onToggle={() => setAlarm(!alarm)}
                />
              </div>

              {/* Dehumidifier */}
              <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Dehumidifier</span>
                  <button
                    onClick={() => setDehumidifierOn(!dehumidifierOn)}
                    className={`px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all
                      ${dehumidifierOn ? 'bg-gradient-to-r from-[#00b4b4] to-[#009999] text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {dehumidifierOn ? 'ON' : 'OFF'}
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <Droplets size={32} className="text-[#00b4b4]" />
                  <span className="text-5xl font-bold text-gray-800 tabular-nums">{humidity}</span>
                  <span className="text-3xl font-medium text-gray-400">%</span>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => setHumidity(Math.min(100, humidity + 1))}
                      className="w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center shadow-sm"
                    >
                      <Plus size={18} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => setHumidity(Math.max(0, humidity - 1))}
                      className="w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center shadow-sm"
                    >
                      <Minus size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Heater & Warning */}
            <div className="space-y-3 sm:space-y-4">
              {/* Heater Control */}
              <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5">
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Heater</span>
                  <div className="flex gap-1.5 text-sm">
                    <span>❄</span>
                    <span>🌡</span>
                    <span>🔥</span>
                  </div>
                  <button
                    onClick={() => setHeaterOn(!heaterOn)}
                    className={`ml-auto px-5 py-2 rounded-full text-sm font-bold shadow-sm transition-all
                      ${heaterOn ? 'bg-gradient-to-r from-[#00b4b4] to-[#009999] text-white' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {heaterOn ? 'ON' : 'OFF'}
                  </button>
                </div>
                <div className="flex items-center gap-4">
                  <Flame size={32} className="text-[#00b4b4]" />
                  <span className="text-5xl font-bold text-gray-800 tabular-nums">{heaterTemp}</span>
                  <span className="text-3xl font-medium text-gray-400">°C</span>
                  <div className="flex items-center gap-2 ml-auto">
                    <button
                      onClick={() => setHeaterTemp(heaterTemp + 1)}
                      className="w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center shadow-sm"
                    >
                      <Plus size={18} className="text-gray-600" />
                    </button>
                    <button
                      onClick={() => setHeaterTemp(Math.max(0, heaterTemp - 1))}
                      className="w-11 h-11 bg-gray-50 hover:bg-gray-100 rounded-xl flex items-center justify-center shadow-sm"
                    >
                      <Minus size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Early Warning Gauge */}
              <div className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center">
                <h4 className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-4">Early Warning</h4>
                <div className="relative w-40 h-40">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="10" 
                      strokeDasharray="62.8 188.4" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="10" 
                      strokeDasharray="62.8 188.4" strokeDashoffset="-62.8" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10" 
                      strokeDasharray="62.8 188.4" strokeDashoffset="-125.6" strokeLinecap="round" />
                    <circle cx="50" cy="50" r="40" fill="none" stroke="#00b4b4" strokeWidth="10" 
                      strokeDasharray="62.8 188.4" strokeDashoffset="-188.4" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-lg font-bold text-orange-500 flex items-center gap-1">
                      ⚡ 35°C
                    </span>
                    <span className="text-base font-semibold text-[#00b4b4] flex items-center gap-1">
                      💧 63%
                    </span>
                  </div>
                </div>
                <div className="flex gap-4 mt-4">
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 bg-red-500 rounded-full"></span>
                    <span className="font-medium text-gray-600">49°C</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
                    <span className="font-medium text-gray-600">10%</span>
                  </span>
                  <span className="flex items-center gap-2 text-sm">
                    <span className="w-3 h-3 bg-[#00b4b4] rounded-full"></span>
                    <span className="font-medium text-gray-600">ON</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
