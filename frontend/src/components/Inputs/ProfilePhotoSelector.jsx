import React, { useRef, useState } from 'react'
import {LuUser, LuUpload, LuTrash} from "react-icons/lu"
import { HiUser } from "react-icons/hi2"

const ProfilePhotoSelector = ({image, setImage}) => {
    const inputRef = useRef(null)
    const [previewUrl, setPreviewUrl] = useState(null)
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if(file){
            setImage(file)
            const preview  = URL.createObjectURL(file);
            setPreviewUrl(preview);
        }
    }
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
    }
    const onChooseFile  = () => {
        inputRef.current.click();
    }

  return (
    <div className="relative group">
      <input 
        type="file"
        accept='image/*'
        ref={inputRef}
        onChange={handleImageChange}
        className='hidden'
      />
      
      {!image ? (
        <div 
          className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer transition-all duration-300 hover:border-indigo-400 hover:bg-indigo-50"
          onClick={onChooseFile}
        >
          <div className="text-center">
            <HiUser className="text-gray-400 text-3xl mx-auto mb-1" />
            <div className="flex justify-center">
              <LuUpload className="text-indigo-500 text-lg" />
            </div>
          </div>
        </div>
      ) : (
        <div className="relative">
          <img 
            src={previewUrl} 
            alt="profile" 
            className="w-24 h-24 rounded-full object-cover border-2 border-white shadow-md" 
          />
          <button 
            type='button' 
            className="absolute -top-1 -right-1 bg-white rounded-full p-1.5 shadow-md text-red-500 hover:bg-red-50 transition-colors"
            onClick={handleRemoveImage}
          >
            <LuTrash className="text-sm" />
          </button>
        </div>
      )}
    </div>
  )
}

export default ProfilePhotoSelector