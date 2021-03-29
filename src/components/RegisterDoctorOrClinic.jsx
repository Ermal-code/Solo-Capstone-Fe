import React, { useEffect, useState } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Form, Col, Row, Button } from "react-bootstrap";
import { registerUser } from "../api/usersApi";
import { getSpecializations } from "../api/specializationApi";

const RegisterDoctorOrClinic = () => {
  const [roleType, setRoleType] = useState({ role: "", isTrue: false });
  const [specializationList, setSpecializationList] = useState([]);
  const [registerErrors, setRegisterErrors] = useState([]);

  const fetchSpecializations = async () => {
    try {
      const response = await getSpecializations();
      if (response.statusText === "OK") {
        setSpecializationList(response.data);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);

  return (
    <Row>
      <Col
        sm={{ span: 10, offset: 1 }}
        md={{ span: 8, offset: 2 }}
        lg={{ span: 6, offset: 3 }}
      >
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            phone: "",
            gender: null,
            birthdate: "",
            workingHours: [{ day: "Monday", startHour: "", endHour: "" }],
            specialization: [""],
            clinicOrHospital: "",
          }}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);
              if (roleType.role === "clinic") {
                delete data.surname;
                delete data.gender;
                delete data.birthdate;
                delete data.clinicOrHospital;
              }
              if (data.gender === null) delete data.gender;

              data.role = roleType.role;

              const response = await registerUser(data);

              if (response.status === 201) {
                const data = response.data;
                console.log(data);
                setSubmitting(false);
                resetForm();
              }
            } catch (error) {
              console.log(error.response.data);
              const errors = error.response.data;
              setRegisterErrors(errors);
              console.log(registerErrors);
            }
          }}
        >
          {({ values, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Form.Row className="align-items-center mb-4">
                <Col xs={5} sm={3}>
                  <Form.Label> Select type of user</Form.Label>
                </Col>
                <Col xs={6} sm={4}>
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
                    <Form.Group as={Col} xs={10} sm="5">
                      <Form.Label>
                        {roleType.role === "doctor" ? "First name" : "Name"}
                      </Form.Label>
                      <Field
                        placeholder={`Type your ${
                          roleType.role === "doctor" ? "first name" : "name"
                        }`}
                        name="name"
                        type="text"
                        as={Form.Control}
                      />
                    </Form.Group>
                    {roleType.role === "doctor" && (
                      <Form.Group as={Col} xs={10} sm="5">
                        <Form.Label>Last name</Form.Label>
                        <Field
                          placeholder="Type your last name"
                          name="surname"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                    )}
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} xs={10} sm="5">
                      <Form.Label>Email</Form.Label>
                      <Field
                        placeholder="Type your email"
                        name="email"
                        type="email"
                        as={Form.Control}
                      />
                    </Form.Group>

                    <Form.Group as={Col} xs={10} sm="5">
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
                    <Form.Group as={Col} xs={10} sm="5">
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
                        <Form.Group as={Col} xs={8} sm={6}>
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
                        <Form.Group as={Col} sm="7">
                          <Form.Label className="mr-3">Birthdate</Form.Label>
                          <Field name="birthdate" type="date" />
                        </Form.Group>
                      </Form.Row>
                    </>
                  )}
                  <Form.Row>
                    <Form.Group as={Col} sm="10">
                      <Form.Label className="mr-5">
                        Select working days and hours
                      </Form.Label>

                      <FieldArray name="workingHours">
                        {(arrayHelpers) => (
                          <>
                            {values.workingHours.map((hour, index) => {
                              return (
                                <Row
                                  key={`${hour}${index}`}
                                  className="align-items-center mb-3"
                                >
                                  <Col xs={3}>
                                    <Form.Label>Day</Form.Label>
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
                                  </Col>
                                  <Col xs={3}>
                                    <Form.Label>Opening</Form.Label>
                                    <div>
                                      <Field
                                        type="time"
                                        name={`workingHours.${index}.startHour`}
                                      ></Field>
                                    </div>
                                  </Col>
                                  <Col xs={3}>
                                    <Form.Label>Closing</Form.Label>
                                    <div>
                                      <Field
                                        type="time"
                                        name={`workingHours.${index}.endHour`}
                                      ></Field>
                                    </div>
                                  </Col>
                                  <Col xs={3} style={{ textAlign: "right" }}>
                                    <Button
                                      variant="outline-danger"
                                      className="mt-4"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      X
                                    </Button>
                                  </Col>
                                </Row>
                              );
                            })}
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
                          </>
                        )}
                      </FieldArray>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} sm="10">
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
                                  <option value="">Choose options</option>
                                  {specializationList.map(
                                    (specialization, index) => (
                                      <option
                                        key={`${specialization._id}and${index}`}
                                        value={specialization._id}
                                      >
                                        {specialization.field}
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
                  {roleType.role === "doctor" && (
                    <Form.Row>
                      <Form.Group as={Col} md={6}>
                        <Form.Label className="mr-5">
                          Hospital or Clinic that you work for
                        </Form.Label>
                        <Field
                          placeholder="Type your hospital or clinic"
                          name="clinicOrHospital"
                          type="text"
                          as={Form.Control}
                        />
                      </Form.Group>
                    </Form.Row>
                  )}
                  <div>
                    <Button type="submit" disabled={isSubmitting}>
                      Register
                    </Button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </Col>
    </Row>
  );
};

export default RegisterDoctorOrClinic;
