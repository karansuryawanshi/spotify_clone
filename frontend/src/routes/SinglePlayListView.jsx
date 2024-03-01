import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import LoggedInContainer from '../container/LoggedInContainer';
import { makeAuthenticatedGETRequest} from '../utiles/server';
import SingleSongComponent from '../component/shared/SingleSongComponent';

const SinglePlayListView = () => {
    const {playlistId} = useParams();
    const [playlistDetails, setPlaylistDetails] = useState({})

    useEffect(()=>{
        const getData = async ()=>{
            const response = await makeAuthenticatedGETRequest("/playlist/get/playlist/"+playlistId)
            setPlaylistDetails(response)
            console.log(response)
        };

        getData();
    },[])
  return (
    <div>
      <LoggedInContainer curActiveScreen={"library"}>
        {playlistDetails._id && (
        <div>
            Hello
            <div className='text-white text-xl pt-8 font-semibold'>
            {playlistDetails.name}
        </div>
            <div>
            {playlistDetails.song.map((item)=> {
                return (
                <SingleSongComponent
                info={item}
                key={JSON.stringify(item)} 
                playSound={() => {}}/>
                )
            })}
            </div>
        </div>
        )}
      </LoggedInContainer>
    </div>
  )
}

export default SinglePlayListView
