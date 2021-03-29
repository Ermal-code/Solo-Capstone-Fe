import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { Row, Col, Button } from "react-bootstrap";
import { addNewAppointment } from "../api/appointmentApi";
import { hoursOfDay, convertToFullDate } from "../helpers/dateHandlers";

const SchedueleAppointment = ({ profile, doctorAppointments }) => {
  const [value, setValue] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [fullDate, setFullDate] = useState("");

  const submitAppointment = async () => {
    try {
      const response = await addNewAppointment({
        startDate: fullDate,
        doctor: "604ba7e31a95b940948ae915",
        patient: "604ba8a9674a9f4eb8625da8",
        type: "online",
        reason: "Follow up",
      });
      if (response.status === 201) {
        console.log(response);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    setFullDate(convertToFullDate(value, hour));
    setHours(hoursOfDay(value, profile, doctorAppointments));
  }, [value, hour, profile]);

  return (
    <>
      <div className="mt-5">
        <div className="mb-3 d-flex justify-content-center">
          <Calendar value={value} onChange={setValue} minDate={new Date()} />
        </div>

        <div>
          <Row>
            {hours.map((h, index) => (
              <Col md={3} key={index} className="mb-4 getBiger">
                <p className="hoursOfDay mb-0" onClick={() => setHour(h)}>
                  {h}
                </p>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <Button onClick={() => submitAppointment()}>Submit</Button>
    </>
  );
};

export default SchedueleAppointment;
