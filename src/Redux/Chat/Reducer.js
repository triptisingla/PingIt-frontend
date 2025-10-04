import { CREATE_CHAT, GET_USERS_CHAT, CREATE_GROUP } from "./ActionType";
const initialValue={
    createdChat:null,
    chats:[],
    createdGroup:null
}

export const chatReducer=(store=initialValue, {type, payload})=>{
    switch(type){
        case CREATE_CHAT:
            return {...store, createdChat:payload};
        case GET_USERS_CHAT:
            return {...store, chats:payload};
        case CREATE_GROUP:
            return {...store, createdGroup:payload};
        default:
            return store;
    }
}