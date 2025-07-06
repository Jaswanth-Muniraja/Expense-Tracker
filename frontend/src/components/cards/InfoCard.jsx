import React from 'react'
const InfoCard = ({ icon, label, color, value }) => {
  return (
    <div className='w-full h-20 bg-white rounded-lg shadow-sm border border-gray-200 flex items-center px-2 py-3'>
      <div className={`w-12 h-12 rounded-full ${color} flex items-center justify-center mr-3`}>
        {icon}
      </div>
      <div className='flex flex-col'>
        <h6 className='text-xs font-bold text-gray-500'>{label}</h6>
        <span className='text-lg font-semibold text-gray-800'>₹ {value}</span>
      </div>
    </div>
  )
}

export default InfoCard