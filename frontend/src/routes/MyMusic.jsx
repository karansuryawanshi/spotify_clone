import React, { useState, useEffect } from "react";
import spotify_logo from "../assets/images/Spotify_Logo_CMYK_White.png";
import IconText from "../component/shared/IconText";
import { Icon } from "@iconify/react";
import NavbarText from "../component/shared/NavbarText";
import SingleSongComponent from "../component/shared/SingleSongComponent";
import { makeAuthenticatedGETRequest } from "../utiles/server";
import {Howl, Howler} from 'howler';

const MyMusic = () => {
    const [songData, setSongData] = useState([])
    const [soundPlayed, setSoundPlayed] = useState(null);

    const playSound = (songSrc)=>{
      if(soundPlayed){
        soundPlayed.stop();
      }

        let sound = new Howl ({
          src:[songSrc],
          html5:true,
        }) 
        setSoundPlayed(sound);
        sound.play();
    }

    useEffect (()=>{
        const getData = async()=>{
            const response = await makeAuthenticatedGETRequest(
                "/song/get/mysong"
            );
            setSongData(response.data)
            console.log(response.data)
        };
        getData();
    },[])
    

    // const songData = [{
    //     thumbnail : "https://images.unsplash.com/photo-1705596959556-0e11069f3fb9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOHx8fGVufDB8fHx8fA%3D%3D",
    //     name : "New Song",
    //     artist : "Karan Suryawanshi"
    // }]
  
  return (
    <div className="w-screen h-screen flex">
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
              ></IconText>

            <IconText iconName={"ion:search"} displayText={"Search"}></IconText>

            <IconText
              iconName={"codicon:library"}
              displayText={"Library"}
              ></IconText>

            <IconText
              iconName={"entypo:music"}
              displayText={"My Music"}
              active
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
              <NavbarText displayText={"Upload Song"} />
              <div className="bg-white text-black text-sm font-semibold w-10 h-10 px-5 flex items-center justify-center rounded-full cursor-pointer">
                KM
              </div>
            </div>
          </div>
        </div>
        <div className="p-5">
            <div className="text-white text-xl font-semibold mb-4">
                My Song
            </div>
            <div className="space-y-3">
            {songData.map((items)=> {
                return <SingleSongComponent 
                  info={items}
                  playSound={playSound}/>
            })}
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

export default MyMusic;
