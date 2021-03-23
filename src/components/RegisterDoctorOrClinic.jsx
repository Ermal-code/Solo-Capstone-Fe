import React, { useState } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Form, Col, Row, Button, FormControl } from "react-bootstrap";

const RegisterDoctorOrClinic = () => {
  const [roleType, setRoleType] = useState({ role: "", isTrue: false });
  return (
    <Row>
      <Col md={{ span: 6, offset: 3 }}>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
            birthdate: "",
            workingHours: [{ day: "", startHour: "", endHour: "" }],
            specialization: [],
            clinicOrHospital: "",
          }}
          onSubmit={(data) => {
            console.log("submit: ", data);
          }}
        >
          {({ values, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Row className="align-items-center mb-4">
                <Col md={3}>
                  <Form.Label> Select type of user</Form.Label>
                </Col>
                <Col md={3}>
                  <Form.Control
                    name="role"
                    as="select"
                    onChange={(e) => {
                      setRoleType({
                        role: e.currentTarget.value,
                        isTrue: e.currentTarget.value !== "0" ? true : false,
                      });
                    }}
                  >
                    <option value="0">Choose type</option>
                    <option value="doctor">Doctor</option>
                    <option value="clinic">Clinic/Hospital</option>
                  </Form.Control>
                </Col>
              </Form.Row>
              {roleType.isTrue && (
                <>
                  <Form.Row>
                    <Form.Group as={Col} md="5">
                      <Form.Label>First Name</Form.Label>
                      <Field
                        placeholder="Type your first Name"
                        name="name"
                        type="text"
                        as={Form.Control}
                      />
                    </Form.Group>
                    {roleType.role === "doctor" && (
                      <Form.Group as={Col} md="5">
                        <Form.Label>Last Name</Form.Label>
                        <Field
                          placeholder="Type your last Name"
                          name="surname"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                    )}
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="5">
                      <Form.Label>Email</Form.Label>
                      <Field
                        placeholder="Type your email"
                        name="email"
                        type="email"
                        as={Form.Control}
                      />
                    </Form.Group>

                    <Form.Group as={Col} md="5">
                      <Form.Label>Password</Form.Label>
                      <Field
                        placeholder="Type your password"
                        name="password"
                        type="password"
                        as={Form.Control}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="5">
                      <Form.Label>Phone</Form.Label>
                      <Field
                        placeholder="Type your phone number"
                        name="phone"
                        type="text"
                        as={Form.Control}
                      />
                    </Form.Group>
                  </Form.Row>
                  {roleType.role === "doctor" && (
                    <>
                      <Form.Row>
                        <Form.Group as={Col} md="6">
                          <Form.Label>Gender</Form.Label>
                          <div className="d-flex justify-content-between">
                            <Field
                              name="gender"
                              type="radio"
                              as={Form.Check}
                              value="male"
                              label="Male"
                            />
                            <Field
                              name="gender"
                              type="radio"
                              as={Form.Check}
                              value="female"
                              label="Female"
                            />
                            <Field
                              name="gender"
                              type="radio"
                              as={Form.Check}
                              value="non-binary"
                              label="Non-binary"
                            />
                          </div>
                        </Form.Group>
                      </Form.Row>
                      <Form.Row>
                        <Form.Group as={Col} md="7">
                          <Form.Label className="mr-3">Birthdate</Form.Label>
                          <Field name="birthdate" type="date" />
                        </Form.Group>
                      </Form.Row>
                    </>
                  )}
                  <Form.Row>
                    <Form.Group as={Col} md="10">
                      <Form.Label className="mr-5">
                        Select working days and hours
                      </Form.Label>

                      <FieldArray name="workingHours">
                        {(arrayHelpers) => (
                          <>
                            <Button
                              variant="outline-dark"
                              onClick={() =>
                                arrayHelpers.push({
                                  day: "Monday",
                                  startHour: "",
                                  endHour: "",
                                })
                              }
                            >
                              Add working days
                            </Button>
                            {values.workingHours.map((hour, index) => {
                              return (
                                <div
                                  key={`${hour}${index}`}
                                  className="d-flex justify-content-between align-items-center mt-3"
                                >
                                  <div>
                                    <Form.Label>Select day</Form.Label>
                                    <Field
                                      name={`workingHours.${index}.day`}
                                      as="select"
                                      className="form-control"
                                    >
                                      {[
                                        "Monday",
                                        "Tuesday",
                                        "Wednesday",
                                        "Thursday",
                                        "Friday",
                                        "Saturday",
                                        "Sunday",
                                      ].map((day, index) => (
                                        <option
                                          key={`${day}and${index}`}
                                          value={day}
                                        >
                                          {day}
                                        </option>
                                      ))}
                                    </Field>
                                  </div>
                                  <div>
                                    <Form.Label>Select opening hour</Form.Label>
                                    <div>
                                      <Field
                                        type="time"
                                        name={`workingHours.${index}.startHour`}
                                      ></Field>
                                    </div>
                                  </div>
                                  <div>
                                    <Form.Label>Select closing hour</Form.Label>
                                    <div>
                                      <Field
                                        type="time"
                                        name={`workingHours.${index}.endHour`}
                                      ></Field>
                                    </div>
                                  </div>
                                  <Button
                                    variant="outline-danger"
                                    className="mt-4"
                                    onClick={() => arrayHelpers.remove(index)}
                                  >
                                    X
                                  </Button>
                                </div>
                              );
                            })}
                          </>
                        )}
                      </FieldArray>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} md="10">
                      <Form.Label className="mr-5">
                        Select specializations
                      </Form.Label>
                      <FieldArray name="specialization">
                        {(arrayHelpers) => (
                          <>
                            {values.specialization.map((element, index) => (
                              <div
                                className="d-flex justify-content-between align-items-center mb-3"
                                key={`${element}${index}`}
                              >
                                <Field
                                  name={`specialization.${index}`}
                                  as="select"
                                  className="form-control w-50 "
                                >
                                  {["Cardiolog", "Neurolog"].map(
                                    (day, index) => (
                                      <option
                                        key={`${day}and${index}`}
                                        value={day}
                                      >
                                        {day}
                                      </option>
                                    )
                                  )}
                                </Field>
                                <Button
                                  variant="outline-danger"
                                  onClick={() => arrayHelpers.remove(index)}
                                >
                                  X
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline-dark"
                              onClick={() => arrayHelpers.push("")}
                            >
                              Add specialization
                            </Button>
                          </>
                        )}
                      </FieldArray>
                    </Form.Group>
                  </Form.Row>
                </>
              )}
              <pre>{JSON.stringify(values, null, 2)}</pre>
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default RegisterDoctorOrClinic;
