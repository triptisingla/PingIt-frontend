import React from 'react';
import { TbCircleDashed } from "react-icons/tb";
import { BiCommentDetail } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFilter } from "react-icons/bs";
import ChatCard from './ChatCard/ChatCard';

const HomePage = () => {
    return (
      <div className="relative">
        <div className="w-full py-14 bg-[#00a884]">
          <div className="flex bg-[#f0f2f5] h-[94vh] absolute top-7 left-6 w-full">
            <div className="left w-[30%] bg-[#e8e9ec] h-full">
              <div className="w-full">
                <div className="flex justify-between items-center p-3">
                  <div className="flex items-center space-x-3">
                    <img
                      className="rounded-full w-10 h-10 cursor-pointer"
                      src="https://cdn.pixabay.com/photo/2025/09/03/13/33/cat-9813484_640.jpg"
                      alt=""
                    />
                    <p>username</p>
                  </div>
                  <div className="space-x-3 text-2xl flex">
                    <TbCircleDashed />
                    <BiCommentDetail />
                  </div>
                </div>
                <div className="relative flex justify-center items-center bg-white py-4 px-3">
                  <input
                    className="border-none outline-none bg-slate-200 rounded-md w-[93%] pl-9 py-2"
                    type="text"
                    placeholder="Search or start new Chat"
                  />
                  <AiOutlineSearch className="absolute left-5 top-7" />
                  <div>
                    <BsFilter className="ml-4 text-3xl" />
                  </div>
                </div>
                <div className="bg-white overflow-y-scroll h-[76.8vh] px-3">
                  {[
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1, 
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                    1,
                  ].map((item) => <div><hr /><ChatCard /></div>
                  )}
                </div>
              </div>
            </div>

            <div className="right"></div>
          </div>
        </div>
      </div>
    );
};

export default HomePage;