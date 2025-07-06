import React from 'react'
import { getInitials } from '../../utils/helper'

const CharAvatar = ({fullName, width, height, style}) => {
  return <div className={`${width || 'w-17'} ${height || 'h-17'} ${style || ''} flex items-center justify-center rounded-full text-gray-900 font-medium bg-gray-100`}>
    {getInitials(fullName || "")}</div>
}

export default CharAvatar