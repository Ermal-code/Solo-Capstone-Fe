import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { Row, Col, Button } from "react-bootstrap";
import { addNewAppointment } from "../api/appointmentApi";
import { hoursOfDay, convertToFullDate } from "../helpers/dateHandlers";
import { useSelector } from "react-redux";

const SchedueleAppointment = ({ profile, doctorAppointments }) => {
  const [value, setValue] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [fullDate, setFullDate] = useState("");
  const user = useSelector((state) => state.user);

  const submitAppointment = async () => {
    try {
      const response = await addNewAppointment({
        startDate: fullDate,
        doctor: profile._id,
        patient: user._id,
        clinic: "6070bf650b1ce657b8807ec8",
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
              <Col xs={4} sm={3} key={index} className="mb-4 getBiger">
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
