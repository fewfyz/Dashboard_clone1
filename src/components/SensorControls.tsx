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
    <div className="flex flex-col items-center gap-2 sm:gap-3">
      <span className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <div className="flex items-center gap-2 sm:gap-3">
        <span className={`text-[11px] sm:text-xs font-semibold transition-colors ${!isOn ? 'text-gray-700' : 'text-gray-400'}`}>OFF</span>
        <button
          onClick={onToggle}
          className={`relative w-[51px] h-[31px] rounded-full transition-all duration-300 ease-out
            ${isOn ? 'bg-[#00b4b4]' : 'bg-gray-300'}
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4b4] focus-visible:ring-offset-2`}
          role="switch"
          aria-checked={isOn}
          aria-label={`${label} toggle`}
        >
          <div className={`absolute top-[2px] w-[27px] h-[27px] bg-white rounded-full shadow-lg 
            transition-transform duration-300 ease-out
            ${isOn ? 'translate-x-[22px]' : 'translate-x-[2px]'}`}
          />
        </button>
        <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center transition-all duration-200
          ${isOn 
            ? 'bg-[#00b4b4] text-white' 
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
    <div className="glass-card rounded-2xl p-4 sm:p-5">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
        <button
          onClick={onToggle}
          className={`min-h-[32px] px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
            ${isOn 
              ? 'bg-[#00b4b4] text-white' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
        >
          {isOn ? 'ON' : 'OFF'}
        </button>
      </div>
      <div className="flex items-center gap-3 sm:gap-4">
        <div className="text-[#00b4b4]">{icon}</div>
        <span className="text-3xl sm:text-4xl font-bold text-gray-800 tracking-tight">{value}</span>
        <span className="text-xl sm:text-2xl font-medium text-gray-400">{unit}</span>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onIncrease}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
              rounded-xl flex items-center justify-center transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00b4b4]"
            aria-label={`Increase ${label}`}
          >
            <Plus size={18} className="text-gray-600" />
          </button>
          <button
            onClick={onDecrease}
            className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
              rounded-xl flex items-center justify-center transition-all duration-150
              focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label={`Decrease ${label}`}
          >
            <Minus size={18} className="text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function SensorControls() {
  const [activeTab, setActiveTab] = useState('NO.2');
  const [light, setLight] = useState(false);
  const [door, setDoor] = useState(true);
  const [guidingLamp, setGuidingLamp] = useState(false);
  const [alarm, setAlarm] = useState(false);
  const [heaterOn, setHeaterOn] = useState(true);
  const [heaterTemp, setHeaterTemp] = useState(25);
  const [dehumidifierOn, setDehumidifierOn] = useState(true);
  const [humidity, setHumidity] = useState(40);

  const tabs = ['NO.1', 'NO.2', 'NO.3', 'NO.4', 'NO.5', 'NO.6'];

  return (
    <div className="glass-card rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 animate-fade-in">
      {/* Header with tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-3 tracking-wide">SENSOR</h3>
          <div className="flex flex-wrap gap-1.5 sm:gap-2" role="tablist">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                role="tab"
                aria-selected={activeTab === tab}
                className={`min-h-[32px] px-3 sm:px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200
                  ${activeTab === tab
                    ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200 active:bg-gray-300'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <button 
          className="self-start sm:self-auto w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
            rounded-full flex items-center justify-center transition-all duration-150 shadow-sm
            focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label="Add sensor"
        >
          <Plus size={18} className="text-gray-600" />
        </button>
      </div>

      {/* Toggle Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-5 p-3 sm:p-4 bg-gray-50/50 rounded-2xl">
        <ToggleButton
          label="Light"
          icon={<Lightbulb size={18} />}
          isOn={light}
          onToggle={() => setLight(!light)}
        />
        <ToggleButton
          label="Door"
          icon={<DoorOpen size={18} />}
          isOn={door}
          onToggle={() => setDoor(!door)}
        />
        <ToggleButton
          label="Guiding Lamp"
          icon={<MapPin size={18} />}
          isOn={guidingLamp}
          onToggle={() => setGuidingLamp(!guidingLamp)}
        />
        <ToggleButton
          label="Alarm"
          icon={<Bell size={18} />}
          isOn={alarm}
          onToggle={() => setAlarm(!alarm)}
        />
      </div>

      {/* Heater and Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
        <div className="glass-card rounded-2xl p-4 sm:p-5">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">Heater</span>
            <div className="flex gap-1.5 text-sm">
              <span className="text-blue-400">❄</span>
              <span className="text-orange-400">🌡</span>
              <span className="text-red-400">🔥</span>
            </div>
            <button
              onClick={() => setHeaterOn(!heaterOn)}
              className={`ml-auto min-h-[28px] px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200
                ${heaterOn 
                  ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-sm' 
                  : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}`}
            >
              {heaterOn ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <Flame size={28} className="text-teal-500" />
            <span className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">{heaterTemp}</span>
            <span className="text-2xl sm:text-3xl font-medium text-gray-400">°C</span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setHeaterTemp(heaterTemp + 1)}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
                  rounded-xl flex items-center justify-center transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Increase temperature"
              >
                <Plus size={18} className="text-gray-600" />
              </button>
              <button
                onClick={() => setHeaterTemp(Math.max(0, heaterTemp - 1))}
                className="w-10 h-10 sm:w-11 sm:h-11 bg-gray-50 hover:bg-gray-100 active:bg-gray-200 
                  rounded-xl flex items-center justify-center transition-all duration-150
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-label="Decrease temperature"
              >
                <Minus size={18} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Circular Gauge */}
        <div className="glass-card rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center">
          <div className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide mb-3">Early Warning</div>
          <div className="relative w-28 h-28 sm:w-32 sm:h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f3f4f6" strokeWidth="10" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="10" strokeDasharray="62.8 188.4" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="10" strokeDasharray="62.8 188.4" strokeDashoffset="-62.8" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="10" strokeDasharray="62.8 188.4" strokeDashoffset="-125.6" strokeLinecap="round" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="10" strokeDasharray="62.8 188.4" strokeDashoffset="-188.4" strokeLinecap="round" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-sm font-semibold text-teal-500">⚡ 35°C</span>
              <span className="text-sm font-medium text-gray-400">💧 63%</span>
            </div>
          </div>
          <div className="flex gap-3 sm:gap-4 mt-3 text-[11px] sm:text-xs font-medium">
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm"></span>49°C</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-yellow-500 rounded-full shadow-sm"></span>10%</span>
            <span className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 bg-teal-500 rounded-full shadow-sm"></span>ON</span>
          </div>
        </div>
      </div>

      {/* Dehumidifier */}
      <div className="glass-card rounded-2xl p-4 sm:p-5 bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[11px] sm:text-xs font-medium text-gray-500 uppercase tracking-wide">Dehumidifier</span>
          <button
            onClick={() => setDehumidifierOn(!dehumidifierOn)}
            className={`ml-auto min-h-[28px] px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200
              ${dehumidifierOn 
                ? 'bg-gradient-to-r from-teal-400 to-teal-600 text-white shadow-sm' 
                : 'bg-gray-200 text-gray-500 hover:bg-gray-300'}`}
          >
            {dehumidifierOn ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="flex items-center gap-3 sm:gap-4">
          <Droplets size={28} className="text-teal-500" />
          <span className="text-4xl sm:text-5xl font-bold text-gray-800 tracking-tight">{humidity}</span>
          <span className="text-2xl sm:text-3xl font-medium text-gray-400">%</span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setHumidity(Math.min(100, humidity + 1))}
              className="w-10 h-10 sm:w-11 sm:h-11 bg-white hover:bg-gray-50 active:bg-gray-100 
                rounded-xl flex items-center justify-center transition-all duration-150 shadow-sm border border-gray-100
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Increase humidity"
            >
              <Plus size={18} className="text-gray-600" />
            </button>
            <button
              onClick={() => setHumidity(Math.max(0, humidity - 1))}
              className="w-10 h-10 sm:w-11 sm:h-11 bg-white hover:bg-gray-50 active:bg-gray-100 
                rounded-xl flex items-center justify-center transition-all duration-150 shadow-sm border border-gray-100
                focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Decrease humidity"
            >
              <Minus size={18} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
