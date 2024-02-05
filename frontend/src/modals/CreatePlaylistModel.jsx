import React, { useState } from 'react'
import TextInput from "../component/shared/TextInput"
import {makeAuthenticatedPOSTRequest} from "../utiles/server"

const CreatePlaylistModal = ({closeModel}) => {
    const [playlistName, setPlaylistName] = useState("")
    const [playlistThumbnail, setPlaylistThumbnail] = useState("")

    const createPlaylist= async ()=>{
        const response = await makeAuthenticatedPOSTRequest ("/playlist/create",{name:playlistName,thumbnail:playlistThumbnail,song:[]})
        if(response._id){
            closeModel();
        }
    } 

  return (
    <div className='absolute bg-black w-screen h-screen bg-opacity-90 flex justify-center items-center' onClick={closeModel}>
      <div className='bg-gray-300 w-1/3 rounded-md p-4' onClick={(e)=>{e.stopPropagation()}}>
        <div className='text-red flex items-center justify-center text-lg font-semibold'>Create Playlist</div>
        <div>
            <TextInput 
                label="Name" 
                placeholder="Enter Playlist Name"
                className="mb-6"
                value={playlistName}
                setValue={setPlaylistName}
                />
            <TextInput 
                label="Thumbnail" 
                placeholder="Thumbnail"
                className="mb-6"
                value={playlistThumbnail}
                setValue={setPlaylistThumbnail}
                />
                <div className='bg-white w-1/3 rounded flex items-center m-auto justify-center cursor-pointer font-semibold py-3 mx-auto' onClick={createPlaylist}>
                    Create
                </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePlaylistModal
