import React, { useContext } from 'react';
import Navbar from './Navbar';
import SideMenu from './SideMenu';
import { UserContext } from '../../context/UserContext';

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar activeMenu={activeMenu} />
      <div className="flex pt-16">
        <div className="hidden lg:block">
          <SideMenu activeMenu={activeMenu} />
        </div>
        <main className="flex-1 p-4 lg:p-6 overflow-auto">
          {user ? (
            children
          ) : (
            <p className="text-gray-400 text-sm">Loading user or not logged in...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
