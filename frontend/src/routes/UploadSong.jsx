import React, { useState } from "react";
import spotify_logo from "../assets/images/Spotify_Logo_CMYK_White.png";
import IconText from "../component/shared/IconText";
import { Icon } from "@iconify/react";
import NavbarText from "../component/shared/NavbarText";
import TextInput from "../component/shared/TextInput";
import SongUpload from "../component/shared/uploadSong";
import {makeAuthenticatedPOSTRequest} from "../utiles/server"
import {useNavigate} from "react-router-dom"
import LogginHome from "./LogginHome";
import LoggedInContainer from "../container/LoggedInContainer";

const UploadSong = () => {
  const [name, setName] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [playlistUrl, setPlaylistUrl] = useState("")
  const [uploadSongFilename,setUploadSongFilename] = useState("")
  // const [url, setUrl] = useState("")
  const navigate = useNavigate()

  const submitSong = async()=>{
    // console.log(name)
    // console.log(thumbnail)
    // console.log(playlistUrl)
    const data = {name, thumbnail, track:playlistUrl}
    const response = await makeAuthenticatedPOSTRequest(
      "/song/create",
      data)
      if(response.err){
        alert("Cannot Create Song")
      }
      alert("Success");
      console.log(response)
      navigate("/home")
  }

  return (

        <LoggedInContainer>

        <div className="content p-8 pt-0">
            <div className="text-2xl font-semibold text-white mt-8">
                Upload Song
            </div>
            <div className="flex w-2/3 space-x-5 ">
                <div className="w-1/2">
                    <TextInput 
                    label={'Song Name'}
                    labelClassName={'text-white pt-8 my-3'}
                    value={name}
                    setValue={setName}/>
                </div>
                <div className="w-1/2">
                <TextInput 
                    label={'Thumbnail'}
                    labelClassName={'text-white pt-8 my-3'}
                    value={thumbnail}
                    setValue={setThumbnail}/>
                </div>
            </div>
            <div className="mt-8">
              { uploadSongFilename?
              <div className="bg-white rounded-full p-3 w-1/3">
                {uploadSongFilename.substring(0,35)}...
              </div>
              :
              <SongUpload 
              setUrl={setPlaylistUrl} 
              setName={setUploadSongFilename}/>
            }
            </div>
            <div className="bg-white text-black font-semibold mt-8 p-4 rounded-full w-1/4 cursor-pointer flex items-center justify-center" onClick={submitSong}>
              Submit Song
            </div>
        </div>
            </LoggedInContainer>
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

export default UploadSong;
