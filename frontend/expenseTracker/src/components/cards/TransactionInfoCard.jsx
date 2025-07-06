import React from 'react';
import { LuTrendingUp, LuTrendingDown } from 'react-icons/lu';
import { FaTrash } from 'react-icons/fa';

const TransactionInfoCard = ({ 
  title, 
  icon,  
  date, 
  amount, 
  type, 
  hideDeleteBtn = false,
  onDelete 
}) => {
  
  const renderIcon = () => {
    if (!icon) {
      return type === 'income' ? 
        <LuTrendingUp className='w-5 h-5' /> : 
        <LuTrendingDown className='w-5 h-5' />;
    }

    if (icon.includes('http')) {
      return (
        <img 
          src={icon} 
          alt={title} 
          className="w-5 h-5 object-contain" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'fallback-icon.png';
          }}
        />
      );
    }
    return <span className="text-2xl">{icon}</span>;
  };

  return (
    <div className='group flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border border-gray-200 mb-3 last:mb-0 hover:bg-gray-50 transition-colors relative'>
      <div className='flex items-center flex-1 min-w-0'>
        <div className={`p-3 rounded-lg mr-4 ${
          type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        }`}>
          {renderIcon()}
        </div>

        <div className='flex-1 min-w-0'>
          <h3 className='text-md font-medium text-gray-800 truncate'>{title}</h3>
          <p className='text-sm text-gray-500'>{date}</p>
        </div>
      </div>

        {!hideDeleteBtn && (
          <button 
            onClick={onDelete}
            className='ml-4 p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100'
            aria-label='Delete transaction'
          >
            <FaTrash className='w-4 h-4' />
          </button>
        )}
      <div className='flex items-center ml-4'>
        <div className={`px-3 py-1 rounded-md ${
          type === 'income' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          <div className='flex items-center'>
            <span className='font-semibold'>
              {type === 'income' ? '+' : '-'} ₹{amount}
            </span>
            {type === 'income' ? (
              <LuTrendingUp className='ml-1 w-4 h-4' />
            ) : (
              <LuTrendingDown className='ml-1 w-4 h-4' />
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default TransactionInfoCard;