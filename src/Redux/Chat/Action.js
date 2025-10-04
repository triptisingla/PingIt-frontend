import { CREATE_CHAT, CREATE_GROUP, GET_USERS_CHAT } from "./ActionType";
import { BASE_API_URL } from "../../config/api";

export const createChat=(chatData)=>async (dispatch)=>{
try{
    const response=await fetch(`${BASE_API_URL}/api/chat/single`,{
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${chatData.token}`
        },
        body:JSON.stringify(chatData.data)
    });
    const result=await response.json();
    console.log("create chat action result",result);
    dispatch({type:CREATE_CHAT,payload:result});

}catch(error){  
console.log("Error while creating chat",error);
}

}





export const createGroupChat = (chatData) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/chat/group`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      },
      body: JSON.stringify(chatData.data),
    });
    const result = await response.json();
    console.log("create group chat action result", result);
    dispatch({ type: CREATE_GROUP, payload: result });
  } catch (error) {
    console.log("Error while creating group chat", error);
  }
};





export const getUsersChat = (chatData) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/chat/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${chatData.token}`,
      }
    });
    const result = await response.json();
    console.log("get all chats by user", result);
    dispatch({ type: GET_USERS_CHAT, payload: result });
  } catch (error) {
    console.log("Error while getting user chats", error);
  }
};