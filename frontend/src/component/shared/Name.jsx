import React, { useState } from 'react'
import { makeAuthenticatedGETRequest } from '../../utiles/server';
import { useEffect } from 'react';


const Name = () => {

    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")

      useEffect (()=>{
        const getData = async()=>{
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysong"
                );
                console.log(response)
                if(response.data){
                  setFirstname(response.data[0].artist.firstname[0])
                  setLastname(response.data[0].artist.lastname[0])
                }
          };
        getData();
    },[])
  return (
    <div className='uppercase'>
      {firstname} {lastname}
    </div>
  )
}

export default Name
