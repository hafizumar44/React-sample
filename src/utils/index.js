import dayjs from "dayjs";

// convert the slot config object to available time slots
// although the slots need to be filtered according to the current time of user's time

export const createSlots = (slotConfig) => {
  // Getting values from slotConfig using destructuring
  const {
    configSlotHours,
    configSlotMinutes,
    configSlotPreparation,
    timeArr,
  } = slotConfig;

  // This is the default date that we are using to make use of javascript date functions
  // slotsArray will hold final slots
  // _timeArrStartTime is used to store start time date object from the timeArr
  // _timeArrEndTime is used to store end time date object from the timeArr
  // _tempSlotStartTime is used to create slots by adding config values and check that the time is less than the end time and lies withing the duration specified
  // _startSlot holds value of start date time of slot
  // _endSlot holds value of end date time of slot

  let defaultDate = new Date().toISOString().substring(0, 10);
  let slotsArray = [];
  let _timeArrStartTime;
  let _timeArrEndTime;
  let _tempSlotStartTime;
  let _endSlot;
  let _startSlot;

  // Loop over timeArr
  for (var i = 0; i < timeArr.length; i++) {
    // Creating time stamp using time from timeArr and default date
    _timeArrStartTime = new Date(
      defaultDate + " " + timeArr[i].startTime
    ).getTime();
    _timeArrEndTime = new Date(
      defaultDate + " " + timeArr[i].endTime
    ).getTime();
    _tempSlotStartTime = _timeArrStartTime;

    // Loop around till _tempSlotStartTime is less end time from timeArr
    while (
      new Date(_tempSlotStartTime).getTime() <
      new Date(_timeArrEndTime).getTime()
    ) {
      _endSlot = new Date(_tempSlotStartTime);
      _startSlot = new Date(_tempSlotStartTime);

      //Adding minutes and hours from config to create slot and overiding the value of _tempSlotStartTime
      _tempSlotStartTime = _endSlot.setHours(
        parseInt(_endSlot.getHours()) + parseInt(configSlotHours)
      );
      _tempSlotStartTime = _endSlot.setMinutes(
        parseInt(_endSlot.getMinutes()) + parseInt(configSlotMinutes)
      );

      // Check _tempSlotStartTime is less than end time after adding minutes and hours, if true push into slotsArr
      if (
        new Date(_tempSlotStartTime).getTime() <=
        new Date(_timeArrEndTime).getTime()
      ) {
        // DateTime object is converted to time with the help of javascript functions
        // If you want 24 hour format you can pass hour12 false
        slotsArray.push({
          timeSlotStart: new Date(_startSlot).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
          timeSlotEnd: _endSlot.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          }),
        });
      }

      //preparation time is added in last to maintain the break period
      _tempSlotStartTime = _endSlot.setMinutes(
        _endSlot.getMinutes() + parseInt(configSlotPreparation)
      );
    }
  }

  return slotsArray;
};

// convert hh:mm:ss time string to minutes
export const toMinutes = (time = "00:00:00") => {
  // got this code from stackoverflow
  // don't trust this one whewww

  // your input string 01:00:00
  let a = time.split(":"); // split it at the colons

  // Hours are worth 60 minutes.
  let minutes = +a[0] * 60 + +a[1];

  return minutes.toString();
};

export const formatTime = (date = "00:00:00", format = false) => {
  let d = new Date();
  let [hours, minutes, seconds] = date.split(":");
  d.setHours(+hours); // Set the hours, using implicit type coercion
  d.setMinutes(minutes); // You can pass Number or String. It doesn't really matter
  d.setSeconds(seconds);
  if (format) {
    return d.toString();
  }
  if (+hours === 1 && +minutes === 0) {
    return dayjs(d).format("h") + " hr";
  } else if (+hours > 0 && +minutes === 0) {
    return dayjs(d).format("h") + " hr";
  } else if (+hours > 0 && +minutes > 0) {
    return dayjs(d).format("h:mm") + " min";
  } else {
    return dayjs(d).format("mm") + " mins";
  }
};

export const convertTime = (time12h) => {
  const [time, modifier] = time12h.split(" ");

  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = parseInt(hours, 10) + 12;
  }

  return `${hours}:${minutes}`;
};
