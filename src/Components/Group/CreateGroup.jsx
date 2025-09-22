import React from "react";
import { BiLeftArrow } from "react-icons/bi";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import { useState } from "react";
import SelectedMember from "./SelectedMember";
import ChatCard from "../ChatCard/ChatCard";
import NewGroup from "./NewGroup";

const CreateGroup = () => {
  const [newGroup, setNewGroup] = useState(false);
  const [groupMember, setGroupMember] = useState(new Set());

  const [query, setQuery] = useState("");
  const handleRemoveMember = (item) => {
    const newMembers = new Set(groupMember);
    newMembers.delete(item);
    setGroupMember(newMembers);
  };
  const handleSearch = () => {};

  return (
    <div className="w-full h-full">
      {!newGroup && (
        <div>
          <div className="flex items-center space-x-10 bg-[#008069] text-white pt-16 px-10 pb-5">
            <BsArrowLeft className="cursor-pointer text-2xl font-bold" />
            <p className="text-xl font-semibold">Add Group participants</p>
          </div>
          <div className="relative bg-white px-3 py-4 ">
            <div className="space-x-2 flex flex-wrap space-y-1">
              {groupMember.size > 0 &&
                Array.from(groupMember).map((item) => (
                  <SelectedMember
                    member={item}
                    handleRemoveMember={() => handleRemoveMember(item)}
                  />
                ))}
            </div>

            <input
              type="text"
              onChange={(e) => {
                handleSearch(e.target.value);
                setQuery(e.target.value);
              }}
              className="outline-none border-b border-[#8888] p-2 w-[95%]"
              placeholder="Search user"
              value={query}
            />
          </div>
          <div className="bg-white overflow-y-scroll h-[50.2vh]">
            {query &&
              [1, 2, 3, 4, 5].map((item) => (
                <div
                  onClick={() => {
                    groupMember.add(item);
                    setGroupMember(groupMember);
                    setQuery("");
                  }}
                  key={item?.id}
                >
                  <hr />
                  <ChatCard />
                </div>
              ))}
          </div>

          <div className="bottom-10 py-10 bg-slate-200 items-center justify-center flex">
            <div className="bg-green-600 rounded-full p-4 cursor-pointer"
              onClick={() => {
                setNewGroup(true);
              }}
            >
              <BsArrowRight className="text-white text-3xl font-bold" />
            </div>
          </div>
        </div>
      )}
      {newGroup && (<NewGroup/>)}
    </div>
  );
};

export default CreateGroup;
