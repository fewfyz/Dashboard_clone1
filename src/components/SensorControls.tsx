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
    <div className="flex flex-col items-center gap-2">
      <span className="text-xs text-gray-500 uppercase">{label}</span>
      <div className="flex items-center gap-2">
        <span className={`text-xs font-medium ${!isOn ? 'text-gray-700' : 'text-gray-400'}`}>OFF</span>
        <button
          onClick={onToggle}
          className={`w-14 h-7 rounded-full p-1 transition-colors ${isOn ? 'bg-teal-500' : 'bg-gray-300'}`}
        >
          <div className={`w-5 h-5 bg-white rounded-full shadow-md transition-transform ${isOn ? 'translate-x-7' : 'translate-x-0'}`}></div>
        </button>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${isOn ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
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
    <div className="bg-white rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 uppercase">{label}</span>
        <button
          onClick={onToggle}
          className={`px-3 py-1 rounded-full text-xs font-medium ${isOn ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'}`}
        >
          {isOn ? 'ON' : 'OFF'}
        </button>
      </div>
      <div className="flex items-center gap-3">
        <div className="text-teal-500">{icon}</div>
        <span className="text-3xl font-bold text-gray-800">{value}</span>
        <span className="text-xl text-gray-500">{unit}</span>
        <div className="flex items-center gap-2 ml-auto">
          <button
            onClick={onIncrease}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
          <button
            onClick={onDecrease}
            className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
          >
            <Minus size={16} className="text-gray-600" />
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
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      {/* Header with tabs */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-800 mb-2">SENSOR</h3>
          <div className="flex gap-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1 text-xs rounded-full transition-colors ${
                  activeTab === tab
                    ? 'bg-teal-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
        <button className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
          <Plus size={16} className="text-gray-600" />
        </button>
      </div>

      {/* Toggle Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
        <ToggleButton
          label="Light"
          icon={<Lightbulb size={16} />}
          isOn={light}
          onToggle={() => setLight(!light)}
        />
        <ToggleButton
          label="Door"
          icon={<DoorOpen size={16} />}
          isOn={door}
          onToggle={() => setDoor(!door)}
        />
        <ToggleButton
          label="Guiding Lamp"
          icon={<MapPin size={16} />}
          isOn={guidingLamp}
          onToggle={() => setGuidingLamp(!guidingLamp)}
        />
        <ToggleButton
          label="Alarm"
          icon={<Bell size={16} />}
          isOn={alarm}
          onToggle={() => setAlarm(!alarm)}
        />
      </div>

      {/* Heater and Gauge */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs text-gray-500 uppercase">Heater</span>
            <div className="flex gap-1">
              <span className="text-gray-400">❄</span>
              <span className="text-gray-400">🌡</span>
              <span className="text-gray-400">🔥</span>
            </div>
            <button
              onClick={() => setHeaterOn(!heaterOn)}
              className={`ml-auto px-2 py-0.5 rounded text-xs ${heaterOn ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'}`}
            >
              {heaterOn ? 'ON' : 'OFF'}
            </button>
          </div>
          <div className="flex items-center gap-3">
            <Flame size={24} className="text-teal-500" />
            <span className="text-4xl font-bold text-gray-800">{heaterTemp}</span>
            <span className="text-2xl text-gray-500">°C</span>
            <div className="flex items-center gap-2 ml-auto">
              <button
                onClick={() => setHeaterTemp(heaterTemp + 1)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
              <button
                onClick={() => setHeaterTemp(Math.max(0, heaterTemp - 1))}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center"
              >
                <Minus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        {/* Circular Gauge */}
        <div className="flex flex-col items-center justify-center">
          <div className="text-xs text-gray-500 uppercase mb-2">Early Warning</div>
          <div className="relative w-28 h-28">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="12" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="12" strokeDasharray="62.8 188.4" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="12" strokeDasharray="62.8 188.4" strokeDashoffset="-62.8" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="12" strokeDasharray="62.8 188.4" strokeDashoffset="-125.6" />
              <circle cx="50" cy="50" r="40" fill="none" stroke="#06b6d4" strokeWidth="12" strokeDasharray="62.8 188.4" strokeDashoffset="-188.4" />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-xs text-teal-500">⚡ 35°C</span>
              <span className="text-xs text-gray-400">💧 63%</span>
            </div>
          </div>
          <div className="flex gap-2 mt-2 text-[10px]">
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-red-500 rounded-full"></span>49°C</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-yellow-500 rounded-full"></span>10%</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 bg-teal-500 rounded-full"></span>ON</span>
          </div>
        </div>
      </div>

      {/* Dehumidifier */}
      <div className="bg-gray-50 rounded-xl p-3">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-gray-500 uppercase">Dehumidifier</span>
          <button
            onClick={() => setDehumidifierOn(!dehumidifierOn)}
            className={`ml-auto px-2 py-0.5 rounded text-xs ${dehumidifierOn ? 'bg-teal-500 text-white' : 'bg-gray-200 text-gray-500'}`}
          >
            {dehumidifierOn ? 'ON' : 'OFF'}
          </button>
        </div>
        <div className="flex items-center gap-3">
          <Droplets size={24} className="text-teal-500" />
          <span className="text-4xl font-bold text-gray-800">{humidity}</span>
          <span className="text-2xl text-gray-500">%</span>
          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => setHumidity(Math.min(100, humidity + 1))}
              className="w-8 h-8 bg-white hover:bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <Plus size={16} className="text-gray-600" />
            </button>
            <button
              onClick={() => setHumidity(Math.max(0, humidity - 1))}
              className="w-8 h-8 bg-white hover:bg-gray-100 rounded-lg flex items-center justify-center"
            >
              <Minus size={16} className="text-gray-600" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
