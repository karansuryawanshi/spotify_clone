import React, { Children, useState } from "react";
import spotify_logo from "../assets/images/Spotify_Logo_CMYK_White.png";
import IconText from "../component/shared/IconText";
import { Icon } from "@iconify/react";
import NavbarText from "../component/shared/NavbarText";
import { useNavigate } from 'react-router-dom';
import {Howl, Howler} from 'howler';



const LoggedInContainer = ({children}) => {

  const [soundPlayed, setSoundPlayed] = useState(null)
  const [isPaused, setIsPaused] = useState(true)

  const playSound = (songSrc)=>{
    if(soundPlayed){
      soundPlayed.stop();
    }

      let sound = new Howl ({
        src:["https://res.cloudinary.com/dcjuzfafi/video/upload/v1705749307/psc3sdfx1csqjkgilssb.mp3"],
        html5:true,
      }) 
      setSoundPlayed(sound);
      sound.play();
      console.log("Song played")
      console.log("played successfully")
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
  return (
    <div className="w-screen h-screen flex">
      <div className="w-full h-full">
        <div className="w-full h-9/10 flex">
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
                active
              ></IconText>

              <IconText iconName={"ion:search"} displayText={"Search"}></IconText>

              <IconText
                iconName={"codicon:library"}
                displayText={"Library"}
              ></IconText>

              <IconText
                iconName={"entypo:music"}
                displayText={"My Music"}
              ></IconText>

            </div>
            <div className="pt-5">
              <IconText
                iconName={"basil:add-solid"}
                displayText={"Create Playlist"}
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
                  KM
                </div>
              </div>
            </div>
          </div>
          <div className="content p-8 pt-0">
            {/* <PlaylistView titleText={"Focus"} cardData={focusCardsData} />
            <PlaylistView
              titleText={"Spotify Playlist"}
              cardData={focusCardsData}
            />
            <PlaylistView
              titleText={"Sound of India"}
              cardData={focusCardsData}
            /> */}
          {children}
          </div>
          </div> 
        </div>
        <div className=" w-full h-1/10 bg-black flex text-white pl-4">
          <div className="w-1/3 flex items-center">
            <img src="https://plus.unsplash.com/premium_photo-1705927288742-393ba2746e32?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyMnx8fGVufDB8fHx8fA%3D%3D" 
              alt="currentImage" 
              className="h-10 w-10 rounded-sm"/>
              <div className="pl-4">
                <div className="text-sm cursor-pointer hover:underline">Bandeya</div>
                <div className="text-xs text-gray-500 cursor-pointer hover:underline">Karan Suryawanshi</div>
              </div>
            </div>
            <div className="w-1/2 flex items-center justify-center flex-col">
              <div className="flex w-1/2 justify-between">
              <Icon icon="solar:shuffle-outline" fontSize={27} className="text-gray-400 cursor-pointer hover:text-white" />
              <Icon icon="fluent:previous-32-filled" fontSize={27} className="text-gray-400 cursor-pointer hover:text-white"/>
              <Icon icon="zondicons:pause-solid" fontSize={33} className="text-gray-400 cursor-pointer hover:text-white" onClick={togglePlayPause}/>
              <Icon icon="fluent:next-32-filled" fontSize={27} className="text-gray-400 cursor-pointer hover:text-white"/>
              <Icon icon="mdi:repeat" fontSize={27} className="text-gray-400 cursor-pointer hover:text-white"/>
              </div>
            </div>
            <div className="w-1/4 flex justify-end">
              Hell0
            </div>
          </div>
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
