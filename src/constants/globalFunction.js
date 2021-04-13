export const requiredDateTimeFormat = (date, timeStatus) => {
  const newFormat = {
    mm: date.getMonth() + 1,
    dd: date.getDate(),
    yy: date.getFullYear().toString().slice(-2),
    yyyy: date.getFullYear(),
  };
  const qwerty = new Date(date).toLocaleTimeString("en-US", {
    hour12: false,
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });
  const newFormat2 = `${newFormat.yyyy}-${
    newFormat.mm > 9 ? newFormat.mm : "0" + newFormat.mm
  }-${newFormat.dd > 9 ? newFormat.dd : "0" + newFormat.dd} ${qwerty}`;
  return newFormat2;
};

export const creatingRequiredDataFormat = (array) => {
  let array1 = [];
  let array2 = [];
  let array3 = [];

  array.filter((obj) => {
    const newDate = new Date(obj.due_date);
    if (obj.priority === "1") {
      array1.push({ ...obj, due_date: newDate });
    } else if (obj.priority === "2") {
      array2.push({ ...obj, due_date: newDate });
    } else if (obj.priority === "3") {
      array3.push({ ...obj, due_date: newDate });
    }
  });
  return {
    low: array1,
    medium: array2,
    high: array3,
  };
};
export const requiredData = (array) => {
  array.forEach((object) => {
    if (object.name || object.count) {
      object["label"] = capitalizeFirstLetter(object.name);
      object["value"] = object.count;
    }
  });
  return {
    type: "column2d",
    width: 800,
    height: 400,
    dataFormat: "json",
    dataSource: {
      chart: {
        caption: "Stack Exchange",
        // subCaption: "",
        xAxisName: "Language",
        yAxisName: "Counts",
        numberSuffix: "K",
        theme: "fusion",
      },
      data: array,
    },
  };
};

function capitalizeFirstLetter(string) {
  var b = string.split("-");
  let newString;
  if (b === -1) {
    newString = string;
  } else {
    let c = b.join(" ");
    newString = c;
  }
  return newString.charAt(0).toUpperCase() + newString.slice(1);
}
