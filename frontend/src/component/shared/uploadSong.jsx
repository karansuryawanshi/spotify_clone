// import { openUploadWidget } from "../../utils/CloudinaryService";
import { openUploadWidget } from "../../utiles/CloudinaryService";
import { cloudinary_upload_preset } from "../../config";
import { useState } from "react";
// import { openUploadWidget } from "../utiles/CloudinaryService";

const SongUpload = ({props, setUrl, setName}) => {

  const uploadImageWidget = () => {
    console.log(props);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: "dcjuzfafi",
        uploadPreset: cloudinary_upload_preset,
        // tags: ["myname"],
        // maxImageWidth: 600,
        sources: ["local"]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          setName(result.info.original_filename)
          setUrl(result.info.secure_url)
        }else{
          if(error){
            console.log(error)
          }
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="bg-white text-black rounded-full p-4 font-semibold" onClick={uploadImageWidget}>
      Select Track
    </button>
  );
};

export default SongUpload;
