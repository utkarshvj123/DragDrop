import {
  GET_LIST_USERS,
  GET_LIST_TASKS,
  MODAL_POP_UP,
} from "../modules/Home/actions";

const initialState = {
  listOfAllUsers: [],
  listOfAllTasks: {},
  modalPopUp: false,
};

export const homeReducer = (state = initialState, action) => {
  console.log(action, "....action");
  switch (action.type) {
    case GET_LIST_USERS:
      return { ...state, listOfAllUsers: action.payload };
    case GET_LIST_TASKS:
      return { ...state, listOfAllTasks: action.payload };
    case MODAL_POP_UP:
      return {
        ...state,
        modalPopUp: action.payload,
      };
    default:
      return state;
  }
};
