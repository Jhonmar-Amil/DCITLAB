import React from 'react';

function MenuItems() {
  const menuList = [
    { id: 1, name: 'Espresso Blend', type: 'Drinks', price: '₱120.00', status: 'Available' },
    { id: 2, name: 'Creamy Latte', type: 'Drinks', price: '₱140.00', status: 'Available' },
    { id: 3, name: 'Classic Burger', type: 'Food', price: '₱160.00', status: 'Out of Stock' },
    { id: 4, name: 'Fries Bucket', type: 'Snacks', price: '₱90.00', status: 'Available' },
  ];

  return (
    <div className="space-y-6 text-left animate-fade-in">
      <div>
        <h2 className="text-xl font-black text-gray-900 uppercase tracking-wide">Menu Items UI</h2>
        <p className="text-xs text-gray-500 font-bold">List of available café menu dishes and drink pricing.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {menuList.map((item) => (
          <div key={item.id} className="bg-white border-2 border-gray-400 p-4 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-[10px] uppercase font-black tracking-wider text-gray-400">{item.type}</span>
                <span className={`text-[9px] font-black uppercase px-1.5 py-0.5 rounded ${
                  item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {item.status}
                </span>
              </div>
              <h3 className="text-sm font-black text-gray-900">{item.name}</h3>
            </div>
            
            <div className="flex justify-between items-center mt-6 pt-2 border-t border-gray-100">
              <span className="text-xs font-black text-slate-900">{item.price}</span>
              <div className="flex gap-2 text-xs">
                <button onClick={() => alert(`Edit ${item.name}`)}>📝</button>
                <button onClick={() => alert(`Archive ${item.name}`)}>🗑️</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuItems;