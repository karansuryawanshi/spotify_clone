import React from 'react'

const PasswordInput = ({label, placeholder,className}) => {
  return (
    <div className='textInputDiv flex flex-col space-y-2 w-full'>
        <label htmlFor={label} className='font-semibold'>{label}</label>
      <input 
        type="text" 
        placeholder={placeholder} 
        className='p-3 border border-gray-400 border-solid rounded placeholder-gray-500' 
        id={placeholder}/>
    </div>
  )
}

export default PasswordInput
