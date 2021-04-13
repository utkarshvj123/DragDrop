import axios from "axios";
import { requiredData } from "../../../constants/globalFunction.js";
import {
  requiredDateTimeFormat,
  creatingRequiredDataFormat,
  mappingDataWithUserDetail,
} from "../../../constants/globalFunction";
import { SPINNER } from "../../Login/actions";

export const GET_LIST_USERS = "GET_DATA";
export const MODAL_POP_UP = "MODAL_POP_UP";
export const GET_LIST_TASKS = "GET_LIST_TASKS";
export const TASK_CREATED = "TASK_CREATED";

const URL = "https://devza.com/tests/tasks";
const API_KEY = "e5PhLmwULk9R4nlIMqTzbXnLt5QqiXUN";
const headers = {
  "Content-Type": "application/json",
  authtoken: API_KEY,
};

export const getListOfUsers = () => async (dispatch) => {
  try {
    const newUrl = `${URL}/listusers`;
    const response = await axios.get(newUrl, { headers });
    if (response?.data?.status === "success") {
      dispatch({
        type: GET_LIST_USERS,
        payload: response?.data?.users,
      });
    }
    return response;
  } catch (ex) {
    return ex;
  }
};

export const getTaskLists = (userList) => async (dispatch) => {
  try {
    const newUrl = `${URL}/list`;
    const response = await axios.get(newUrl, { headers });
    if (response?.data?.status === "success") {
      dispatch({
        type: GET_LIST_TASKS,
        payload: mappingDataWithUserDetail(userList, response?.data?.tasks),
      });
    }
    return response;
  } catch (ex) {
    return ex;
  }
};

export const searchingName = (array, searched) => async (dispatch) => {
  dispatch({
    type: GET_LIST_TASKS,
    payload: creatingRequiredDataFormat(array, searched, array),
  });
};

export const createTask = (jsonForTask) => async (dispatch) => {
  const geetingValidDate = requiredDateTimeFormat(jsonForTask.due_date, false);

  var bodyFormData = new FormData();
  bodyFormData.append("message", jsonForTask.message);
  bodyFormData.append("due_date", geetingValidDate);

  bodyFormData.append("priority", jsonForTask.priority);

  bodyFormData.append("assigned_to", jsonForTask.assigned_to);

  try {
    const newUrl = `${URL}/create`;
    const response = await axios.post(newUrl, bodyFormData, {
      headers,
    });
    return response;
  } catch (ex) {
    return ex;
  }
};

export const updateTask = (jsonForTask) => async (dispatch) => {
  const geetingValidDate = requiredDateTimeFormat(jsonForTask.due_date, false);
  var bodyFormData = new FormData();
  bodyFormData.append("message", jsonForTask.message);
  bodyFormData.append("due_date", geetingValidDate);
  bodyFormData.append("priority", jsonForTask.priority);
  bodyFormData.append("assigned_to", jsonForTask.assigned_to);
  bodyFormData.append("taskid", jsonForTask.id);
  try {
    const newUrl = `${URL}/update`;
    const response = await axios.post(newUrl, bodyFormData, {
      headers,
    });
    return response;
  } catch (ex) {
    return ex;
  }
};

export const taskRemoved = (taskId) => async (dispatch) => {
  var bodyFormData = new FormData();
  bodyFormData.append("taskid", taskId);

  try {
    const newUrl = `${URL}/delete`;
    const response = await axios.post(newUrl, bodyFormData, {
      headers,
    });
    return response;
  } catch (ex) {
    return ex;
  }
};

//-----Modal popup-------//
export function modalPopUp(value) {
  return (dispatch) => {
    dispatch({
      type: MODAL_POP_UP,
      payload: value,
    });
  };
}

// export const geStackExchanegeData = (
//   newStartDate,
//   newEndDate,
//   pageSize,
//   pageNumber
// ) => async (dispatch) => {
//   try {
//     const newUrl = `${URL}/listusers`;
//     const response = await axios.get(newUrl);
//     if (response?.status === 200) {
//       dispatch({
//         type: GET_DATA,
//         payload: requiredData(response?.data?.items),
//       });
//     }
//     return response;
//   } catch (ex) {
//     return ex;
//   }
// };
