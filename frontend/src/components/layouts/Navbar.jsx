import React, {useState} from 'react'
import {HiOutlineMenu, HiOutlineX} from 'react-icons/hi'
import SideMenu from './SideMenu';

const Navbar = ({activeMenu}) => {
  const [openSideMenu, setOpenSideMenu] = useState(false);
  
  return (
    <div className='fixed top-0 left-0 right-0 bg-white shadow-sm z-50 h-16'>
      <div className='flex items-center h-full px-4'>
        <button 
          className='p-2 hover:bg-gray-100 rounded-md'
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className='w-6 h-6 text-gray-700' />
          ) : (
            <HiOutlineMenu className='w-6 h-6 text-gray-700' />
          )}
        </button>
        <h2 className='text-xl font-bold text-gray-800 ml-4'>Expense Tracker</h2>
      </div>
      
      {openSideMenu && (
        <div className='fixed inset-0 z-40 mt-16'>
          <div className='bg-white h-full w-64 shadow-lg'>
            <SideMenu activeMenu={activeMenu}/>
          </div>
        </div>
      )}
    </div>
  )
}

export default Navbar