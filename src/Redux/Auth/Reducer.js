const initialValue = {
  signup: null,
  signin: null,
  reqUser: null,
  searchUser: null,
  updateUser: null
};

export const authReducer = (store = initialValue, { type, payload }) => {
  switch (type) {
    case "REGISTER":
      return { ...store, signup: payload };
    case "LOGIN":
      return { ...store, signin: payload };
    case "REQ_USER":
      return { ...store, reqUser: payload };
    case "SEARCH_USER":
      return { ...store, searchUser: payload };
    case "UPDATE_USER":
      return { ...store, updateUser: payload };
    case "AUTH_ERROR":
      return { ...store, error: payload };
    case "LOGOUT":
      return { ...store, signin: null, reqUser: null };
    default:
      return store;
  }
};
