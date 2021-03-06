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

export const handlingDrapAndDropUntillApiResponse = (
  array1,
  array2,
  olderArray
) => {
  return {
    low: array1?.result?.priorityLow,
    medium: array1?.result?.priorityMedium,
    high: array1?.result?.priorityHigh,
    dueDatedArray: array2,
    clonedData: olderArray,
  };
};

export const creatingRequiredDataFormat = (array, searchValue, olderArray) => {
  let _users = array;
  let search = searchValue.trim().toLowerCase();
  if (search.length > 0) {
    _users = _users.filter(function (user) {
      return user.assigned_name.toLowerCase().match(search);
    });
  }

  let array1 = [];
  let array2 = [];
  let array3 = [];
  let completeArray = [];

  _users.filter((obj) => {
    const newDate = new Date(obj.due_date);
    obj = { ...obj, due_date: newDate };
    completeArray.push(obj);
    if (obj.priority === "1") {
      array1.push(obj);
    } else if (obj.priority === "2") {
      array2.push(obj);
    } else if (obj.priority === "3") {
      array3.push(obj);
    }
  });

  return {
    low: array1,
    medium: array2,
    high: array3,
    dueDatedArray: completeArray,
    clonedData: olderArray,
  };
};

export const mappingDataWithUserDetail = (
  smallerArray,
  biggerArray,
  sortedName
) => {
  let array1 = [];
  let array2 = [];
  let array3 = [];
  let completeArray = [];
  let requiredData = {};
  smallerArray.filter((obj) => {
    biggerArray.filter((obj2) => {
      if (obj2.assigned_to === obj.id) {
        let newObj = {
          ...obj2,
          ...obj,
          id: obj2.id,
          due_date: new Date(obj2.due_date),
        };
        completeArray.push(newObj);
        if (obj2.priority === "1") {
          array1.push(newObj);
        } else if (obj2.priority === "2") {
          array2.push(newObj);
        } else if (obj2.priority === "3") {
          array3.push(newObj);
        }
      }
    });
  });
  if (sortedName === "") {
    requiredData = {
      low: array1,
      medium: array2,
      high: array3,
      dueDatedArray: completeArray,
      clonedData: completeArray,
    };
  } else {
    const data = {
      low: array1,
      medium: array2,
      high: array3,
      dueDatedArray: completeArray,
      clonedData: completeArray,
    };
    requiredData = objectCreationAfterSort(data, sortedName);
    // {
    //   low: objectCreationAfterSort(array1, sortedName),
    //   medium: objectCreationAfterSort(array2, sortedName),
    //   high: objectCreationAfterSort(array3),
    //   dueDatedArray: objectCreationAfterSort(completeArray, sortedName),
    //   clonedData: objectCreationAfterSort(completeArray, sortedName),
    // };
  }
  return requiredData;
};

export const objectCreationAfterSort = (objectValue, sortName) => {
  const cloneDataObj = { ...objectValue };
  let newerObj = {};
  if (cloneDataObj.length === undefined) {
    newerObj = {
      low: sortData(cloneDataObj.low, sortName),
      medium: sortData(cloneDataObj.medium, sortName),
      high: sortData(cloneDataObj.high, sortName),
      dueDatedArray: sortData(cloneDataObj.dueDatedArray, sortName),
      clonedData: sortData(cloneDataObj.clonedData, sortName),
    };
  } else if (cloneDataObj.length > 0) {
    newerObj = sortData(cloneDataObj.low, sortName);
  }
  return newerObj;
};

export const sortData = (allData, sortName) => {
  if (sortName === "due_date") {
    return allData.sort(function (a, b) {
      return a[sortName] - b[sortName];
    });
  } else {
    return allData.sort((data1, data2) => {
      return compareObjects(data1, data2, sortName);
    });
  }
};

const compareObjects = (object1, object2, key) => {
  const obj1 = object1[key].toUpperCase();
  const obj2 = object2[key].toUpperCase();

  if (obj1 < obj2) {
    return -1;
  }
  if (obj1 > obj2) {
    return 1;
  }
  return 0;
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
