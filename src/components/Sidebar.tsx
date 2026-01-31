'use client';

import React from 'react';
import { Home, Monitor, BarChart3, FileText, Settings, HelpCircle, ChevronRight } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
}

const menuItems = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'monitor', label: 'Monitor', icon: Monitor },
  { id: 'analysis', label: 'Analysis', icon: BarChart3 },
  { id: 'record', label: 'Record', icon: FileText },
];

export default function Sidebar({ activeItem, onItemClick }: SidebarProps) {
  return (
    <div className="w-[180px] sm:w-[200px] lg:w-[220px] xl:w-[240px] h-screen lg:h-[calc(100vh-2rem)] xl:h-[calc(100vh-2.5rem)] bg-[#00b4b4] lg:rounded-2xl xl:rounded-3xl rounded-none p-3 sm:p-4 lg:p-5 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2 px-1 sm:px-2">
        <div className="w-9 h-9 sm:w-10 sm:h-10 lg:w-11 lg:h-11 bg-white/20 rounded-xl sm:rounded-2xl flex items-center justify-center">
          <span className="text-white font-bold text-base sm:text-lg lg:text-xl">⊗</span>
        </div>
      </div>
      
      <div className="text-[10px] sm:text-[11px] font-medium tracking-wider text-white/60 uppercase px-1 sm:px-2 mb-4 sm:mb-5 lg:mb-6">Dashboard</div>
      
      {/* Menu Items */}
      <nav className="flex-1 space-y-0.5 sm:space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`sidebar-item w-full mb-0.5 sm:mb-1 ${
                isActive 
                  ? 'bg-white text-[#00b4b4] shadow-sm' 
                  : 'text-white/85 hover:bg-white/15 hover:text-white'
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={18} className="sm:w-5 sm:h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span className="flex-1 font-medium text-[13px] sm:text-[14px] lg:text-[15px] text-left">{item.label}</span>
              <ChevronRight 
                size={14} 
                className={`sm:w-4 sm:h-4 transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
              />
            </button>
          );
        })}
      </nav>
      
      {/* Bottom Icons */}
      <div className="flex gap-1 sm:gap-2 justify-center pt-3 sm:pt-4 border-t border-white/20">
        <button 
          className="p-2 sm:p-3 hover:bg-white/15 rounded-lg sm:rounded-xl transition-all duration-200 active:scale-95"
          aria-label="Settings"
        >
          <Settings size={18} className="sm:w-5 sm:h-5 text-white/70" />
        </button>
        <button 
          className="p-2 sm:p-3 hover:bg-white/15 rounded-lg sm:rounded-xl transition-all duration-200 active:scale-95"
          aria-label="Help"
        >
          <HelpCircle size={18} className="sm:w-5 sm:h-5 text-white/70" />
        </button>
      </div>
    </div>
  );
}
