import React, { useState, useEffect } from "react";
import { Row, Col, Form, Spinner } from "react-bootstrap";
import { getDoctorOrClinicAppointments } from "../api/appointmentApi";
import { useSelector } from "react-redux";
import moment from "moment";

const Appointments = ({ match, history }) => {
  const user = useSelector((state) => state.user);
  const [loader, setLoader] = useState(true);
  const [doctorAppointments, setDoctorAppointments] = useState([]);
  const [dropDownValue, setDropDownValue] = useState("Upcoming");
  const [links, setLinks] = useState(null);
  const [url, setUrl] = useState(
    `/doctorOrClinicAppointments/${match.params.id}/${dropDownValue}?limit=10&offset=0`
  );

  const getDoctorAppointments = async () => {
    try {
      setLoader(true);
      const response = await getDoctorOrClinicAppointments(url);

      if (response.statusText === "OK") {
        setDoctorAppointments(response.data.appointments);
        setLinks(response.data.links);
        setLoader(false);
      }
    } catch (error) {
      setDoctorAppointments([]);
      setLinks(null);
      setLoader(false);

      if (error.response.status === 403) {
        history.push("/");
      }
    }
  };

  useEffect(() => {
    getDoctorAppointments();
  }, [url]);

  return (
    <div
      style={{ background: "white", minHeight: "90vh" }}
      className="px-5 py-3"
    >
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
                  `/doctorOrClinicAppointments/${match.params.id}/${e.currentTarget.value}?limit=10&offset=0`
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
        ) : doctorAppointments.length > 0 ? (
          <div>
            <table className="w-100 appointmentTable">
              <thead className="text-center">
                <tr>
                  <th>Patient</th>
                  <th>Type</th>
                  <th>Reason</th>
                  <th>Start Time</th>
                  <th>End Time</th>
                  <th className="d-none d-sm-block">
                    {user && user.role === "doctor"
                      ? "Hospital/Clinic"
                      : "Doctor"}
                  </th>
                </tr>
              </thead>

              <tbody>
                {doctorAppointments.map((appointment, index) => (
                  <tr
                    key={`${appointment._id}and${index}`}
                    className="text-center"
                  >
                    <td>
                      {appointment.patient.name} {appointment.patient.surname}
                    </td>
                    <td>{appointment.type}</td>
                    <td>{appointment.reason}</td>
                    <td>
                      {moment(appointment.startDate).format(
                        "MMMM Do YYYY, HH:mm"
                      )}
                    </td>
                    <td>
                      {moment(appointment.endDate).format(
                        "MMMM Do YYYY, HH:mm"
                      )}
                    </td>

                    <td className="d-none d-sm-block">
                      {user && user.role === "doctor"
                        ? appointment.clinic
                          ? appointment.clinic.name
                          : "-"
                        : appointment.doctor.name}
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
    </div>
  );
};

export default Appointments;
