import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "./calendar.css";
import moment from "moment";
import { Row, Col } from "react-bootstrap";

const SchedueleAppointment = () => {
  const hoursOfDay = () => {
    let date1 = moment("March 16, 2021 9:00").format("LT");

    let newDate = moment("March 16, 2021 9:00").add(30, "minutes");

    let arr = [date1.toString()];
    for (let i = 0; i < 18; i++) {
      let date = moment(newDate).format("LT");
      arr.push(date.toString());
      newDate = moment(newDate).add(30, "minutes");
    }
    return arr;
  };
  const fullDate = () => {
    let date1 = moment(value).format("LL");

    return date1 + " " + hour;
  };
  const [value, setValue] = useState(new Date());
  const [hours, setHours] = useState(hoursOfDay);
  const [hour, setHour] = useState(hours[0]);
  const [hoursDate, setHoursDate] = useState(fullDate);

  useEffect(() => {
    setHoursDate(fullDate);
  }, [value, hour]);

  return (
    <div>
      <Calendar value={value} onChange={setValue} />
      {moment(value).format("LL")}
      <br />
      <Row>
        {hours.map((h, index) => (
          <Col md={3} key={index} className="mb-4 getBiger">
            <p className="hoursOfDay" onClick={() => setHour(h)}>
              {h}
            </p>
          </Col>
        ))}
      </Row>
      <br />
      {hoursDate}
      <br />
      {moment(`${hoursDate}`).format()}
    </div>
  );
};

export default SchedueleAppointment;
