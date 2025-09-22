import CircularProgress from "@mui/material/CircularProgress";
import React from "react";
import { BsArrowLeft, BsCheck2 } from "react-icons/bs";
import { useState } from "react";
import { Button } from "@mui/material";

const NewGroup = () => {
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [toChangeGroupName, setToChangeGroupName] = useState(false);

  return (
    <div className="w-full h-full">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft className="cursor-pointer font-bold text-2xl" />
        <p className="text-xl font-semibold">New Group</p>
      </div>
      <div className="flex flex-col items-center justify-center my-12">
        <label htmlFor="imgInput" className="relative">
          <img
            src="https://cdn.pixabay.com/photo/2018/10/01/09/21/pets-3715733_1280.jpg"
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
          onChange={() => {
            console.log("ImageOnChange");
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
          <Button>
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
