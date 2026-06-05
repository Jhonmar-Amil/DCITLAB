import React from 'react';

function SideBar({ activeTab, setActiveTab }) {
  return (
    <div className="w-64 bg-white border-r-2 border-gray-300 flex flex-col h-screen sticky top-0 select-none">
      <div className="p-6">
        <h1 className="text-3xl font-black tracking-tighter uppercase border-b-4 border-gray-800 pb-4 mb-6">
          F&B SHOP
        </h1>
        
        <div className="flex flex-col gap-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full text-left p-3 text-sm rounded-lg border-2 transition-all ${
              activeTab === 'dashboard'
                ? 'bg-gray-200 border-gray-800 font-black text-gray-900 shadow-sm'
                : 'border-transparent font-bold text-gray-500 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </button>
          
          <button 
            onClick={() => setActiveTab('inventory')}
            className={`w-full text-left p-3 text-sm rounded-lg border-2 transition-all ${
              activeTab === 'inventory'
                ? 'bg-gray-200 border-gray-800 font-black text-gray-900 shadow-sm'
                : 'border-transparent font-bold text-gray-500 hover:bg-gray-100'
            }`}
          >
            Inventory
          </button>
          
          <button 
            onClick={() => setActiveTab('menuitems')}
            className={`w-full text-left p-3 text-sm rounded-lg border-2 transition-all ${
              activeTab === 'menuitems'
                ? 'bg-gray-200 border-gray-800 font-black text-gray-900 shadow-sm'
                : 'border-transparent font-bold text-gray-500 hover:bg-gray-100'
            }`}
          >
            Menu Items
          </button>
        </div>
      </div>
    </div>
  );
}

export default SideBar;