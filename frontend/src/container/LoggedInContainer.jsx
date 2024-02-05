import React, { Children, useContext, useEffect, useRef, useState } from "react";
import spotify_logo from "../assets/images/Spotify_Logo_CMYK_White.png";
import IconText from "../component/shared/IconText";
import { Icon } from "@iconify/react";
import NavbarText from "../component/shared/NavbarText";
import { useNavigate } from 'react-router-dom';
import {Howl, Howler} from 'howler';
import songContext from "../context/songContext";
import CreatePlaylistModal from "../modals/CreatePlaylistModel";
import AddtoPlaylistModel from "../../src/modals/AddToPlaylistModel"
import { makeAuthenticatedGETRequest, makeAuthenticatedPOSTRequest } from "../utiles/server";
import Name from "../component/shared/Name";

const LoggedInContainer = ({children, curActiveScreen, setLastname}) => {
  const {currentSong, setCurrentSong, soundPlayed, setSoundPlayed, isPaused, setIsPaused} = useContext(songContext)
  const [createPlaylistModalOpen,setCreatePlaylistModalOpen] = useState(false)
  const [playlsitOpenModel,setPlaylsitOpenModel] = useState(false)

  const firstupdate = useRef(true);
  useEffect(()=>{
    if(firstupdate.current){
      firstupdate.current = false;
      return;
    }

    if(!currentSong){
      return;
    }
    changeSong(currentSong.track)
  },[currentSong])

  const playSound =() =>{
    if(!soundPlayed){
      return;
    }
    soundPlayed.play();
  }

  const changeSong = (songSrc)=>{
    if(soundPlayed){
      soundPlayed.stop();
    }

      let sound = new Howl ({
        src:[currentSong.track],
        html5:true,
      }) 
      setSoundPlayed(sound);
      sound.play();
      setIsPaused(false)
      // console.log("Song played")
      // console.log("played successfully")
  }

  const pauseSound =()=>{ 
    if (soundPlayed && soundPlayed.pause) {
        soundPlayed.pause();
    }
    console.log("Song paused")
  }

  const togglePlayPause =()=>{
    if(isPaused){
      playSound();
    }
    else{
      pauseSound()
    }
    setIsPaused(!isPaused); 
  }

  const navigate = useNavigate();
  const navigated =()=>{
    navigate("/login")
  } 
  const navigateUpload =()=>{
    navigate("/upload song")
  }

  const AddSongToPlayList = async (playlistId)=>{
    const songId = currentSong._id
    const payload = {playlistId, songId}
    const response = await makeAuthenticatedPOSTRequest("/playlist/add/song",payload);
    if(response.playlist._id){
      setPlaylsitOpenModel(false)
    }
    
  }

  return (
    <div className="w-screen h-screen flex">
      {createPlaylistModalOpen && <CreatePlaylistModal closeModel={()=>setCreatePlaylistModalOpen(false)}/>}
      {playlsitOpenModel && <AddtoPlaylistModel closeModel={()=>setPlaylsitOpenModel(false)} AddSongToPlayList={AddSongToPlayList}/>}
      <div className="w-full h-full">
        {/* Recently updated ======================== */}
        <div className={`${currentSong?"h-9/10":"h-full"} w-full flex`}>
        {/* Left Pannel */}
        <div className="h-full w-1/5 bg-black flex flex-col justify-between pb-10">
          <div>
            <div className="logoImage  p-6">
              <img src={spotify_logo} width={125} />
            </div>
            <div className="py-6">
              <IconText
                iconName={"majesticons:home"}
                displayText={"Home"}
                targetLink={"/home"}
                active={curActiveScreen === "home"}
              ></IconText>

              <IconText 
                iconName={"ion:search"} 
                displayText={"Search"}
                targetLink={"/search"}
                active={curActiveScreen === "search"}
              ></IconText>

              <IconText
                iconName={"codicon:library"}
                displayText={"Library"}
                targetLink={"/library"}
                active={curActiveScreen === "library"}
              ></IconText>

              <IconText
                iconName={"entypo:music"}
                displayText={"My Music"}
                targetLink={"/mymusic"}
                active={curActiveScreen === "mymusic"}
              ></IconText>

            </div>
            <div className="pt-5">
              <IconText
                iconName={"basil:add-solid"}
                displayText={"Create Playlist"}
                onClick={()=>{setCreatePlaylistModalOpen(true)}}
              ></IconText>

              <IconText
                iconName={"tabler:heart-filled"}
                displayText={"Liked Song"}
              ></IconText>
            </div>
          </div>
          <div className="px-5">
            <div className="border border-gray-400 text-white w-2/5 flex px-2 py-1 rounded-full items-center justify-center hover:border-white cursor-pointer">
              <Icon icon="mynaui:globe"></Icon>
              <div className="ml-2 text-sm font-semibold">English</div>
            </div>
          </div>
        </div>
        {/* Right Pannel */}
         <div className="w-screen h-full w-3/4 bg-appbg overflow-auto">
          <div className="navbar w-full h-1/10 bg-black flex bg-opacity-30 items-center justify-end">
            <div className="w-1/2 flex h-full">
              <div className="w-3/5 flex justify-around items-center">
                <NavbarText displayText={"Premium"} />
                <NavbarText displayText={"Support"} />
                <NavbarText displayText={"Download"} />
                <div className="h-1/2 border-r border-white"></div>
              </div>
              <div className="w-2/5 flex justify-around h-full items-center">
                <div onClick={navigateUpload}>
                  <NavbarText displayText={"Upload Song"} />
                </div>
                <div className="bg-white text-black text-sm font-semibold h-2/3 px-3 flex items-center justify-center rounded-full cursor-pointer" onClick={navigated}>
                <Name></Name>
                </div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0">
          {children}
          </div>
          </div> 
        </div>
        {
          currentSong &&
        <div className=" w-full h-1/10 bg-black flex text-white pl-4">
          <div className="w-1/3 flex items-center">
            <img src={currentSong.thumbnail} 
              alt="currentImage" 
              className="h-10 w-10 rounded-sm"/>
              <div className="pl-4">
                <div className="text-sm cursor-pointer hover:underline">{currentSong.name}</div>
                <div className="text-xs text-gray-500 cursor-pointer hover:underline">{currentSong.artist.firstname}  {currentSong.artist.lastname}</div>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center flex-col">
              <div className="flex w-1/2 justify-between">
              <Icon icon="solar:shuffle-outline" fontSize={27} className="text-gray-400 cursor-pointer hover:text-white" />
              <Icon icon="fluent:previous-32-filled" fontSize={27} className="text-gray-400 cursor-pointer hover:text-white"/>
              
              <Icon icon={isPaused?"zondicons:pause-solid":"zondicons:play-outline"} fontSize={33} className="text-gray-400 cursor-pointer hover:text-white" onClick={togglePlayPause}/>

              <Icon icon="fluent:next-32-filled" fontSize={27} className="text-gray-400 cursor-pointer hover:text-white"/>
              <Icon icon="mdi:repeat" fontSize={27} className="text-gray-400 cursor-pointer hover:text-white"/>
              </div>
            </div>
            <div className="w-1/4 flex justify-end">
              <div className="flex justify-center items-center pr-5 space-x-3">
              <Icon icon="solar:playlist-bold" fontSize={30} className="cursor-pointer" onClick={()=>{setPlaylsitOpenModel(true)}}/>
              <Icon icon="ph:heart" fontSize={30} className="cursor-pointer"/>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

const PlaylistView = ({ titleText, cardData }) => {
  return (
    <div className="text-white mt-8">
      <div className="flex">
        <div className="text-2xl font-semibold mb-5 border-b border-black hover:border-white transition ease-out duration-700">
          {titleText}
        </div>
      </div>
      <div className="w-full flex justify-between space-x-4">
        {cardData.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              imgUrl={item.imgUrl}
            />
          );
        })}
      </div>
    </div>
  );
};

const Card = ({ title, description, imgUrl }) => {
  return (
    <div className="bg-black bg-opacity-40 w-1/5 p-3 rounded-lg">
      <div className="w-full rounded-md">
        <img src={imgUrl} alt="" />
      </div>
      <div className="text-white font-semibold py-3">{title}</div>
      <div className="text-gray-500 text-sm">{description}</div>
    </div>
  );
};

export default LoggedInContainer;
