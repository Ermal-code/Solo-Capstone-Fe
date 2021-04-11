import React, { useState, useEffect } from "react";
import "react-calendar/dist/Calendar.css";
import Calendar from "react-calendar";
import { Row, Col } from "react-bootstrap";
import { addNewAppointment } from "../api/appointmentApi";
import { hoursOfDay, convertToFullDate } from "../helpers/dateHandlers";
import { useSelector } from "react-redux";
import { isLoggedIn } from "../helpers/helperFuctions";
import { useHistory } from "react-router";

const SchedueleAppointment = ({ profile, doctorAppointments }) => {
  const history = useHistory();
  const user = useSelector((state) => state.user);
  const [value, setValue] = useState(new Date());
  const [hours, setHours] = useState([]);
  const [hour, setHour] = useState(null);
  const [fullDate, setFullDate] = useState("");
  const [showMore, setShowMore] = useState(false);

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
    <div style={{ background: "#ddf4f5" }} className="my-5">
      {isLoggedIn() === "false" ? (
        <div className="p-4 text-center" style={{ color: "#ff804a" }}>
          <h6>You need to be Loged in to make an appointment</h6>
          <button
            onClick={() => history.push("/Login")}
            className="orangeButton mb-5 mt-3"
          >
            Log In
          </button>
        </div>
      ) : (
        <>
          <div>
            <div className="mb-3 d-flex justify-content-center">
              <Calendar
                value={value}
                onChange={setValue}
                minDate={new Date()}
              />
            </div>

            <Row className="mt-5 mx-1">
              {hours.length === 0 && (
                <Col xs="12">
                  <h5 className="text-center my-5" style={{ color: "#ff804a" }}>
                    <i className="far fa-calendar-times"></i> There are no
                    appointments for this day
                  </h5>
                </Col>
              )}
              {hours.map((h, index) => (
                <Col
                  xs={4}
                  sm={3}
                  key={index}
                  className="mb-4 getBiger"
                  style={{
                    display: !showMore && index > 3 ? "none" : "block",
                  }}
                >
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
              <Col xs="12">
                <div className="text-center">
                  <i
                    className={`fas fa-chevron-${
                      !showMore ? "down" : "up"
                    } fa-2x`}
                    onClick={() => setShowMore(!showMore)}
                  ></i>
                </div>
              </Col>
            </Row>
          </div>

          {hours.length > 0 && (
            <div className="text-center mt-4">
              <button
                onClick={() => submitAppointment()}
                className="orangeButton w-50 mb-5"
              >
                Submit
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default SchedueleAppointment;
