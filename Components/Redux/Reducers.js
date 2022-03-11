import { combineReducers } from "redux";

const statusInOut = (state = "nil", action) => {
  switch (action.type) {
    case "updateStatus":
      return action.data;
    default:
      return state;
  }
};

const userName = (state = "", action) => {
  switch (action.type) {
    case "setUser":
      return action.data;
    default:
      return state;
  }
};

const appApiUrl = (state = "http://192.168.200.192:5001/", action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const allReducers = combineReducers({ statusInOut, userName, appApiUrl });
export default allReducers;
