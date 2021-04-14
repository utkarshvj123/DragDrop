import React from "react";

const Select = ({ currentSelected, handleOnChange, options }) => {
  const gettingChangedvalue = (event) => {
    debugger;
    const findedvalue = options.find((film) => film.id == event.target.value);
    handleOnChange(findedvalue);
  };

  const insert = (arr, index, newItem) => [
    // part of the array before the specified index
    ...arr.slice(0, index),
    // inserted item
    newItem,
    // part of the array after the specified index
    ...arr.slice(index),
  ];
  let dataNewvalue = [...options];
  const result = insert(dataNewvalue, 0, {
    name: "Select",
    id: options.length + 2,
  });
  // dataNewvalue = dataNewvalue.splice(0, 0, {
  //   name: "Select",
  //   id: options.length + 2,
  // });
  console.log(
    dataNewvalue,
    ".....currentSelected?.id..",
    options,
    ".....result....",
    result
  );
  return (
    <select
      className="form-control"
      value={
        currentSelected?.id !== undefined ? currentSelected?.id : result[0]?.id
      }
      onChange={gettingChangedvalue}
      placeholder="select"
    >
      {result.map((res) => (
        <option
          key={res.id}
          value={res.id}
          disabled={res?.name === "Select" ? true : false}
        >
          {res?.name}
        </option>
      ))}
    </select>
  );
};
export default Select;
