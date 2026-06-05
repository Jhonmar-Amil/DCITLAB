import React from 'react';

function Dashboard({ inventoryItems, hasCriticalAlert }) {
  const newlyAddedItems = inventoryItems.filter(item => item.date === 'Just Now');
  const restockedItems = inventoryItems.filter(item => item.date === 'Restocked Just Now');
  const isLettuceDeleted = !inventoryItems.some(item => item.name === 'Lettuce');

  return (
    <div className="space-y-6 animate-fade-in text-left">
      <div>
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">F&B Dashboard</h2>
        <p className="text-xs text-gray-500 font-bold">Overview of your shop's current status.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div className="bg-white border-2 border-gray-400 p-5 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Gross Revenue</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">₱7,676.76</h3>
            </div>
            <span className="text-xl">💰</span>
          </div>
          <p className="text-[10px] text-green-600 font-bold mt-4">↑ +15% from yesterday</p>
        </div>

        <div className="bg-white border-2 border-gray-400 p-5 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-wider">Total Items Tracked</p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">{inventoryItems.length} Items</h3>
            </div>
            <span className="text-xl">📦</span>
          </div>
          <p className="text-[10px] text-gray-500 font-bold mt-4">{inventoryItems.length} items active in list</p>
        </div>

        <div className={`p-5 rounded border-2 border-gray-400 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-l-8 transition-colors ${
          hasCriticalAlert ? 'border-l-red-500 bg-white' : 'border-l-green-500 bg-white'
        }`}>
          <div className="flex justify-between items-start">
            <div>
              <p className={`text-[10px] font-black uppercase tracking-wider ${hasCriticalAlert ? 'text-red-500' : 'text-green-600'}`}>
                Critical Alerts
              </p>
              <h3 className="text-2xl font-black text-gray-900 mt-1">
                {hasCriticalAlert ? '1 Alert Pending' : '0 Alerts'}
              </h3>
            </div>
            <span className="text-xl">{hasCriticalAlert ? '⚠️' : '✅'}</span>
          </div>
          <p className={`text-[10px] font-bold mt-4 ${hasCriticalAlert ? 'text-red-500' : 'text-green-600'}`}>
            {hasCriticalAlert ? 'Requires immediate restock' : 'No critical stock has been found!'}
          </p>
        </div>

      </div>

      <div className="bg-white border-2 border-gray-400 rounded p-5 shadow-sm">
        <h3 className="text-sm font-black uppercase tracking-wider text-gray-700 border-b border-gray-200 pb-3 mb-4">
          Recent Shop Updates
        </h3>
        <div className="space-y-3 text-xs font-bold">
          
          {newlyAddedItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-blue-50 p-2.5 rounded border border-blue-300 text-blue-900 animate-pulse">
              <span>🆕 New Item Added: <span className="underline">{item.name}</span> ({item.category}) has been registered with {item.stocks} stock levels.</span>
              <span className="text-blue-500 font-black uppercase tracking-tighter">Just Now</span>
            </div>
          ))}

          {restockedItems.map((item) => (
            <div key={item.id} className="flex justify-between items-center bg-orange-50 p-2.5 rounded border border-orange-300 text-orange-900">
              <span>🔄 Restock Action: <span className="underline">{item.name}</span> has been manually supplied up to {item.stocks}.</span>
              <span className="text-orange-500 font-black uppercase tracking-tighter">Just Now</span>
            </div>
          ))}

          {isLettuceDeleted && (
            <div className="flex justify-between items-center bg-red-50 p-2.5 rounded border border-red-300 text-red-900">
              <span>🗑️ System Notice: Existing item <span className="underline font-black">Lettuce</span> was deleted from records.</span>
              <span className="text-red-500 font-black uppercase tracking-tighter">Just Now</span>
            </div>
          )}

          {!hasCriticalAlert ? (
            <div className="flex justify-between items-center bg-green-50 p-2.5 rounded border border-green-300 text-green-800">
              <span>✅ Restock Updated: No critical or low stock items.</span>
              <span className="text-gray-400">Active</span>
            </div>
          ) : (
            <div className="flex justify-between items-center bg-red-50 p-2.5 rounded border border-red-200 text-red-800">
              <span>☕ Item <span className="underline">Coffee Beans</span> hit critical levels (10 Kg remaining)</span>
              <span className="text-gray-400">10 mins ago</span>
            </div>
          )}

          {!isLettuceDeleted && (
            <div className="flex justify-between items-center bg-gray-50 p-2.5 rounded border border-gray-300">
              <span>📦 Item <span className="underline">Lettuce</span> was restocked by staff.</span>
              <span className="text-gray-400">1 hour ago</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;