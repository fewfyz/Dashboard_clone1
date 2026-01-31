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
    <div className="w-[220px] h-screen lg:h-full glass-card lg:rounded-3xl rounded-none p-5 flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-2 px-2">
        <div className="w-11 h-11 bg-gradient-to-br from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <span className="text-white font-bold text-xl">⊗</span>
        </div>
      </div>
      
      <div className="text-[11px] font-medium tracking-wider text-gray-400 uppercase px-2 mb-6">Dashboard</div>
      
      {/* Menu Items */}
      <nav className="flex-1 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`sidebar-item w-full mb-1 ${isActive ? 'sidebar-item-active' : 'text-gray-600'}`}
              style={{ animationDelay: `${index * 50}ms` }}
              aria-current={isActive ? 'page' : undefined}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="flex-1 font-medium text-[15px] text-left">{item.label}</span>
              <ChevronRight 
                size={16} 
                className={`transition-opacity duration-200 ${isActive ? 'opacity-100' : 'opacity-0'}`} 
              />
            </button>
          );
        })}
      </nav>
      
      {/* Bottom Icons */}
      <div className="flex gap-2 justify-center pt-4 border-t border-gray-200/50">
        <button 
          className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
          aria-label="Settings"
        >
          <Settings size={20} className="text-gray-500" />
        </button>
        <button 
          className="p-3 hover:bg-gray-100 rounded-xl transition-all duration-200 active:scale-95"
          aria-label="Help"
        >
          <HelpCircle size={20} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
