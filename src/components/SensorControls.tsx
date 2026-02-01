'use client';

import React, { useState } from 'react';
import { Lightbulb, DoorOpen, MapPin, Bell, Flame, Droplets, Plus, Minus } from 'lucide-react';

interface ToggleButtonProps {
  label: string;
  icon: React.ReactNode;
  isOn: boolean;
  onToggle: () => void;
}

function ToggleButton({ label, icon, isOn, onToggle }: ToggleButtonProps) {
  return (
    <div className="flex flex-col items-center gap-2 sm:gap-2.5">
      <span className="text-[10px] sm:text-[11px] lg:text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2 sm:gap-2.5">
        <span className={`text-[10px] sm:text-[11px] font-semibold transition-colors ${!isOn ? 'text-gray-700' : 'text-gray-400'}`}>OFF</span>
        <button
          onClick={onToggle}
          className={`relative w-[44px] h-[26px] sm:w-[50px] sm:h-[30px] rounded-full transition-all duration-300 shadow-inner
            ${isOn ? 'bg-gradient-to-r from-[#00b4b4] to-[#009999]' : 'bg-gray-300'}
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4b4] focus-visible:ring-offset-2`}
          role="switch"
          aria-checked={isOn}
          aria-label={`${label} toggle`}
        >
          <div className={`absolute top-[2px] w-[22px] h-[22px] sm:w-[26px] sm:h-[26px] bg-white rounded-full shadow-lg 
            transition-all duration-300 ease-out
            ${isOn ? 'translate-x-[20px] sm:translate-x-[22px]' : 'translate-x-[2px]'}`}
          />
        </button>
        <div className={`w-8 h-8 sm:w-9 sm:h-9 lg:w-10 lg:h-10 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm
          ${isOn 
            ? 'bg-gradient-to-br from-[#00b4b4] to-[#009999] text-white shadow-teal-500/25' 
            : 'bg-gray-100 text-gray-500'}`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

interface ValueControlProps {
  label: string;
  value: number;
  unit: string;
  icon: React.ReactNode;
  onIncrease: () => void;
  onDecrease: () => void;
  isOn: boolean;
  onToggle: () => void;
}

function ValueControl({ label, value, unit, icon, onIncrease, onDecrease, isOn, onToggle }: ValueControlProps) {
  return (
    <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between mb-2 sm:mb-3">
        <span className="text-[11px] sm:text-xs font-semibold text-gray-600 uppercase tracking-wide">{label}</span>
        <button
          onClick={onToggle}
          className={`min-h-[30px] sm:min-h-[34px] px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold shadow-sm transition-all duration-200
            ${isOn 
              ? 'bg-gradient-to-r from-[#00b4b4] to-[#009999] text-white shadow-teal-500/25' 
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
        >
          {isOn ? 'ON' : 'OFF'}
        </button>
      </div>
      <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
        <div className="text-[#00b4b4]">{icon}</div>
        <span className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 tracking-tight">{value}</span>
        <span className="text-lg sm:text-xl lg:text-2xl font-medium text-gray-400">{unit}</span>
        <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
          <button
            onClick={onIncrease}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
              rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4b4]"
            aria-label={`Increase ${label}`}
          >
            <Plus size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
          </button>
          <button
            onClick={onDecrease}
            className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
              rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Decrease ${label}`}
          >
            <Minus size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SensorControls() {
  const [activeTab, setActiveTab] = useState('NO.2');
  
  // Each sensor has its own state
  const [sensorStates, setSensorStates] = useState({
    'NO.1': { light: true, door: false, guidingLamp: false, alarm: false, heaterOn: true, heaterTemp: 25, dehumidifierOn: true, humidity: 40 },
    'NO.2': { light: false, door: true, guidingLamp: false, alarm: false, heaterOn: true, heaterTemp: 25, dehumidifierOn: true, humidity: 40 },
    'NO.3': { light: false, door: false, guidingLamp: true, alarm: false, heaterOn: false, heaterTemp: 20, dehumidifierOn: false, humidity: 50 },
    'NO.4': { light: false, door: false, guidingLamp: false, alarm: true, heaterOn: true, heaterTemp: 30, dehumidifierOn: true, humidity: 35 },
    'NO.5': { light: true, door: true, guidingLamp: false, alarm: false, heaterOn: false, heaterTemp: 22, dehumidifierOn: true, humidity: 45 },
    'NO.6': { light: false, door: false, guidingLamp: false, alarm: false, heaterOn: true, heaterTemp: 28, dehumidifierOn: false, humidity: 55 },
  });

  // Get current sensor state
  const currentState = sensorStates[activeTab];

  // Update functions for current sensor
  const updateSensorState = (key: string, value: any) => {
    setSensorStates(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [key]: value
      }
    }));
  };

  const tabs = ['NO.1', 'NO.2', 'NO.3', 'NO.4', 'NO.5', 'NO.6'];

  return (
    <div className="glass-card rounded-xl sm:rounded-2xl lg:rounded-3xl p-3 sm:p-4 lg:p-5 xl:p-6 animate-fade-in">
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 mb-3 sm:mb-4 lg:mb-5">
        <div>
          <h3 className="text-xs sm:text-sm font-semibold text-gray-800 mb-2 sm:mb-3 tracking-wide">SENSOR</h3>
          <div className="flex flex-wrap gap-1 sm:gap-1.5 lg:gap-2" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
                className={`min-h-[28px] sm:min-h-[32px] px-2.5 sm:px-3 lg:px-4 py-1 sm:py-1.5 text-[10px] sm:text-xs font-semibold rounded-full transition-all duration-200
                  ${activeTab === tab
                    ? 'bg-[#00b4b4] text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <button 
          className="self-start sm:self-auto w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
            rounded-full flex items-center justify-center transition-all duration-150 shadow-sm
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Add sensor"
        >
          <Plus size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
        </button>
      </div>

      {/* Toggle Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 xl:gap-6 mb-3 sm:mb-4 lg:mb-5 p-2 sm:p-3 lg:p-4 bg-gray-50/50 rounded-xl sm:rounded-2xl">
        <ToggleButton
          label="Light"
          icon={<Lightbulb size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />}
          isOn={currentState.light}
          onToggle={() => updateSensorState('light', !currentState.light)}
        />
        <ToggleButton
          label="Door"
          icon={<DoorOpen size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />}
          isOn={currentState.door}
          onToggle={() => updateSensorState('door', !currentState.door)}
        />
        <ToggleButton
          label="Guiding Lamp"
          icon={<MapPin size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />}
          isOn={currentState.guidingLamp}
          onToggle={() => updateSensorState('guidingLamp', !currentState.guidingLamp)}
        />
        <ToggleButton
          label="Alarm"
          icon={<Bell size={14} className="sm:w-4 sm:h-4 lg:w-[18px] lg:h-[18px]" />}
          isOn={currentState.alarm}
          onToggle={() => updateSensorState('alarm', !currentState.alarm)}
        />
      </div>

      {/* Heater and Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 lg:gap-4 xl:gap-5 mb-3 sm:mb-4 lg:mb-5">
        <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5">
          <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
            <span className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-500 uppercase tracking-wide">Heater</span>
            <div className="flex gap-1 sm:gap-1.5 text-xs sm:text-sm">
              <span className="text-blue-400">❄</span>
              <span className="text-orange-400">🌡</span>
              <span className="text-red-400">🔥</span>
            </div>
            <button
              onClick={() => updateSensorState('heaterOn', !currentState.heaterOn)}
              className={`ml-auto min-h-[24px] sm:min-h-[28px] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-200
                ${currentState.heaterOn 
                  ? 'bg-[#00b4b4] text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {currentState.heaterOn ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
            <Flame size={22} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-teal-500" />
            <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">{currentState.heaterTemp}</span>
            <span className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-400">°C</span>
            <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
              <button
                onClick={() => updateSensorState('heaterTemp', currentState.heaterTemp + 1)}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
                  rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Increase temperature"
              >
                <Plus size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
              </button>
              <button
                onClick={() => updateSensorState('heaterTemp', Math.max(0, currentState.heaterTemp - 1))}
                className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
                  rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Decrease temperature"
              >
                <Minus size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Circular Gauge */}
        <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 flex flex-col items-center justify-center">
          <div className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 sm:mb-3">Early Warning</div>
          <div className="relative w-20 h-20 sm:w-24 sm:h-24 lg:w-28 lg:h-28 xl:w-32 xl:h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="10" strokeDasharray="62.8 188.4" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="10" strokeDasharray="62.8 188.4" strokeDashoffset="-62.8" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="62.8 188.4" strokeDashoffset="-125.6" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="10" strokeDasharray="62.8 188.4" strokeDashoffset="-188.4" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs sm:text-sm font-semibold text-teal-500">⚡ 35°C</span>
              <span className="text-xs sm:text-sm font-medium text-gray-400">💧 63%</span>
            </div>
          </div>
          <div className="flex gap-2 sm:gap-3 lg:gap-4 mt-2 sm:mt-3 text-[9px] sm:text-[10px] lg:text-[11px] xl:text-xs font-medium">
            <span className="flex items-center gap-1 sm:gap-1.5"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-red-500 rounded-full shadow-sm"></span>49°C</span>
            <span className="flex items-center gap-1 sm:gap-1.5"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-yellow-500 rounded-full shadow-sm"></span>10%</span>
            <span className="flex items-center gap-1 sm:gap-1.5"><span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-teal-500 rounded-full shadow-sm"></span>ON</span>
          </div>
        </div>
      </div>

      {/* Dehumidifier */}
      <div className="glass-card rounded-xl sm:rounded-2xl p-3 sm:p-4 lg:p-5 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-3">
          <span className="text-[10px] sm:text-[11px] lg:text-xs font-medium text-gray-500 uppercase tracking-wide">Dehumidifier</span>
          <button
            onClick={() => updateSensorState('dehumidifierOn', !currentState.dehumidifierOn)}
            className={`ml-auto min-h-[24px] sm:min-h-[28px] px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-all duration-200
              ${currentState.dehumidifierOn 
                ? 'bg-[#00b4b4] text-white shadow-sm' 
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
          >
            {currentState.dehumidifierOn ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-4">
          <Droplets size={22} className="sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-teal-500" />
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-800 tracking-tight">{currentState.humidity}</span>
          <span className="text-xl sm:text-2xl lg:text-3xl font-medium text-gray-400">%</span>
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            <button
              onClick={() => updateSensorState('humidity', Math.min(100, currentState.humidity + 1))}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white hover:bg-gray-50 active:bg-gray-100 
                rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-150 shadow-sm border border-gray-100
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Increase humidity"
            >
              <Plus size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
            </button>
            <button
              onClick={() => updateSensorState('humidity', Math.max(0, currentState.humidity - 1))}
              className="w-8 h-8 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white hover:bg-gray-50 active:bg-gray-100 
                rounded-lg sm:rounded-xl flex items-center justify-center transition-all duration-150 shadow-sm border border-gray-100
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Decrease humidity"
            >
              <Minus size={16} className="sm:w-[18px] sm:h-[18px] text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
