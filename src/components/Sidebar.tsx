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
    <div className="w-[200px] h-full bg-[#f0fafa] rounded-3xl p-4 flex flex-col shadow-lg">
      {/* Logo */}
      <div className="flex items-center gap-2 mb-2 px-2">
        <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center">
          <span className="text-white font-bold text-lg">⊗</span>
        </div>
      </div>
      
      <div className="text-xs text-gray-400 px-2 mb-6">DASHBOARD</div>
      
      {/* Menu Items */}
      <nav className="flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <div
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`sidebar-item mb-2 ${isActive ? 'sidebar-item-active' : 'text-gray-600'}`}
            >
              <Icon size={20} />
              <span className="flex-1 font-medium">{item.label}</span>
              <ChevronRight size={16} className={isActive ? 'opacity-100' : 'opacity-0'} />
            </div>
          );
        })}
      </nav>
      
      {/* Bottom Icons */}
      <div className="flex gap-4 justify-center pt-4 border-t border-gray-200">
        <button className="p-2 hover:bg-teal-100 rounded-lg transition-colors">
          <Settings size={20} className="text-gray-500" />
        </button>
        <button className="p-2 hover:bg-teal-100 rounded-lg transition-colors">
          <HelpCircle size={20} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}
