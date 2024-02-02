import React, { useState, useEffect } from "react";
import SingleSongComponent from "../component/shared/SingleSongComponent";
import { makeAuthenticatedGETRequest } from "../utiles/server";
import {Howl, Howler} from 'howler';
import LoggedInContainer from "../container/LoggedInContainer";

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
  
  return (
    <LoggedInContainer>
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
    </LoggedInContainer>
  );
};

export default MyMusic;
