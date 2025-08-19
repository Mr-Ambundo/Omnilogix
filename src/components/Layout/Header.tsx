import React from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import ProfileModal from '../Profile/ProfileModal';

const Header: React.FC = () => {
  const { user } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-silver-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h2 className="text-xl font-semibold text-gray-900">Supply Chain Control Center</h2>
        </div>
        
        <div className="flex items-center space-x-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-silver-400" size={16} />
            <input
              type="text"
              placeholder="Search orders, suppliers..."
              className="pl-10 pr-4 py-2 border border-silver-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none w-64"
            />
          </div>
          
          <button className="relative p-2 text-silver-500 hover:text-primary-600 transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              3
            </span>
          </button>
          
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setIsProfileOpen(true)}>
            <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center">
              <User size={16} className="text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{user?.name || 'User'}</p>
              <p className="text-xs text-silver-500 capitalize">{user?.role || 'User'}</p>
            </div>
          </div>
        </div>
      </div>
      </header>
      
      <ProfileModal 
        isOpen={isProfileOpen} 
        onClose={() => setIsProfileOpen(false)} 
      />
    </>
  );
};

export default Header;