import React from 'react'
import { Icon } from '@iconify/react'

const NavbarText = ({displayText}) => {
  return (
    <div className='flex items-center justify-start cursor-pointer'>
      {/* <div className='px-5 py-2'>
        <Icon 
            icon={iconName} 
            color={active?"white":"gray"} 
            fontSize={20}/>
      </div> */}
      <div className={`text-gray-400 text-sm font-semibold hover:text-white`}>
        {displayText}
      </div>
    </div>
  )
}

export default NavbarText
