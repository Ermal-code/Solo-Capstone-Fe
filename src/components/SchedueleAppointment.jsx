import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { Row, Col, Form } from "react-bootstrap";
import { addNewAppointment } from "../api/appointmentApi";
import { hoursOfDay, convertToFullDate } from "../helpers/dateHandlers";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import { getHospitalStaff } from "../api/staffMembersApi";
import Toaster from "./Toaster";
import ModalAllowUser from "./ModalAllowUser";

const SchedueleAppointment = ({
  profile,
  doctorAppointments,
  getDoctorAppointments,
}) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [fullDate, setFullDate] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [doctor, setDoctor] = useState("");
  const [staff, setStaff] = useState([]);
  const [reason, setReason] = useState("");
  const [type, setType] = useState("");
  const [toaster, setToaster] = useState(false);
  const [show, setShow] = useState(false);
  const [errors, setErrors] = useState([]);

  const findAllowedUser = () => {
    const allowedUser = user.allowedUsers.find(
      (allowed) => allowed === profile._id
    );

    if (!allowedUser) {
      setShow(true);
    }
  };

  const submitAppointment = async () => {
    setIsSubmiting(true);
    try {
      const body = {
        startDate: fullDate,
        doctor: profile.role === "doctor" ? profile._id : doctor,
        patient: user._id,
        clinic: profile.role === "clinic" ? profile._id : null,
        type: type,
        reason: reason,
      };
      if (!body.clinic) {
        delete body.clinic;
      }

      const response = await addNewAppointment(body);
      if (response.status === 201) {
        setErrors([]);
        setToaster(true);
        getDoctorAppointments();
        setIsSubmiting(false);
        setHour(null);
        findAllowedUser();
        setTimeout(() => {
          setToaster(false);
        }, 4000);
      }
    } catch (error) {
      setIsSubmiting(false);
      if (error.response.status === 400) {
        setToaster(true);
        setErrors(error.response.data.errors);
        setTimeout(() => {
          setToaster(false);
        }, 6000);
      }
    }
  };

  useEffect(() => {
    if (profile.role === "clinic") {
      getHospitalStaff(profile._id, setStaff);
    }
  }, []);

  useEffect(() => {
    setFullDate(convertToFullDate(value, hour));
    setHours(hoursOfDay(value, profile, doctorAppointments));
  }, [value, hour, profile, doctorAppointments]);

  return (
    <div style={{ background: "#ddf4f5" }} className="my-5">
      <ModalAllowUser
        show={show}
        handleClose={() => setShow(false)}
        profileId={profile._id}
      />
      {!user ? (
        <div className="p-4 text-center" style={{ color: "#ff804a" }}>
          <h6>You need to be logged in to make an appointment</h6>
          <button
            onClick={() => history.push(`/login?${history.location.pathname}`)}
            className="orangeButton mb-5 mt-3 w-100"
          >
            Log In
          </button>
        </div>
      ) : (
        user &&
        profile._id !== user._id && (
          <>
            {toaster && (
              <Toaster
                text={
                  errors.length > 0 ? (
                    errors.map((err) => (
                      <p className="text-left mb-1">
                        {err.message}
                        <br />
                      </p>
                    ))
                  ) : (
                    <p className="text-left mb-1">
                      Appointment was successfuly booked
                    </p>
                  )
                }
                color={errors.length > 0 ? "#dc3545" : "#67d6d3"}
              />
            )}

            <div className="mt-5 p-3">
              {profile.role === "clinic" && (
                <Row className="p-3">
                  <Col md="5">
                    <Form.Label>Doctors</Form.Label>
                  </Col>
                  <Col md="7">
                    <Form.Control
                      as="select"
                      onChange={(e) => {
                        setDoctor(e.currentTarget.value);
                      }}
                    >
                      <option value="">Choose doctor</option>
                      {staff.map((member, index) => (
                        <option
                          key={`${member._id}andDoctor${member.doctor._id}${index}`}
                          value={`${member.doctor._id}`}
                        >
                          {member.doctor.name} {member.doctor.surname}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                </Row>
              )}
              <Row className="p-3">
                <Col md="5">
                  <Form.Label>Reason for visit</Form.Label>
                </Col>
                <Col md="7">
                  <Form.Control
                    as="select"
                    onChange={(e) => {
                      setReason(e.currentTarget.value);
                    }}
                  >
                    <option value="">Choose reason</option>
                    {["Check up", "Follow up"].map((reason, index) => (
                      <option
                        key={`${reason}andReason${index}`}
                        value={`${reason}`}
                      >
                        {reason}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
              <Row className="p-3">
                <Col md="5">
                  <Form.Label>Appointment type</Form.Label>
                </Col>
                <Col md="7">
                  <Form.Control
                    as="select"
                    onChange={(e) => {
                      setType(e.currentTarget.value);
                    }}
                  >
                    <option value="">Choose type</option>
                    {["online", "on-site"].map((reason, index) => (
                      <option
                        key={`${reason}andReason${index}`}
                        value={`${reason}`}
                      >
                        {reason}
                      </option>
                    ))}
                  </Form.Control>
                </Col>
              </Row>
            </div>
            <div>
              <div className="mb-3 mt-4 d-flex justify-content-center">
                <Calendar
                  value={value}
                  onChange={setValue}
                  minDate={new Date()}
                />
              </div>

              <Row className="mt-5 mx-1">
                {hours.length === 0 && (
                  <Col xs="12">
                    <h5
                      className="text-center my-5"
                      style={{ color: "#ff804a" }}
                    >
                      <i className="far fa-calendar-times"></i> There are no
                      appointments for this day
                    </h5>
                  </Col>
                )}
                {hours.map((h, index) => (
                  <Col xs={4} sm={3} key={index} className="mb-4 getBiger">
                    <p
                      className={`${
                        h === hour ? "hoursOfDaySelected" : "hoursOfDay"
                      } mb-0`}
                      onClick={() => setHour(h)}
                    >
                      {h}
                    </p>
                  </Col>
                ))}
              </Row>
              {hours.length > 0 && (
                <div className="text-center mt-4">
                  <button
                    onClick={() => submitAppointment()}
                    className="orangeButton w-50 mb-5"
                    disabled={isSubmiting || hour === null}
                  >
                    Book Appointment
                  </button>
                </div>
              )}
            </div>
          </>
        )
      )}
    </div>
  );
};

export default SchedueleAppointment;
