import { IS_VALID_USER, SPINNER } from "../modules/Login/actions";

const getCurrentStatus = JSON.parse(localStorage.getItem("isValid"));

const initialState = {
  getCurrentStatus,
  spinnerVisibility: false,
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_VALID_USER:
      return { ...state, getCurrentStatus: action.payload };
    case SPINNER:
      return { ...state, spinnerVisibility: action.payload };
    default:
      return state;
  }
};
