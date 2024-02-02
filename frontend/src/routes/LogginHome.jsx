import React, { Children, useState } from "react";
import LoggedInContainer from "../container/LoggedInContainer";

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

const LogginHome = () => {
  return (
      <LoggedInContainer>
            <PlaylistView 
              titleText={"Focus"} 
              cardData={focusCardsData} 
            />

            <PlaylistView
              titleText={"Spotify Playlist"}
              cardData={focusCardsData}
            />
            
            <PlaylistView
              titleText={"Sound of India"}
              cardData={focusCardsData}
            />
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

export default LogginHome;
