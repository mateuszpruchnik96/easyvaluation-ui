import { storage } from "store";

const isLoggedReducer = (state = false, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return true;
    case "SIGN_OUT":
      return false;
    case "SIGN_IN_PENDING":
      return "PENDING";
    default:
      return state;
  }
};

export default isLoggedReducer;
