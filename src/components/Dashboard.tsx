import React from 'react';

export default function RecordPage() {
  return (
    <div className="flex min-h-screen bg-[#e0f7fa]">
      {/* Sidebar */}
      <aside className="w-64 bg-white/60 rounded-r-3xl p-6 flex flex-col gap-6 shadow-lg">
        <div className="mb-8 flex items-center gap-2">
          <div className="w-8 h-8 bg-[#00b4b4] rounded-full flex items-center justify-center text-white font-bold">⦿</div>
          <span className="font-bold text-[#008080] text-lg">DASHBOARD</span>
        </div>
        <nav className="flex flex-col gap-3">
          <button className="sidebar-btn">Home</button>
          <button className="sidebar-btn">Monitor</button>
          <button className="sidebar-btn">Analysis</button>
          <button className="sidebar-btn active">Record</button>
        </nav>
        <div className="mt-auto flex gap-2">
          <button className="w-8 h-8 bg-[#e0f7fa] rounded-full flex items-center justify-center">⚙️</button>
          <button className="w-8 h-8 bg-[#e0f7fa] rounded-full flex items-center justify-center">❓</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Top Bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex gap-2">
            {["NO.1", "NO.2", "NO.3", "NO.4", "NO.5", "NO.6"].map((tab, idx) => (
              <button
                key={tab}
                className={`px-6 py-2 rounded-xl font-semibold shadow ${idx === 1 ? 'bg-[#00b4b4] text-white' : 'bg-white/80 text-[#008080]'}`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-6">
            <span className="font-bold text-lg">08:53 PM</span>
            <span className="text-gray-600">2022 / 05 / 26</span>
            <button className="w-8 h-8 bg-[#e0f7fa] rounded-full flex items-center justify-center text-xl">+</button>
            <div className="w-8 h-8 bg-[#e0f7fa] rounded-full"></div>
          </div>
        </div>

        {/* Main Record Content */}
        <div className="bg-white rounded-2xl shadow p-8 flex flex-col gap-8">
          <h2 className="text-2xl font-bold text-[#00b4b4] mb-4">Records</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#e0f7fa]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">1</td>
                  <td className="px-6 py-4 whitespace-nowrap">NO.1</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="bg-[#f97316] text-white px-3 py-1 rounded-full font-semibold">OPEN</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">2022/05/26</td>
                  <td className="px-6 py-4 whitespace-nowrap"><button className="text-[#00b4b4] font-bold">View</button></td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap">2</td>
                  <td className="px-6 py-4 whitespace-nowrap">NO.2</td>
                  <td className="px-6 py-4 whitespace-nowrap"><span className="bg-[#00b4b4] text-white px-3 py-1 rounded-full font-semibold">NORMAL</span></td>
                  <td className="px-6 py-4 whitespace-nowrap">2022/05/26</td>
                  <td className="px-6 py-4 whitespace-nowrap"><button className="text-[#00b4b4] font-bold">View</button></td>
                </tr>
                {/* Add more records as needed */}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
