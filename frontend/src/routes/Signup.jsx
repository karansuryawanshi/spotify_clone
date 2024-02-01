import React, { useState } from 'react'
import { Icon } from '@iconify/react';
import TextInput from '../component/shared/TextInput';
import PasswordInput from '../component/shared/PasswordInput';
import {makeUnauthenticatePOSTRequest} from "../utiles/server"
import {useCookies} from "react-cookie" 
import {useNavigate} from "react-router-dom"

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [firstname,setFirstname] = useState("")
  const [lastname,setLastname] = useState("")
  const [cookies, setCookie] = useCookies(["token"])
  const navigate = useNavigate();

  const navigated =()=>{
    navigate("/login")
  } 

  const signUp = async () => {
    if(email !== confirmEmail){
      alert("Email is not confirm.")
      return;
    }
    const data = {email, password, username, firstname, lastname};
    const response = await makeUnauthenticatePOSTRequest( "/auth/register", data);
    if(response && !response.err){
      // response.err is the key send from backend when the error occur
      console.log(response) 
      const token = response.token;
      console.log(token)
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
    <div className='w-full h-full flex flex-col items-center bg-aliceblue   '>
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
              className="my-6"
              value={email}
              setValue={setEmail}
              />

            <TextInput 
              label="Confirm your Email" 
              placeholder="Enter your Email again"
              className="mb-6"
              value={confirmEmail}
              setValue={setConfirmEmail}
              />

            <TextInput 
              label="Username" 
              placeholder="Enter your Username"
              className="mb-6"
              value={username}
              setValue={setUsername}
              />

            <PasswordInput 
              label="Create a password" 
              placeholder="Create a password"
              className="my-6"
              value={password}
              setValue={setPassword}
              />

            <div className='flex w-full items-center justify-between space-x-8'>
            <TextInput 
              label="First Name" 
              placeholder="Enter your First Name"
              className="my-6"
              value={firstname}
              setValue={setFirstname}
              />

            <TextInput 
              label="Last Name" 
              placeholder="Enter your Last Name"
              className="my-6"
              value={lastname}
              setValue={setLastname}
              />

            </div>


            <div className='w-full flex item-center justify-center my-8'>
              <button className='bg-green-400 font-semibold p-3 px-10 rounded-full' onClick={(e)=>{
                e.preventDefault() // preventDefault is use when the button has any default action this should be use for prevention
                signUp()
              }}>
                SIGN UP
              </button>
            </div>
            <div className='w-full border border-solid border-gray-300'></div>
            <div className='my-6 font-semibold text-lg'>
              Have an account?
            </div>
            <div className='border border-gray-500 text-gray-500 w-full flex items-center justify-center py-4 rounded-full font-semibold cursor-pointer' onClick={navigated}>
              LOG IN FOR SPOTIFY
            </div>
        </div>
    </div>
  )
}

export default SignUp
