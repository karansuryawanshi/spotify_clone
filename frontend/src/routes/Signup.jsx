import React from 'react'
import { Icon } from '@iconify/react';
import TextInput from '../component/shared/TextInput';
import PasswordInput from '../component/PasswordInput';

const SignUp = () => {
  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='logo p-5 border-b border-solid border-gray-300 w-full flex justify-center'>
        <Icon icon="logos:spotify" width="150" />
      </div>
        <div className='inputregion w-1/3 py-10 flex items-center justify-center flex-col'>
          <div className='font-bold mb-4 text-2xl'>
            Signup for free to start listerning.
          </div>
            <TextInput 
              label="What's your Email" 
              placeholder="Enter your Email"
              className="my-6"/>

            <TextInput 
              label="Confirm your Email" 
              placeholder="Enter your Email again"
              className="mb-6"
              />

            <PasswordInput 
              label="Create a password" 
              placeholder="Create a password"
              className="my-6"/>

            <TextInput 
              label="What should we call you?" 
              placeholder="Enter your profile name"
              className="my-6"/>


            <div className='w-full flex item-center justify-center my-8'>
              <button className='bg-green-400 font-semibold p-3 px-10 rounded-full'>
                SIGN UP
              </button>
            </div>
            <div className='w-full border border-solid border-gray-300'></div>
            <div className='my-6 font-semibold text-lg'>
              Have an account?
            </div>
            <div className='border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-semibold'>
              LOG IN FOR SPOTIFY
            </div>
        </div>
    </div>
  )
}

export default SignUp
