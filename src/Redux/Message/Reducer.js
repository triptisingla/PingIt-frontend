import { CREATE_NEW_MESSAGE, GET_ALL_MESSAGES } from "./ActionType";
const initialValue = {
  messages: [],
  newMessage: null,
};

export const messageReducer = (store = initialValue, { type, payload }) => {
  switch (type) {
    case CREATE_NEW_MESSAGE:
      return { ...store, newMessage: payload };
    case GET_ALL_MESSAGES:
      return { ...store, messages: payload };
    default:
      return store;
  }
};
