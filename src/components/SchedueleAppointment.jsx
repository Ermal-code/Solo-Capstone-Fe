import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import "./calendar.css";
// import moment from "moment";
import { Row, Col, Container, Button } from "react-bootstrap";
import {
  addNewAppointment,
  getDoctorOrClinicAppointments,
} from "../api/appointmentApi";
import { getUserById } from "../api/usersApi";
import { hoursOfDay, convertToFullDate } from "../helpers/dateHandlers";

const SchedueleAppointment = () => {
  const [doctor, setDoctor] = useState(null);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
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

  const getDoctorAppointments = async () => {
    try {
      const response = await getDoctorOrClinicAppointments(
        "604ba7e31a95b940948ae915"
      );
      if (response.statusText === "OK") {
        const appointments = response.data;
        setDoctorAppointments(appointments);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  const getDoctor = async () => {
    try {
      const response = await getUserById("604ba7e31a95b940948ae915");
      if (response.statusText === "OK") {
        const doctor = response.data;
        setDoctor(doctor);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getDoctor();
    getDoctorAppointments();
  }, []);

  useEffect(() => {
    setFullDate(convertToFullDate(value, hour));
    setHours(hoursOfDay(value, doctor, doctorAppointments));
  }, [value, hour, doctor]);

  return (
    <Container>
      <Row className="mt-5">
        <Col md={5}>
          <Calendar value={value} onChange={setValue} minDate={new Date()} />
        </Col>

        <Col md={7}>
          <Row>
            {hours.map((h, index) => (
              <Col md={3} key={index} className="mb-4 getBiger">
                <p className="hoursOfDay mb-0" onClick={() => setHour(h)}>
                  {h}
                </p>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Button onClick={() => submitAppointment()}>Submit</Button>
    </Container>
  );
};

export default SchedueleAppointment;
