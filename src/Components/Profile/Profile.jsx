import React from "react";
import { BsArrowLeft, BsCheck2, BsPencil } from "react-icons/bs";
import { useState } from "react";
import { CLOUD_NAME, UPLOAD_PRESET } from "../../config/api";
import { updateUser } from "../../Redux/Auth/Action";
import { useDispatch, useSelector } from "react-redux";

const Profile = ({ handleCloseOpenProfile }) => {
  const [flag, setFlag] = useState(false);
  const [username, setUsername] = useState("");
  const [tempPicture, setTempPicture] = useState(null);
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const handleFlag = () => {
    setFlag(true);
  };

  const handleCheckClick = () => {
    setFlag(false);
    handleUpdateName({key:"Enter"});
  };

  const handleChange = (e) => {
    setUsername(e.target.value);
  };
  const uploadProfilePic = (pics) => {
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
        setTempPicture(data.url.toString());
        console.log(data);

        const dataa = {
          id: auth.reqUser.id,
          token: localStorage.getItem("token"),
          data: { profile_picture: data.url.toString() },
        };
        dispatch(updateUser(dataa));
      })
      .catch((err) => {
        console.log(err);
      });
    // upload profile pic function
  };
  const handleUpdateName = (e) => {
    if (e.key === "Enter") {
      const data = {
        id: auth.reqUser.id,
        token: localStorage.getItem("token"),
        data: { full_name: username },
      };
      dispatch(updateUser(data));
      setFlag(false);
    }
  };
  return (
    <div className="w-full h-full ">
      <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
        <BsArrowLeft
          className="cursor-pointer text-2xl font-bold"
          onClick={handleCloseOpenProfile}
        />
        <p className="cursor-pointer font-semibold">Profile</p>
      </div>

      {/*update profile pic section  */}
      <div className="flex flex-col justify-center items-center my-12">
        <label htmlFor="imgInput">
          <img
            className="w-[15vw] h-[15vw] rounded-full cursor-pointer"
            src={
              auth.reqUser?.profile_picture ||
              tempPicture ||
              "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
            }
            alt=""
          />
        </label>
        <input
          onChange={(e) => uploadProfilePic(e.target.files[0])}
          type="File"
          id="imgInput"
          className="hidden"
        />
      </div>

      {/* name section */}
      <div className="px-3 bg-white">
        <p className="py-3">Your name</p>

        {!flag && (
          <div className="w-full flex justify-between items-center">
            <p className="py-3">{auth.reqUser.full_name || "username"}</p>
            <BsPencil onClick={handleFlag} className="cursor-pointer" />
          </div>
        )}
        {flag && (
          <div className="w-full flex justify-between items-center py-2">
            <input
              onKeyPress={handleUpdateName}
              onChange={handleChange}
              className="w-[80%] outline-none border-b-2 border-blue-700 p-2"
              type="text"
              placeholder="Enter your name"
            />
            <BsCheck2
              onClick={handleCheckClick}
              className="cursor-pointer text-2xl"
            />
          </div>
        )}
      </div>

      <div className="px-3 my-5">
        <p className="py-10">
          This is not your username, this will be visible to your contacts.
        </p>
      </div>
    </div>
  );
};

export default Profile;
