import React, { use, useEffect } from "react";
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import {
  BsEmojiSmile,
  BsFilter,
  BsMicFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import ChatCard from "./ChatCard/ChatCard";
import { useState } from "react";
import MessageCard from "./MessageCard/MessageCard";
import { ImAttachment } from "react-icons/im";
import "./HomePage.css";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile/Profile";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import CreateGroup from "./Group/CreateGroup";
import { useDispatch, useSelector } from "react-redux";
import { currentUser, logout, searchUser } from "../Redux/Auth/Action";
import { createChat, getUsersChat } from "../Redux/Chat/Action";

const HomePage = () => {
  const [querys, setQuerys] = useState("");
  // const [querys, setQuerys] = useState(null);
  const [currentChat, setCurrentChat] = useState(null);
  const [content, setContent] = useState("");
  const [isProfile, setIsProfile] = useState(false);
  const [onClickSearch, setOnClickSearch] = useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const { auth, chat, message } = useSelector((store) => store);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  const [isGroup, setIsGroup] = useState(false);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickOnChatCard = (userId) => {
    // setCurrentChat(true);
    console.log("USER ID IN HOMEPAGE", userId);
    dispatch(createChat({ data: { userId }, token }));
    setQuerys("");
  };


  const handleSearch = (keyword) => {
    

    const searchKey = keyword.trim() === "" ? "__default__" : keyword;
    setQuerys(searchKey);
    dispatch(searchUser({ keyword: searchKey, token }));
  };

  const handleCreateNewMessage = (content) => {
    setContent(content);
  };
  const handleNavigate = () => {
    // navigate("/profile");
    // setIsProfile(!isProfile);
    setIsProfile(true);
  };
  const handleCloseOpenProfile = () => {
    setIsProfile(false);
  };

  const handleCreateGroup = () => {
    setIsGroup(true);
  };
  const handleLogout = () => {
    dispatch(logout());
    // navigate("/signin");
  };
  useEffect(() => {
    dispatch(getUsersChat({ token }));
  }, [chat.createdChat, chat.createdGroup]);
  useEffect(() => {
    dispatch(currentUser(token));
  }, [token]);
  useEffect(() => {
    if (!auth.reqUser) {
      navigate("/signin");
    }
  }, [auth.reqUser]);
  

  const handleCurrentChat = (item) => {
    setCurrentChat(item);
    setQuerys("");
  };
  return (
    <div className="relative">
      <div className="w-full py-14 bg-[#00a884]"></div>
      <div className="flex bg-[#f0f2f5] h-[90vh] absolute top-[5vh] left-[2vw] w-[96vw]">
        <div className="left w-[30%] bg-[#e8e9ec] h-full">
          {/* Create Group */}
          {isGroup && <CreateGroup />}
          {/* Profile */}
          {isProfile && (
            <div className="w-full h-full">
              <Profile handleCloseOpenProfile={handleCloseOpenProfile} />
            </div>
          )}
          {!isProfile && !isGroup && (
            <div className="w-full">
              {/* Home page */}
              <div className="flex justify-between items-center p-3">
                <div
                  onClick={handleNavigate}
                  className="flex items-center space-x-3"
                >
                  <img
                    className="rounded-full w-10 h-10 cursor-pointer"
                    src="https://cdn.pixabay.com/photo/2025/09/03/13/33/cat-9813484_640.jpg"
                    alt=""
                  />
                  <p>{auth.reqUser?.full_name}</p>
                </div>
                <div className="space-x-3 text-2xl flex">
                  <TbCircleDashed />
                  <BiCommentDetail />
                  <div>
                    <BsThreeDotsVertical
                      id="basic-button"
                      aria-controls={open ? "basic-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                      onClick={handleClick}
                    />
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      slotProps={{
                        list: {
                          "aria-labelledby": "basic-button",
                        },
                      }}
                    >
                      <MenuItem onClick={handleClose}>Profile</MenuItem>
                      <MenuItem onClick={handleCreateGroup}>
                        Create Group
                      </MenuItem>
                      <MenuItem onClick={handleLogout}>Logout</MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
              <div className="relative flex justify-center items-center bg-white py-4 px-3">
                <input
                  className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                  type="text"
                  placeholder="Search or start new Chat"
                  onChange={(e) => {
                    setQuerys(e.target.value);
                    handleSearch(e.target.value);
                  }}
                  value={querys === "__default__" ? "" : querys}
                />
                <AiOutlineSearch className="absolute left-5 top-7" />
                <div>
                  <BsFilter className="ml-4 text-3xl" />
                </div>
              </div>
              {/* {all user} */}
              <div className="bg-white overflow-y-scroll h-[76vh] px-3">
                {querys &&
                  auth.searchUser?.map((item) => (
                    <div onClick={() => handleClickOnChatCard(item.id)}>
                      {" "}
                      <hr />
                      <ChatCard
                        name={item.full_name}
                        userImg={
                          item.profile_picture ||
                          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                        }
                      />{" "}
                    </div>
                  ))}

                {chat.chats.length > 0 &&
                  !querys &&
                  chat.chats?.map((item) => (
                    <div onClick={() => handleCurrentChat(item)}>
                      {" "}
                      <hr />
                      {item.is_group ? (
                        <ChatCard
                          name={item.chat_name}
                          userImg={
                            item.chat_image ||
                            "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"
                          }
                        />
                      ) : (
                        <ChatCard
                          isChat={true}
                          name={
                            auth.reqUser.id === item.users[0].id
                              ? item.users[1].full_name
                              : item.users[0].full_name
                          }
                          userImg={
                            auth.reqUser.id === item.users[0].id
                              ? item.users[1].profile_picture ||
                                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                              : item.users[0].profile_picture ||
                                "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                          }
                        />
                      )}{" "}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>

        {/* default home page */}

        {!currentChat && (
          <div className=" right w-[70%] h-full flex flex-col justify-center items-center">
            <div className="max-w-[70%] text-center">
              <img
                src="https://cdn.pixabay.com/photo/2020/08/11/14/34/greeting-5480092_1280.png"
                alt=""
                className="w-[50%] mx-auto"
              />
              <h1 className="text-4xl text-gray-600">PingIt Web</h1>
              <p className="my-9">
                Send and receive messages without keeping your phone online.
              </p>
            </div>
          </div>
        )}

        {/* chat page */}
        {currentChat && (
          <div className="w-[70%] relative">
            <div className="header absolute top-0 w-full bg-[#f0f2f5]">
              <div className="flex justify-between">
                <div className="flex p-3 space-x-4 items-center">
                  <img
                    src={
                      currentChat.is_group
                        ? currentChat.chat_image ||
                          "https://cdn.pixabay.com/photo/2017/11/10/05/46/group-2935521_1280.png"
                        : auth.reqUser.id === currentChat.users[0].id
                        ? currentChat.users[1].profile_picture ||
                          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                        : currentChat.users[0].profile_picture ||
                          "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_1280.png"
                    }
                    alt=""
                    className="w-10 h-10 rounded-full"
                  />
                  <p>
                    {currentChat.is_group
                      ? currentChat.chat_name
                      : auth.reqUser?.id === currentChat.users[0].id
                      ? currentChat.users[1].full_name
                      : currentChat.users[0].full_name}
                  </p>
                </div>
                <div className="p-3 flex space-x-4 items-center">
                  <AiOutlineSearch />
                  <BsThreeDotsVertical />
                </div>
              </div>
            </div>

            {/* message section */}
            <div className="px-10 h-[85vh] overflow-y-scroll bg-blue-100">
              <div className="space-y-1 flex flex-col justify-center border mt-20 py-2">
                {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1].map(
                  (item, i) => (
                    <MessageCard
                      isReqUserMessage={i % 2 === 0}
                      content={"message"}
                    />
                  )
                )}
              </div>
            </div>

            {/* footer part */}
            <div className="footer bg-[#f0f2f5] absolute bottom-0 w-full py-3 text-2xl">
              <div className="flex justify-between items-center px-5 relative">
                <BsEmojiSmile className="cursor-pointer" />
                <ImAttachment className="cursor-pointer" />

                <input
                  type="text"
                  className="py-2 outline-none border-none bg-white pl-4 rounded-md w-[85%]"
                  placeholder="Type Message"
                  value={content}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleCreateNewMessage(content);
                      setContent("");
                    }
                  }}
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                />
                <div className="pl-3 text-2xl">
                  <BsMicFill />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomePage;
