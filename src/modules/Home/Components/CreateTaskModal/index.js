import React from "react";
import DateTime from "../../../../components/DateTime";
import ModalWrapper from "../../../../components/ModalWrapper";
import Select from "../../../../components/Select";

const CreateTaskModal = ({
  modalVisble,
  modalEventHandler,
  completeJsonForDisplay,
  onChangeDateTime,
  onChangeMessage,
  hadleOnChangePriority,
  currentListOfUsers,
  title,
  btnName,
}) => {
  let prioritySet = [
    { id: "1", name: "Low", value: "low" },
    { id: "2", name: "Medium", value: "medium" },
    { id: "3", name: "High", value: "high" },
  ];
  let prioritySetFind = completeJsonForDisplay.priority;
  if (typeof completeJsonForDisplay.priority === "string") {
    prioritySetFind = prioritySet?.find(
      (obj) => obj.id === completeJsonForDisplay.priority
    );
  }
  let detailCustomerName = completeJsonForDisplay.assigned_to;
  if (typeof completeJsonForDisplay.assigned_to === "string") {
    detailCustomerName = currentListOfUsers?.find(
      (obj) => obj.id === completeJsonForDisplay.assigned_to
    );
  }

  completeJsonForDisplay = {
    ...completeJsonForDisplay,
    priority: prioritySetFind,
    assigned_to: detailCustomerName,
  };
  return (
    <ModalWrapper
      modalEventHandler={() => modalEventHandler("enable")}
      modalVisble={modalVisble}
      outerClick={false}
      onSubmit={() => modalEventHandler("submit", completeJsonForDisplay)}
      heading={title}
      btnName={btnName}
      classNameBody="modal-wrapper-body"
    >
      <div className="form-group">
        <label>Select Due-date :</label>
        <DateTime
          className="form-control"
          value={completeJsonForDisplay?.due_date}
          onChange={onChangeDateTime}
          showTime={true}
          placeHolder="Please select Date and Time"
        />
      </div>
      <div className="form-group">
        <label>Message :</label>
        <input
          className="form-control"
          onChange={onChangeMessage}
          value={
            completeJsonForDisplay?.message === undefined
              ? ""
              : completeJsonForDisplay?.message
          }
        />
      </div>
      <div className="form-group">
        <label>Priority :</label>
        <Select
          currentSelected={completeJsonForDisplay?.priority}
          handleOnChange={(event) => hadleOnChangePriority(event, "priority")}
          options={prioritySet}
        />
      </div>
      <div className="form-group">
        <label>Assigned :</label>
        <Select
          currentSelected={completeJsonForDisplay?.assigned_to}
          handleOnChange={(event) => hadleOnChangePriority(event, "assigned")}
          options={currentListOfUsers}
        />
      </div>
    </ModalWrapper>
  );
};

export default CreateTaskModal;
