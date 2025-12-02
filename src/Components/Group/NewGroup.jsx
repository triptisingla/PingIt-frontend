import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useState } from "react";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createGroupChat } from "../../Redux/Chat/Action";
import { CLOUD_NAME, UPLOAD_PRESET } from "../../config/api";


const NewGroup = ({groupMember,setIsGroup}) => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupImage,setGroupImage]=useState(null);
  const [groupName, setGroupName] = useState("");
  const [toChangeGroupName, setToChangeGroupName] = useState(false);
  const token=localStorage.getItem("token");
  const dispatch=useDispatch();

   const uploadToCloudinary = (pics) => {
       setIsImageUploading(true);
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", UPLOAD_PRESET);
      data.append("cloud_name", CLOUD_NAME);

      console.log(data);
      fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setGroupImage(data.url.toString());
//           console.log(data);
            setIsImageUploading(false);
        })
        .catch((err) => {
          console.log(err);
        });
      // upload profile pic function
    };




    const handleCreateGroup=()=>{
        let userIds=[];
        for (let user of groupMember)
        {
            userIds.push(user.id);
        }

        const group={
            userIds,
            chat_name:groupName,
            chat_image:groupImage
            };
        const data={
            group,
            token
        };
        dispatch(createGroupChat(data));
        setIsGroup(false);
        }
  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft className="cursor-pointer font-bold text-2xl" />
        <p className="text-xl font-semibold">New Group</p>
      </div>
      <div className="flex flex-col items-center justify-center my-12">
        <label htmlFor="imgInput" className="relative">
          <img
            src={groupImage||"https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg"}
            alt="Group"
            className="rounded-full w-64 h-64 cursor-pointer border-4 border-green-700"
          />
          {isImageUploading && (
            <CircularProgress className="absolute top-[5rem] left-[6rem]" />
          )}
        </label>
        <input
          type="file"
          id="imgInput"
          className="hidden"
          onChange={(e) => {
            uploadToCloudinary(e.target.files[0]);
          }}
        />
      </div>
      <div className="w-full flex justify-between px-5 items-center py-2">
        <input
          className="w-full outline-none border-b-2 border-green-700 px-2 bg-transparent"
          placeholder="Group Subject"
          value={groupName}
          type="text"
          onChange={(e) => {
            setGroupName(e.target.value);
            setToChangeGroupName(true);
          }}
        />
      </div>
      {groupName && toChangeGroupName && (
        <div className="py-10 bg-slate-200 flex items-center justify-center">
          <Button
          onClick={handleCreateGroup}>
            <div className="bg-[#0c977d] rounded-full p-4">
              <BsCheck2 className="text-white font-bold text-3xl" onClick={() => {setToChangeGroupName(false)}} />
            </div>
          </Button>
        </div>
      )}
    </div>
  );
};

export default NewGroup;
