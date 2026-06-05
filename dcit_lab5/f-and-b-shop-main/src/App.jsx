import React, { useState } from 'react';
import SideBar from './SideBar';
import Header from './Header';
import Dashboard from './Dashboard';
import Inventory from './Inventory';
import MenuItems from './MenuItems';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard');

  const [inventoryItems, setInventoryItems] = useState([
    { id: 1, name: 'Coffee Beans', category: 'Beverages', stocks: '10 Kg', critical: '30 Kg', status: 'Critical', supplier: 'Premium Coffee Co.', date: 'December 1' },
    { id: 2, name: 'Lettuce', category: 'Vegetables', stocks: '30 Heads', critical: '20 Heads', status: 'Good', supplier: 'Farm Fresh', date: 'December 2' },
  ]);

  const hasCriticalAlert = inventoryItems.some(item => item.status === 'Critical' || item.status === 'Low');

  return (
    <div className="w-full min-h-screen bg-[#f3f4f6] flex text-gray-800 font-sans">
      
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col">
        
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

        <div className="p-6 flex-1">
          {activeTab === 'dashboard' && (
            <Dashboard inventoryItems={inventoryItems} hasCriticalAlert={hasCriticalAlert} />
          )}
          
          {activeTab === 'inventory' && (
            <Inventory 
              inventoryItems={inventoryItems} 
              setInventoryItems={setInventoryItems} 
              hasCriticalAlert={hasCriticalAlert}
            />
          )}
          
          {activeTab === 'menuitems' && <MenuItems />}
        </div>

      </div>

    </div>
  );
}

export default App;