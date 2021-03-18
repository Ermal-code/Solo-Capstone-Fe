import moment from "moment";

const howManyHours = (firstHour, secondHour) => {
  let startHour = new Date(firstHour);
  let endHour = new Date(secondHour);

  const diffTime = Math.abs(endHour - startHour);
  const diffHours = Math.ceil(diffTime / (1000 * 60 * 60));
  return diffHours;
};

export const convertToFullDate = (value, hour) => {
  let date = moment(value).format("LL");

  return date + " " + hour;
};

export const hoursOfDay = (value, doctor, doctorAppointments) => {
  const dayOfTheWeek = doctor
    ? doctor.workingHours.filter(
        (day) => day.day === moment(value).format("dddd")
      )
    : [];

  if (dayOfTheWeek.length > 0) {
    const startHour = convertToFullDate(value, dayOfTheWeek[0].startHour);

    const endHour = convertToFullDate(value, dayOfTheWeek[0].endHour);

    const workingHours = howManyHours(startHour, endHour);

    let startingHour = moment(startHour).format("LT");

    let addHalfHour = moment(startHour).add(30, "minutes");

    let arr = [startingHour.toString()];

    for (let i = 0; i < workingHours * 2; i++) {
      let hour = moment(addHalfHour).format("LT");
      arr.push(hour.toString());
      addHalfHour = moment(addHalfHour).add(30, "minutes");
    }

    const selectedDayAppointments = doctorAppointments
      .filter(
        (appointment) =>
          moment(appointment.startDate).format("LL") ===
          moment(value).format("LL")
      )
      .map((appointment) => moment(appointment.startDate).format("LT"));

    if (selectedDayAppointments.length > 0) {
      arr = arr.filter(
        (appointment) => !selectedDayAppointments.includes(appointment)
      );
    }

    return arr;
  } else {
    return [];
  }
};
