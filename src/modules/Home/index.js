import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "./style.scss";
import Select from "../../components/Select";
import * as Icon from "react-bootstrap-icons";

import {
  getListOfUsers,
  getTaskLists,
  createTask,
  taskRemoved,
  updateTask,
  searchingName,
  sortDataAccourdingToUserSpecific,
  settingSortCategory,
} from "./actions";
import { authenticateUserAction } from "../Login/actions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import DragDrop from "../../components/DragDrop/index";
import CreateTaskModal from "./Components/CreateTaskModal";
import { spinerStateUpdate } from "../Login/actions";

const Container = styled.div`
  padding: 100px 0px 30px 0px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px;

  .btn-primary {
    display: flex;
    align-items: center;

    .icon-add {
      font-size: 20px;
      margin-left: 5px;
    }
  }
  // @media (max-width: 840px) {
  //   padding: 0% 5%;
  // }
  // @media (max-width: 720px) {
  //   display: block;
  // }
`;

const SearchSortWrapper = styled.div`
  background: lightgray;
  padding: 20px;
  box-shadow: 0 4px 8px 0 rgb(0 0 0 / 20%) !important;
  .input-search-sort {
    .input-search {
      width: 100%;
      margin: 20px 0px;
      input {
        height: inherit;
        border-radius: 54px;
        padding: 0px 20px;
        height: 56px;
      }
      .search-text {
        font-size: 1.5rem;
        font-weight: 700;
        margin: 10px;
        color: #be3946;
      }
    }
    // justify-content: flex-end;
  }
`;

const Home = () => {
  const dispatch = useDispatch();
  const [modalVisble, setModalVisibility] = useState(false);
  const [completeJsonForDisplay, setCompleteJsonForDisplay] = useState({});
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [searchValueDefined, setSearchValue] = useState("");
  const [sortSelect, setSortSelect] = useState({});

  const currentListOfUsers = useSelector(
    (state) => state?.homeData?.listOfAllUsers
  );
  const listOfAllTasks = useSelector(
    (state) => state?.homeData?.listOfAllTasks
  );
  const sortBy = useSelector((state) => state?.homeData?.sortCategory);

  useEffect(() => {
    dispatch(spinerStateUpdate(true));
    dispatch(getListOfUsers()).then((res) => {
      dispatch(getTaskLists(res.data.users, sortBy)).then((res) => {
        dispatch(spinerStateUpdate(false));
      });
    });
  }, []);

  const onChangeDateTime = (date) => {
    setCompleteJsonForDisplay({
      ...completeJsonForDisplay,
      due_date: date,
    });
  };

  const modalEventHandler = (type) => {
    if (type === "enable") {
      setCompleteJsonForDisplay({});
      setModalVisibility(!modalVisble);
    } else {
      if (
        completeJsonForDisplay?.due_date &&
        completeJsonForDisplay?.assigned_to !== undefined &&
        completeJsonForDisplay?.priority !== undefined &&
        Object.keys(completeJsonForDisplay?.priority).length > 0 &&
        Object.keys(completeJsonForDisplay?.assigned_to).length > 0 &&
        completeJsonForDisplay?.message
      ) {
        const jsonCreation = {
          message: completeJsonForDisplay?.message,
          due_date: completeJsonForDisplay?.due_date,
          priority: completeJsonForDisplay?.priority.id,
          assigned_to: completeJsonForDisplay?.assigned_to.id,
        };
        dispatch(spinerStateUpdate(true));
        dispatch(createTask(jsonCreation)).then((response) => {
          if (response?.data?.status === "success") {
            modalEventHandler("enable");
            setCompleteJsonForDisplay({});
            dispatch(getTaskLists(currentListOfUsers, sortBy)).then((res) => {
              dispatch(spinerStateUpdate(false));
            });
            toastMessage("success", "Task successfully added.");
          }
        });
      } else {
        toastMessage("error", "Please fill all detail");
      }
    }
  };
  const toastMessage = (toastType, message) => {
    toast[toastType](message, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };
  const onChangeMessage = (event) => {
    setCompleteJsonForDisplay({
      ...completeJsonForDisplay,
      message: event.target.value,
    });
  };

  const hadleOnChangePriority = (selectedOption, type) => {
    if (type === "priority") {
      setCompleteJsonForDisplay({
        ...completeJsonForDisplay,
        priority: selectedOption,
      });
    } else if (type === "assigned") {
      setCompleteJsonForDisplay({
        ...completeJsonForDisplay,
        assigned_to: selectedOption,
      });
    } else if (type === "sort") {
      dispatch(settingSortCategory(listOfAllTasks, selectedOption.value));
      setSortSelect(selectedOption);
    }
  };

  const editModalSubmitHandler = (type, dataValue) => {
    if (type === "enable") {
      setCompleteJsonForDisplay({});
      setEditModalVisible(!editModalVisible);
    } else {
      if (
        dataValue.due_date &&
        Object.keys(dataValue.priority).length > 0 &&
        Object.keys(dataValue.assigned_to).length > 0 &&
        dataValue.message
      ) {
        const jsonCreation = {
          message: dataValue.message,
          due_date: dataValue.due_date,
          priority: dataValue.priority.id,
          assigned_to: dataValue.assigned_to.id,
          id: dataValue.id,
        };
        dispatch(spinerStateUpdate(true));

        dispatch(updateTask(jsonCreation)).then((response) => {
          if (response.data.status === "success") {
            setEditModalVisible(!editModalVisible);
            setCompleteJsonForDisplay({});
            dispatch(getTaskLists(currentListOfUsers, sortBy)).then((res) =>
              dispatch(spinerStateUpdate(false))
            );
            toastMessage("success", "Detail updated successfully.");
          }
        });
      }
    }
  };

  const handlingRemoval = (removalValue) => {
    dispatch(spinerStateUpdate(true));
    dispatch(taskRemoved(removalValue.id)).then((response) => {
      if (response.data.status === "success") {
        dispatch(getTaskLists(currentListOfUsers, sortBy)).then((res) =>
          dispatch(spinerStateUpdate(false))
        );
        toastMessage("success", "Removed successfully.");
      }
    });
  };

  const handlingEdit = (value) => {
    setCompleteJsonForDisplay(value);
    setEditModalVisible(!editModalVisible);
  };
  const handleDragDrop = (json) => {
    console.log(json, ".....json");

    dispatch(spinerStateUpdate(true));
    dispatch(
      updateTask(
        json,
        listOfAllTasks?.dueDatedArray,
        listOfAllTasks?.clonedData
      )
    ).then((response) => {
      if (response.data.status === "success") {
        dispatch(getTaskLists(currentListOfUsers, sortBy)).then((res) =>
          dispatch(spinerStateUpdate(false))
        );
        toastMessage("success", "Priority updated successfully..");
      }
    });
  };

  const onChangeSearch = (value) => {
    dispatch(searchingName(listOfAllTasks?.clonedData, value.target.value));
    setSearchValue(value.target.value);
    // debugger;
  };

  const sortNumber = [
    { id: "1", name: "Date", value: "due_date" },
    { id: "2", name: "Name", value: "assigned_name" },
  ];

  // console.log(_users, "......._users");
  const isDisabledSordSearch =
    Object.keys(listOfAllTasks).length > 0 ? false : true;
  return (
    <React.Fragment>
      <div className="container">
        <Container>
          <ButtonWrapper>
            <button
              className="btn btn-primary"
              onClick={() => modalEventHandler("enable")}
            >
              Create Task
              <div className="icon-add">
                <Icon.Plus />
              </div>{" "}
            </button>
          </ButtonWrapper>
          <SearchSortWrapper>
            <div className="input-search-sort">
              <div className="input-search">
                <input
                  type="text"
                  value={searchValueDefined}
                  onChange={onChangeSearch}
                  placeholder="Search"
                  className="form-control"
                  disabled={isDisabledSordSearch}
                />
                <div className="search-text">Devza Search</div>
              </div>

              <div className="form-group">
                <label>Sort :</label>
                <Select
                  currentSelected={sortSelect}
                  handleOnChange={(event) =>
                    hadleOnChangePriority(event, "sort")
                  }
                  options={sortNumber}
                  isDisabled={isDisabledSordSearch}
                />
              </div>
            </div>
            {Object.keys(listOfAllTasks).length > 0 ? (
              <div className="wrapper-dragdrop">
                <DragDrop
                  handlingRemoval={handlingRemoval}
                  listOfAllTasks={listOfAllTasks}
                  handlingEdit={handlingEdit}
                  handleDragDrop={handleDragDrop}
                />
              </div>
            ) : (
              <div>No data found</div>
            )}
          </SearchSortWrapper>
          {modalVisble && (
            <CreateTaskModal
              modalVisble={modalVisble}
              modalEventHandler={modalEventHandler}
              completeJsonForDisplay={completeJsonForDisplay}
              onChangeDateTime={onChangeDateTime}
              onChangeMessage={onChangeMessage}
              hadleOnChangePriority={hadleOnChangePriority}
              currentListOfUsers={currentListOfUsers}
              title={"Create Task"}
              btnName="Create"
              // currentType={""}
            />
          )}
          {editModalVisible && (
            <CreateTaskModal
              modalVisble={editModalVisible}
              modalEventHandler={editModalSubmitHandler}
              completeJsonForDisplay={completeJsonForDisplay}
              onChangeDateTime={onChangeDateTime}
              onChangeMessage={onChangeMessage}
              hadleOnChangePriority={hadleOnChangePriority}
              currentListOfUsers={currentListOfUsers}
              title={"Edit Task"}
              btnName="Edit"

              // currentType={""}
            />
          )}
        </Container>
      </div>
    </React.Fragment>
  );
  // }
};

export default Home;
