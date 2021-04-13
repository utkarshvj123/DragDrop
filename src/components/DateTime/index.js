import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
const DateTime = ({ onChange, value, showTime, placeHolder }) => {
  let handleColor = (time) => {
    return time.getHours() > 12 ? "text-success" : "text-error";
  };
  return (
    <DatePicker
      showTimeSelect={showTime}
      selected={value}
      onChange={(date) => onChange(date)}
      timeClassName={handleColor}
      placeholderText={placeHolder}
    />
  );
};

export default DateTime;
