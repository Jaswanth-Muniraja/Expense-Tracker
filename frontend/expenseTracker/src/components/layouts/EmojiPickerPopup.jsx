import React, { useState } from 'react';
import { LuImage, LuX } from 'react-icons/lu';
import EmojiPicker from 'emoji-picker-react';

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">
      {/* Trigger */}
      <div
        onClick={() => setIsOpen(true)}
        className="cursor-pointer flex flex-col items-center justify-center text-sm text-purple-600 hover:text-purple-800 transition duration-200"
      >
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center shadow-md mb-1">
          {icon ? (
            <img src={icon} alt="Icon" className="w-6 h-6 object-contain" />
          ) : (
            <LuImage className="text-2xl" />
          )}
        </div>
        <p className="font-medium">{icon ? 'Change Icon' : 'Pick Icon'}</p>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="absolute z-50 top-16 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-xl border border-gray-200 p-4 backdrop-blur-md">
          {/* Close Button */}
          <div className="flex justify-end mb-2">
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-red-500 transition"
              aria-label="Close emoji picker"
            >
              <LuX className="text-xl" />
            </button>
          </div>

          {/* Emoji Picker */}
          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji?.imageUrl || '');
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
