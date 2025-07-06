import React from 'react'
import { SIDE_MENU_DATA } from '../../utils/data'
import { useContext } from 'react'
import { UserContext } from '../../context/userContext'
import { useNavigate } from "react-router-dom";
import CharAvatar from '../cards/CharAvatar';

const SideMenu = ({activeMenu}) => {
  const {user, clearUser} = useContext(UserContext);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if(route === "logout"){
      handleLogout();
      return;
    }
    navigate(route);
  }

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate("/login");
  }

  return (
     <div className='w-64 h-[calc(100vh-64px)] bg-gray-50 border-r border-gray-200'>
      {/* User Profile Section - Centered */}
      <div className='p-4 border-b border-gray-200 flex flex-col items-center'>
        {user?.profileImageUrl ? (
          <img 
            src={user.profileImageUrl} 
            alt="Profile" 
            className='w-16 h-16 rounded-full object-cover mb-3'
          />
        ) : (
          <CharAvatar 
            fullName={user?.fullName} 
            width="w-16" 
            height="h-16" 
            style="mb-3 text-xl"
          />
        )}
        <h5 className='text-lg font-medium text-gray-800'>
          {user?.fullName || "Welcome"}
        </h5>
      </div>

      {/* Menu Items */}
      <div className='p-3 space-y-1'>
        {SIDE_MENU_DATA.map((item, index) => (
          <button 
            key={`menu_${index}`}
            className={`w-full flex items-center gap-3 text-base 
              ${activeMenu === item.label 
                ? "bg-blue-600 text-white" 
                : "text-gray-700 hover:bg-gray-100"}
              py-3 px-4 rounded-lg`}
            onClick={() => handleClick(item.path)}
          >
            <item.icon className={`text-lg ${activeMenu === item.label ? "text-white" : "text-gray-500"}`} />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

export default SideMenu