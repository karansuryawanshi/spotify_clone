import React from "react";
import spotify_logo from "../assets/images/Spotify_Logo_CMYK_White.png";
import IconText from "../component/shared/IconText";
import { Icon } from "@iconify/react";
import NavbarText from "../component/shared/NavbarText";
import { useNavigate } from 'react-router-dom';

const focusCardsData = [
  {
    title: "Panjabi 101",
    description: "Ultimate 101 Punjabi Hit with shubh.",
    imgUrl:
      "https://images.hungama.com/c/1/efc/d8b/88826734/88826734_300x300.jpg",
  },
  {
    title: "Hits Hindi",
    description: "Hindi music Serve Here.",
    imgUrl:
      "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "I-pop Hits",
    description: "Biggest Hit from your favourate pop star.",
    imgUrl:
      "https://images.unsplash.com/photo-1530294865017-4bc65ed2e7ab?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "New in dance",
    description: "Latest floor filter to kickstart your party.",
    imgUrl:
      "https://images.unsplash.com/photo-1528243097678-739049bbf2e7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Safar mix",
    description: "A perfect travel mix for your journey.",
    imgUrl:
      "https://plus.unsplash.com/premium_photo-1661690868627-fad2917d304e?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const Home = () => {
  const navigate = useNavigate();
  const navigatedLogin =()=>{
    navigate("/login")
  } 

  const navigatedSignup =()=>{
    navigate("/signup")
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
              <div onClick={navigatedSignup}>
                <NavbarText displayText={"Sign up"} />
              </div>
              <div className="bg-white text-black text-sm font-semibold h-2/3 px-8 flex items-center justify-center rounded-full cursor-pointer" onClick={navigatedLogin}>
                login
              </div>
            </div>
          </div>
        </div>
        <div className="content p-8 pt-0">
          <PlaylistView titleText={"Focus"} cardData={focusCardsData} />
          <PlaylistView
            titleText={"Spotify Playlist"}
            cardData={focusCardsData}
          />
          <PlaylistView
            titleText={"Sound of India"}
            cardData={focusCardsData}
          />
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

export default Home;
