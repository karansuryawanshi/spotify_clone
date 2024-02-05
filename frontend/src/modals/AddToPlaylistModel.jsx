import React from 'react'
import { useState, useEffect } from 'react'
import { makeAuthenticatedGETRequest } from '../utiles/server'

const AddtoPlaylistModel = ({closeModel, AddSongToPlayList}) => {

  const [myPlaylist, setMyPlaylist] = useState([])

  useEffect(()=>{
      const getData = async ()=>{
          const response = await makeAuthenticatedGETRequest("/playlist/get/me")
          setMyPlaylist(response.data)
          console.log("=========",response.data)
      }  
      getData(); 
  },[])

  return (
    <div className='absolute bg-black w-screen h-screen bg-opacity-90 flex justify-center items-center' onClick={closeModel}>
      <div className='bg-gray-300 w-1/3 rounded-md p-4' onClick={(e)=>{e.stopPropagation()}}>
        <div className='text-red flex items-center justify-center text-lg font-semibold'>Add to Playlist</div>
        <div>
        {myPlaylist.map(item=>{
          return(
            <PlayListComponent info={item} AddSongToPlayList={AddSongToPlayList}/>
          )
        })}
        </div>
      </div>
    </div>
  )
};

const PlayListComponent=({info,AddSongToPlayList})=>{
  return(
    <div className='flex hover:bg-gray-500 hover:bg-opacity-50 p-3' onClick={()=>{
      AddSongToPlayList(info._id)
    }}>
      <div className=''>
        <img src={info.thumbnail} alt="" className='w-10 h-10 rounded'/>
      </div>
      <div className='text-black font-semibold text-sm flex items-center justify-center px-5'>{info.name}</div>
      
    </div>
  )
}

export default AddtoPlaylistModel
