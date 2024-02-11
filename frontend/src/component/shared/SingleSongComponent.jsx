import React, { useContext } from 'react'
import songContext from '../../context/songContext'

const SingleSongComponent = ({info,playSound}) => {

  const {currentSong, setCurrentSong} = useContext(songContext);

  return (
    <div className='p-2 flex hover:bg-gray-400 hover:bg-opacity-30 rounded-sm' 
      onClick={()=>{setCurrentSong(info)}}>

      <div className='w-12 h-12 bg-cover bg-center'
        style={{
            backgroundImage:`url("${info.thumbnail}")`
        }}
      >
      </div>
      <div className='flex w-full'>
        <div className='pl-4 text-white flex justify-center flex-col w-5/6'>
            <div className='justify-start cursor-pointer hover:underline'>{info.name}</div>
            <div className='text-gray-400 text-xs cursor-pointer hover:underline'>
              {info.artist.firstname+ " " + info.artist.lastname}
            </div>
        </div>
        <div className='flex justify-center items-center w-1/6'>
            <div className='text-gray-400 text-sm'>9:45</div>
        </div>
        </div>
      </div>
  )
}

export default SingleSongComponent
