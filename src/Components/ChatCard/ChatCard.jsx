import React from "react";

const ChatCard = () => {
  return (
    <div className="flex items-center justify-center py-2 group cursor-pointer">
      <div className="w-[20%]">
        <img
          className="rounded-full w-14 h-14 cursor-pointer"
          src="https://cdn.pixabay.com/photo/2025/09/05/18/50/cow-9817881_640.jpg"
          alt=""
        />
      </div>
      <div className="w-[80%] pl-5">
        <div className="flex justify-between items-center">
          <p className="text-lg">username</p>
          <p className="text-sm">timestamp</p>
        </div>
        <div className="flex justify-between items-center">
            <p>message...</p>
            <div className="flex space-x-2 items-center">
                <p className="text-xs py-1 px-2 text-white bg-green-500 rounded-full">5 notifications</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
