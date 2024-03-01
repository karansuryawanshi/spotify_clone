import React, { useEffect, useState } from 'react'
import LoggedInContainer from '../container/LoggedInContainer'
import { makeAuthenticatedGETRequest } from '../utiles/server'
import { useNavigate } from 'react-router-dom'

const Library = () => {
    const [myPlaylist, setMyPlaylist] = useState([])

    useEffect(()=>{
        const getData = async ()=>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/me")
            setMyPlaylist(response.data)
        }  
        getData(); 
    },[])
  return (
    <LoggedInContainer curActiveScreen="library">

        <div className='text-white text-xl pt-8 font-semibold'>My Playlist</div>
        <div className='py-5 grid flex gap-5 grid-cols-5'>
        {myPlaylist.map(item=>{
            return(
            <Card
                title={item.name}
                description=""
                imgUrl={item.thumbnail}
                playlistId={item._id}/>
             )
        })}
            
        </div>
    </LoggedInContainer>
  )
}

const Card = ({ title, description, imgUrl, playlistId}) => {
  const navigate = useNavigate();
    return (
      <div className="bg-black bg-opacity-40 w-full p-3 rounded-lg" onClick={()=>{
        navigate("/playlist/"+playlistId)
      }}>
        <div className="w-full rounded-md">
          <img src={imgUrl} alt="" />
        </div>
        <div className="text-white font-semibold py-3">{title}</div>
        <div className="text-gray-500 text-sm">{description}</div>
      </div>
    );
  };

export default Library
