import React, { useState } from 'react';
import chowImage from './chow.jpg'; 

function Header({ searchQuery, setSearchQuery }) {
  const [hasNotification, setHasNotification] = useState(true);

  const handleNotifClick = () => {
    alert('Notification: Low stock warning cleared!');
    setHasNotification(false); 
  };

  return (
    <div className="h-16 bg-white border-b-2 border-gray-300 flex items-center justify-between px-6 sticky top-0 z-10 select-none">
      
      <button 
        onClick={() => alert('Back clicked!')} 
        className="border-2 border-gray-800 bg-white font-black text-xs px-4 py-1.5 rounded uppercase tracking-wider shadow-sm hover:bg-gray-50 active:scale-95 transition-all"
      >
        &lt; BACK
      </button>
      
      <div className="w-96 max-w-xs md:max-w-md">
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 border-2 border-gray-400 rounded focus:outline-none focus:border-gray-800 text-sm font-bold bg-white"
        />
      </div>

      <div className="flex items-center gap-4">
        
        <div 
          onClick={handleNotifClick}
          className="relative font-bold text-lg cursor-pointer hover:scale-110 transition-transform p-1"
        >
          🔔
          {hasNotification && (
            <span className="absolute top-0 right-0 bg-gray-900 text-white text-[9px] rounded-full w-4 h-4 flex items-center justify-center font-black border border-white">
              1
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <img 
            src={chowImage} 
            alt="Owner Avatar" 
            className="w-8 h-8 rounded-full border-2 border-gray-800 object-cover bg-gray-200"
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src = "https://via.placeholder.com/150";
            }}
          />
          <span className="text-xs font-black uppercase tracking-wider text-gray-900">
            Owner
          </span>
        </div>
      </div>

    </div>
  );
}

export default Header;