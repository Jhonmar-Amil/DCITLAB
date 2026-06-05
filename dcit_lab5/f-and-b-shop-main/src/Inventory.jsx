import React, { useState } from 'react';

function Inventory({ inventoryItems, setInventoryItems, hasCriticalAlert }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [itemName, setItemName] = useState('');
  const [category, setCategory] = useState('');
  const [currentStock, setCurrentStock] = useState('0');
  const [unit, setUnit] = useState('');
  const [reorderLevel, setReorderLevel] = useState('0');
  const [supplier, setSupplier] = useState('');
  const [itemStatus, setItemStatus] = useState('Good');

  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const handleRestockItem = (id, currentName) => {
    const updatedList = inventoryItems.map(item => {
      if (item.id === id) {
        const itemUnit = item.stocks.includes('Heads') ? 'Heads' : 'Kg';
        const newStockValue = itemUnit === 'Heads' ? '50 Heads' : '80 Kg';
        
        return { 
          ...item, 
          stocks: newStockValue, 
          status: 'Good',
          date: 'Restocked Just Now' 
        };
      }
      return item;
    });
    
    setInventoryItems(updatedList);
    setToastMessage(`Item "${currentName}" has been restocked successfully!`);
    setIsToastOpen(true);
  };

  const handleDeleteItem = (id, currentName) => {
    const updatedList = inventoryItems.filter(item => item.id !== id);
    
    setInventoryItems(updatedList);
    setToastMessage(`Item "${currentName}" deleted successfully!`);
    setIsToastOpen(true);
  };

  const handleSaveItem = (e) => {
    e.preventDefault();

    const formattedStocks = `${currentStock} ${unit || 'Pcs'}`;
    const formattedCritical = `${reorderLevel} ${unit || 'Pcs'}`;

    const newItem = {
      id: Date.now(), 
      name: itemName,
      category: category || 'Beverages',
      stocks: formattedStocks,
      critical: formattedCritical,
      status: itemStatus,
      supplier: supplier || 'General Supplier',
      date: 'Just Now'
    };

    setInventoryItems([...inventoryItems, newItem]);

    setItemName('');
    setCategory('');
    setCurrentStock('0');
    setUnit('');
    setReorderLevel('0');
    setSupplier('');
    setItemStatus('Good');
    setIsModalOpen(false);

    setToastMessage(`Item "${newItem.name}" added successfully!`);
    setIsToastOpen(true);
  };

  return (
    <div className="space-y-6 text-left animate-fade-in relative min-h-[calc(100vh-8rem)] pb-20">
      
      {hasCriticalAlert ? (
        <div className="bg-white border-2 border-gray-400 p-4 rounded flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-8">
            <div>
              <h4 className="text-sm font-black uppercase tracking-tight text-red-600">Low stock warning</h4>
              <p className="text-xs text-gray-500 font-bold">1 item running low</p>
            </div>
            <button onClick={() => alert('Viewing critical fields...')} className="border-2 border-gray-800 font-black text-xs px-4 py-1 rounded hover:bg-gray-50">
              VIEW &gt;
            </button>
            <span className="text-xs font-bold text-gray-700 italic">
              <span className="underline font-black">Coffee beans</span> stock is on a critical level.
            </span>
          </div>

          <button 
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-gray-800 bg-white font-black text-xs px-4 py-2 rounded shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-gray-50 active:scale-95 transition-all"
          >
            + Add Item
          </button>
        </div>
      ) : (
        <div className="bg-green-50 border-2 border-green-500 p-4 rounded flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-3 text-green-800 font-bold text-xs">
            <span>✅</span>
            <span>All inventory categories running at optimal capacity. No warnings detected.</span>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="border-2 border-green-700 bg-white font-black text-xs px-4 py-2 rounded shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] hover:bg-gray-50 active:scale-95 transition-all text-green-700"
          >
            + Add Item
          </button>
        </div>
      )}

      <div className="bg-white border-2 border-gray-400 rounded p-4 shadow-sm">
        <div className="flex items-center justify-between pb-4 border-b border-gray-200 mb-4">
          <h3 className="text-sm font-black uppercase tracking-wider text-gray-700">All Inventory items</h3>
          
          <div className="flex gap-2">
            <input type="text" placeholder="Search items..." className="p-1.5 border-2 border-gray-400 rounded text-xs font-bold w-48 bg-white" />
            
            <select className="p-1.5 border-2 border-gray-400 rounded text-xs font-bold bg-white text-gray-700">
              <option value="">Categories</option>
              <option value="beverages">Beverages</option>
              <option value="dairy">Dairy</option>
              <option value="food">Food</option>
              <option value="meat">Meat</option>
              <option value="vegetables">Vegetables</option>
            </select>

            <select className="p-1.5 border-2 border-gray-400 rounded text-xs font-bold bg-white text-gray-700">
              <option value="">Status</option>
              <option value="good">Good</option>
              <option value="low">Low</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-bold border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-400 bg-gray-50 text-gray-700 uppercase tracking-wider">
                <th className="p-3 border border-gray-300">Items</th>
                <th className="p-3 border border-gray-300">Category</th>
                <th className="p-3 border border-gray-300">Stocks</th>
                <th className="p-3 border border-gray-300">Critical Lvl.</th>
                <th className="p-3 border border-gray-300">Status</th>
                <th className="p-3 border border-gray-300">Supplier</th>
                <th className="p-3 border border-gray-300">Last Restocked</th>
                <th className="p-3 border border-gray-300 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inventoryItems.length === 0 ? (
                <tr>
                  <td colSpan="8" className="p-8 text-center text-gray-400 italic font-medium bg-gray-50 border border-gray-200">
                    📭 No items found in inventory list.
                  </td>
                </tr>
              ) : (
                inventoryItems.map((item) => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50 text-gray-900">
                    <td className="p-3 border border-gray-200 font-black">{item.name}</td>
                    <td className="p-3 border border-gray-200">{item.category}</td>
                    <td className="p-3 border border-gray-200">{item.stocks}</td>
                    <td className="p-3 border border-gray-200">{item.critical}</td>
                    <td className="p-3 border border-gray-200">
                      <span className={`px-2 py-0.5 rounded-full font-black text-[10px] ${
                        item.status === 'Critical' 
                          ? 'bg-red-100 text-red-800' 
                          : item.status === 'Low' 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-3 border border-gray-200">{item.supplier}</td>
                    <td className="p-3 border border-gray-200 text-gray-500">{item.date}</td>
                    <td className="p-3 border border-gray-200 text-center">
                      <div className="flex items-center justify-center gap-3 text-sm">
                        <button onClick={() => handleRestockItem(item.id, item.name)} className="hover:scale-125 transition-transform">📝</button>
                        <button 
                          onClick={() => handleDeleteItem(item.id, item.name)} 
                          className="hover:scale-125 transition-transform text-gray-600 hover:text-red-600"
                          title="Delete Item"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
              {[...Array(2)].map((_, i) => (
                <tr key={i} className="h-10 border-b border-gray-200">
                  {[...Array(8)].map((_, j) => <td key={j} className="p-3 border border-gray-200"></td>)}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-gray-300 rounded-2xl w-full max-w-lg p-6 shadow-2xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-lg font-bold">✕</button>
            <div className="mb-6">
              <h3 className="text-lg font-black text-gray-900 tracking-tight">Add New Inventory Item</h3>
              <p className="text-xs text-gray-400 font-bold mt-0.5">Add a new item to your inventory</p>
            </div>
            <form onSubmit={handleSaveItem} className="space-y-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-gray-700">Item Name</label>
                <input required type="text" placeholder="Enter item name" value={itemName} onChange={(e) => setItemName(e.target.value)} className="w-full p-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-800 text-sm font-bold" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-gray-700">Category</label>
                <select required value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-800 text-sm font-bold text-gray-500 bg-white">
                  <option value="">Select category</option>
                  <option value="Beverages">Beverages</option>
                  <option value="Dairy">Dairy</option>
                  <option value="Food">Food</option>
                  <option value="Meat">Meat</option>
                  <option value="Vegetables">Vegetables</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-black text-gray-700">Current Stock</label>
                  <input required type="number" min="0" value={currentStock} onChange={(e) => setCurrentStock(e.target.value)} className="w-full p-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-800 text-sm font-bold" />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-xs font-black text-gray-700">Unit</label>
                  <input required type="text" placeholder="kg, liters, pieces" value={unit} onChange={(e) => setUnit(e.target.value)} className="w-full p-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-800 text-sm font-bold" />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-gray-700">Reorder Level</label>
                <input required type="number" min="0" value={reorderLevel} onChange={(e) => setReorderLevel(e.target.value)} className="w-full p-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-800 text-sm font-bold" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-gray-700">Initial Status</label>
                <select value={itemStatus} onChange={(e) => setItemStatus(e.target.value)} className="w-full p-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-800 text-sm font-bold text-gray-500 bg-white">
                  <option value="Good">Good</option>
                  <option value="Low">Low</option>
                  <option value="Critical">Critical</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-xs font-black text-gray-700">Supplier</label>
                <input required type="text" placeholder="Supplier name" value={supplier} onChange={(e) => setSupplier(e.target.value)} className="w-full p-2.5 bg-gray-50 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-gray-800 text-sm font-bold" />
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t border-gray-100">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-5 py-2 border-2 border-transparent hover:bg-gray-100 rounded-xl font-black text-xs uppercase tracking-wider text-gray-700">Cancel</button>
                <button type="submit" className="px-5 py-2 bg-slate-950 text-white rounded-xl font-black text-xs uppercase tracking-wider hover:bg-slate-800 active:scale-95 transition-all shadow-md">Add Item</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isToastOpen && (
        <div className="fixed bottom-6 right-6 bg-slate-900 border-2 border-gray-700 text-white px-5 py-3.5 rounded-xl shadow-[4px_4px_0px_0px_rgba(257,257,257,0.15)] flex items-center justify-between gap-6 z-50 animate-bounce max-w-sm border border-gray-800 select-none">
          <div className="flex items-center gap-2.5 text-xs font-bold uppercase tracking-wide">
            <span>✅</span>
            <span>{toastMessage}</span>
          </div>
          <button 
            onClick={() => setIsToastOpen(false)}
            className="text-gray-400 hover:text-white font-black text-xs px-2 py-1 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
          >
            ✕
          </button>
        </div>
      )}

    </div>
  );
}

export default Inventory;