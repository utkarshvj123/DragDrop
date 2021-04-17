import {
  GET_LIST_USERS,
  GET_LIST_TASKS,
  MODAL_POP_UP,
  SORT_CATEGORY,
} from "../modules/Home/actions";

const initialState = {
  listOfAllUsers: [],
  listOfAllTasks: [],
  sortCategory: "",
  modalPopUp: false,
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_LIST_USERS:
      return { ...state, listOfAllUsers: action.payload };
    case GET_LIST_TASKS:
      return { ...state, listOfAllTasks: action.payload };
    case SORT_CATEGORY:
      return { ...state, sortCategory: action.payload };
    case MODAL_POP_UP:
      return {
        ...state,
        modalPopUp: action.payload,
      };
    default:
      return state;
  }
};
