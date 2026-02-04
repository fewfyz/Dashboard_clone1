'use client';

import React, { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Header from '@/components/Header';

interface RecordPageProps {
  onNavigate: (page: string) => void;
}

export default function RecordPage({ onNavigate }: RecordPageProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="h-screen w-full bg-black p-2 sm:p-3 lg:p-4 xl:p-5 flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Menu Button */}
      <button 
        className="lg:hidden fixed top-3 left-3 z-50 bg-white/80 backdrop-blur-xl text-gray-800 p-2.5 sm:p-3 rounded-xl sm:rounded-2xl shadow-lg 
          border border-white/20 transition-all duration-200 active:scale-95"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? 'Close menu' : 'Open menu'}
      >
        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={sidebarOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
        </svg>
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:relative z-40 transition-transform duration-300 ease-out`}>
        <Sidebar 
          activeItem="record" 
          onItemClick={(item) => { 
            onNavigate(item); 
            setSidebarOpen(false); 
          }} 
        />
      </aside>
      
      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-30 lg:hidden animate-fade-in" 
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}
      
      {/* Main Content */}
      <main className="flex-1 lg:ml-3 xl:ml-4 flex flex-col min-h-0 mt-14 sm:mt-16 lg:mt-0">
        {/* Header */}
        <Header />
        
        {/* Record Content */}
        <div className="flex-1 overflow-y-auto px-0.5 sm:px-1 lg:px-2 pb-2 sm:pb-4">
          <div className="glass-card p-4 sm:p-6 lg:p-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">Record Page</h2>
            <p className="text-gray-300 text-lg">This is the Record page with a black background.</p>
            
            {/* Add your record content here */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Record Section 1</h3>
                <p className="text-gray-400">Content for record section 1</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Record Section 2</h3>
                <p className="text-gray-400">Content for record section 2</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Record Section 3</h3>
                <p className="text-gray-400">Content for record section 3</p>
              </div>
              
              <div className="bg-gray-900 p-6 rounded-xl border border-gray-800">
                <h3 className="text-xl font-semibold text-white mb-4">Record Section 4</h3>
                <p className="text-gray-400">Content for record section 4</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
