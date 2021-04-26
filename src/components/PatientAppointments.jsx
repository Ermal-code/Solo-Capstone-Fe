import React, { useEffect, useState } from "react";
import { getPatientAppointments } from "../api/appointmentApi";
import moment from "moment";
import { Col, Form, Row, Spinner } from "react-bootstrap";

const PatientAppointments = () => {
  const [patientAppointments, setPatientAppointments] = useState([]);
  const [loader, setLoader] = useState(true);
  const [dropDownValue, setDropDownValue] = useState("Upcoming");
  const [links, setLinks] = useState(null);
  const [url, setUrl] = useState(
    `/patientAppointments/${dropDownValue}?limit=10&offset=0`
  );

  useEffect(() => {
    getPatientAppointments(setPatientAppointments, setLinks, url, setLoader);
  }, [url]);

  return (
    <div className="mb-5">
      <Row className="my-5">
        <Col xs={6} md="4" lg="3">
          <Form.Label>Filter appointments</Form.Label>
        </Col>
        <Col xs={6} md="5" lg="4">
          <Form.Control
            as="select"
            value={dropDownValue}
            onChange={(e) => {
              setUrl(
                `/patientAppointments/${e.currentTarget.value}?limit=10&offset=0`
              );
              setDropDownValue(e.currentTarget.value);
            }}
          >
            {["Upcoming", "Past", "All"].map((element, index) => (
              <option key={`${element}and${index}`}>{element}</option>
            ))}
          </Form.Control>
        </Col>
      </Row>
      {loader ? (
        <div className="w-100 h-100 d-flex justify-content-center align-items-center">
          <Spinner variant="primary" animation="border" />
        </div>
      ) : patientAppointments.length > 0 ? (
        <div>
          <table className="w-100 appointmentTable">
            <thead className="text-center">
              <tr>
                <th>Doctor</th>
                <th>Type</th>
                <th>Reason</th>
                <th>Start Time</th>
                <th>End Time</th>
                <th className="d-none d-sm-block">Hospital/Clinic</th>
              </tr>
            </thead>

            <tbody>
              {patientAppointments.map((appointment, index) => (
                <tr
                  key={`${appointment._id}and${index}`}
                  className="text-center"
                >
                  <td>
                    {appointment.doctor.name} {appointment.doctor.surname}
                  </td>
                  <td>{appointment.type}</td>
                  <td>{appointment.reason}</td>
                  <td>
                    {moment(appointment.startDate).format(
                      "MMMM Do YYYY, HH:mm"
                    )}
                  </td>
                  <td>
                    {moment(appointment.endDate).format("MMMM Do YYYY, HH:mm")}
                  </td>

                  <td className="d-none d-sm-block">
                    {appointment.clinic ? appointment.clinic.name : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {links && (
            <div className="d-flex justify-content-between mt-3">
              <button
                className="blueButtonV2"
                onClick={() => setUrl(links.prev)}
                style={{
                  visibility: links.hasOwnProperty("first")
                    ? "visible"
                    : "hidden",
                }}
              >
                Previous
              </button>
              <button
                className="blueButtonV2"
                onClick={() => setUrl(links.next)}
                style={{
                  visibility: links.hasOwnProperty("last")
                    ? "visible"
                    : "hidden",
                }}
              >
                Next
              </button>
            </div>
          )}
        </div>
      ) : (
        <div
          className="d-flex justify-content-center align-items-start h-100 "
          style={{ color: "#ff804a" }}
        >
          <h3>
            <i className="far fa-calendar-times"></i> You have no appointments
          </h3>
        </div>
      )}
    </div>
  );
};

export default PatientAppointments;
