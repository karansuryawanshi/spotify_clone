import React, { useState } from "react";
import spotify_logo from "../assets/images/Spotify_Logo_CMYK_White.png";
import IconText from "../component/shared/IconText";
import { Icon } from "@iconify/react";
import NavbarText from "../component/shared/NavbarText";
import TextInput from "../component/shared/TextInput";
import SongUpload from "../component/shared/uploadSong";
import {makeAuthenticatedPOSTRequest} from "../utiles/server"
import {useNavigate} from "react-router-dom"

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
              <NavbarText displayText={"Upload Song"} />
              <div className="bg-white text-black text-sm font-semibold w-10 h-10 px-5 flex items-center justify-center rounded-full cursor-pointer">
                KM
              </div>
            </div>
          </div>
        </div>
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

export default UploadSong;
