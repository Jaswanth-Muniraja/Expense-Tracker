import React, { useState } from 'react'
import {FaRegEye, FaRegEyeSlash} from 'react-icons/fa6'

const Input = ({value, onChange, label, placeholder, type}) => {
  const[showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () =>{
    setShowPassword(!showPassword);
  }
  return (
    <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>
  <div className='input-box'>
    <input 
      type={type === 'password' ? (showPassword ? 'text' : 'password') : type} 
      placeholder={placeholder}
      value={value}
      className='w-full bg-transparent outline-none text-gray-800 placeholder-gray-400'
      onChange={onChange}
    />
    {type === "password" && ( 
      showPassword ? (
        <FaRegEye 
          size={20} 
          className='text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer' 
          onClick={toggleShowPassword} 
        />
      ) : (
        <FaRegEyeSlash 
          size={20} 
          className='text-gray-500 hover:text-indigo-600 transition-colors cursor-pointer' 
          onClick={toggleShowPassword} 
        />
      )
    )}
  </div>
</div>
  )
}

export default Input