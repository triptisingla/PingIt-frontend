import { CREATE_NEW_MESSAGE,GET_ALL_MESSAGES } from "./ActionType";
import { BASE_API_URL } from "../../config/api";

export const createMessage = (messageData) => async (dispatch) => {
  try {
    console.log("DATA IN CREATE MESSAGE ACTION", messageData);
    const response = await fetch(`${BASE_API_URL}/api/messages/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${messageData.token}`,
      },
      body: JSON.stringify(messageData.data),
    });
    const result = await response.json();
    console.log("create message action result", result);
    dispatch({ type: CREATE_NEW_MESSAGE, payload: result });
  } catch (error) {
    console.log("Error while creating message", error);
  }
};


export const getAllMessages = (reqData) => async (dispatch) => {
  try {
    const response = await fetch(`${BASE_API_URL}/api/messages/chat/${reqData.chatId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${reqData.token}`,
      },
    });
    const result = await response.json();
    console.log("get all messages action result", result);
    dispatch({ type: GET_ALL_MESSAGES, payload: result });
  } catch (error) {
    console.log("Error while getting all messages", error);
  }
};