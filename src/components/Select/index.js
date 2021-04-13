import React from "react";

const Select = ({ currentSelected, handleOnChange, options }) => {
  const gettingChangedvalue = (event) => {
    const findedvalue = options.find((film) => film.id == event.target.value);
    handleOnChange(findedvalue);
  };

  return (
    <select
      className="form-control"
      value={currentSelected?.id}
      onChange={gettingChangedvalue}
    >
      {options.map((res) => (
        <option
          key={res.id}
          value={res.id}
          //   selected={res.id === currentSelected.id}
        >
          {res?.name}
        </option>
      ))}
    </select>
  );
};
export default Select;
