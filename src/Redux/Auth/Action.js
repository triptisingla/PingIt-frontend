import {
  REGISTER,
  LOGIN,
  REQ_USER,
  SEARCH_USER,
  UPDATE_USER,
  LOGOUT,
} from "./ActionType";
import { BASE_API_URL } from "../../config/api";

// register action
export const register = (data) => async (dispatch) => {
  try {
    console.log("DATA IN REGISTER ACTION", data);
    const res = await fetch(`${BASE_API_URL}/auth/signup`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.jwt) {
      localStorage.setItem("token", result.jwt);
      // console.log(result.jwt);
    }
    console.log("REGISTER : ", result);
    dispatch({ type: REGISTER, payload: result });
  } catch (error) {
    console.log("Error while registering the user", error);
  }
};

// login action

export const login = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/auth/signin`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: { "Content-Type": "application/json" },
    });
    const result = await res.json();
    if (result.jwt) {
      localStorage.setItem("token", result.jwt);
      // console.log(result.jwt);
    }
    console.log("LOGIN : ", result);
    dispatch({ type: LOGIN, payload: result });
  } catch (error) {
    console.log("Error while logging in the user", error);
  }
};

// current user action
export const currentUser = (token) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/profile`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const result = await res.json();
    console.log("CURRENT_USER : ", result);
    dispatch({ type: REQ_USER, payload: result });
  } catch (error) {
    console.log("Error while fetching current user", error);
  }
};

// search user action
export const searchUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/users/search?name=${data.keyword}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${data.token}`,
        },
      }
    );
    const result = await res.json();
    console.log("SEARCH_USER : ", result);
    dispatch({ type: SEARCH_USER, payload: result });
  } catch (error) {
    console.log("Error while searching user", error);
  }
};

export const updateUser = (data) => async (dispatch) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/users/update/${data.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${data.token}`,
      },
    });
    const result = await res.json();
    console.log("UPDATE_USER : ", result);
    dispatch({ type: UPDATE_USER, payload: result });
  } catch (error) {
    console.log("Error while updating user", error);
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("token");
    dispatch({ type: LOGOUT, payload: null });
    dispatch({ type: REQ_USER, payload: null });
  } catch (error) {
    console.log("Error while logging out", error);
  }
};
