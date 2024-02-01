import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import TextInput from '../component/shared/TextInput';
import PasswordInput from '../component/shared/PasswordInput';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { makeUnauthenticatePOSTRequest } from '../utiles/server';


const LoginComponent = () => {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [cookie, setCookie] = useCookies(["token"])
  const navigate = useNavigate();

  const navigated =()=>{
    navigate("/signup")
  } 

  const login = async () => {
    const data = {email, password};
    const response = await makeUnauthenticatePOSTRequest( "/auth/login", data);
    if(response && !response.err){
      // response.err is the key send from backend when the error occur
      // console.log(response) 
      const token = response.token;
      // console.log(token)
      const date = new Date();
      date.setDate(date.getDate() + 30)
      setCookie("token", token,{path:"/",expires:date})
      alert("Success")
      navigate("/home")
    }
    else{
      alert("Failure")
    }
    console.log(data)
  }


  return (
    <div className='w-full h-full flex flex-col items-center'>
      <div className='logo p-5 border-b border-solid border-gray-300 w-full flex justify-center'>
        <Icon icon="logos:spotify" width="150" />
      </div>
        <div className='inputregion w-1/3 py-10 flex items-center justify-center flex-col'>
          <div className='font-bold mb-4'>
            To continue, login to Spotify.
          </div>
            <TextInput 
              label="Email Address or Username" 
              placeholder="Email Address or Username"
              className="my-6"
              value={email}
              setValue={setEmail}
              />

            <PasswordInput 
              label="Password" 
              placeholder="Password"
              value={password}
              setValue={setPassword}
              />

            <div className='w-full flex item-center justify-end my-8'>
              <button className='bg-green-400 font-semibold p-3 px-10 rounded-full' 
              onClick={(e)=>{
                e.preventDefault();
                login();
              }}
              >
                LOG IN
              </button>
            </div>
            <div className='w-full border border-solid border-gray-300'></div>
            <div className='my-6 font-semibold text-lg'>
              Don't have an account?
            </div>
            <div className='border border-gray-500 text-gray-500 w-full flex items-center justify-center py-3 rounded-full font-semibold cursor-pointer' onClick={navigated}>
              SIGN UP FOR SPOTIFY
            </div>
        </div>
    </div>
  )
}

export default LoginComponent
