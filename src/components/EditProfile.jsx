import React, { useState, useEffect } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Form, Col, Row, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getSpecializations } from "../api/specializationApi";
import { editProfile } from "../api/usersApi";
import { useHistory } from "react-router-dom";
import { languageList } from "../helpers/laguageList";

const EditProfile = () => {
  const history = useHistory();
  const [specializationList, setSpecializationList] = useState([]);
  const [registerErrors, setRegisterErrors] = useState([]);
  const user = useSelector((state) => state.user);

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
    user && (
      <Row className="my-5">
        <Col sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 2 }}>
          <Formik
            initialValues={{
              name: user.name,
              surname: user.surname,
              email: user.email,
              password: "",
              phone: user.phone,
              gender: user.gender,
              birthdate: user.birthdate,
              workingHours: user.workingHours,
              specialization: user.specialization,
              clinicOrHospital: user.clinicOrHospital,
              description: user.description,
              website: user.website,
              languages: user.languages ? user.languages : [""],
            }}
            onSubmit={async (data) => {
              try {
                if (user.role === "clinic") {
                  delete data.surname;
                  delete data.gender;
                  delete data.birthdate;
                  delete data.clinicOrHospital;
                }
                if (data.gender === null) delete data.gender;
                if (data.password === "") delete data.password;

                const response = await editProfile(data);

                if (response.status === 200) {
                  const data = response.data;
                  console.log(data);

                  history.push("/profile/me");
                }
              } catch (error) {
                console.log(error.response.data);
                const errors = error.response.data;
                setRegisterErrors(errors);
                console.log(registerErrors);
              }
            }}
          >
            {({ values, handleSubmit }) => (
              <Form onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Group as={Col} xs={10} sm="5">
                    <Form.Label>
                      {user.role === "doctor" ? "First name" : "Name"}
                    </Form.Label>
                    <Field
                      placeholder={`Type your ${
                        user.role === "doctor" ? "first name" : "name"
                      }`}
                      name="name"
                      type="text"
                      as={Form.Control}
                    />
                  </Form.Group>
                  {user.role === "doctor" && (
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
                <Form.Row>
                  <Form.Group as={Col} xs={12}>
                    <Form.Label>Bio</Form.Label>
                    <Field
                      placeholder="Type your Bio "
                      name="description"
                      as="textarea"
                      rows="5"
                      className="w-100"
                    />
                  </Form.Group>
                </Form.Row>
                {user.role === "doctor" && (
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
                            value="Other"
                            label="Other"
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
                                  <i
                                    className="fas fa-trash-alt mt-4"
                                    onClick={() => arrayHelpers.remove(index)}
                                  ></i>
                                </Col>
                              </Row>
                            );
                          })}
                          <button
                            className="blueButtonV2"
                            onClick={() =>
                              arrayHelpers.push({
                                day: "Monday",
                                startHour: "",
                                endHour: "",
                              })
                            }
                          >
                            Add working days
                          </button>
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
                                <option value={element ? element : ""}>
                                  {element ? element : "Choose Option"}
                                </option>
                                {specializationList.map(
                                  (specialization, index) => (
                                    <option
                                      key={`${specialization._id}and${index}`}
                                      value={specialization.field}
                                    >
                                      {specialization.field}
                                    </option>
                                  )
                                )}
                              </Field>

                              <i
                                className="fas fa-trash-alt"
                                onClick={() => arrayHelpers.remove(index)}
                              ></i>
                            </div>
                          ))}
                          <button
                            className="blueButtonV2"
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add specialization
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </Form.Group>
                </Form.Row>
                {user.role === "doctor" && (
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
                <Form.Row>
                  <Form.Group as={Col} sm="10">
                    <Form.Label className="mr-5">Select languages</Form.Label>
                    <FieldArray name="languages">
                      {(arrayHelpers) => (
                        <>
                          {values.languages.map((languagesElement, index) => (
                            <div
                              className="d-flex justify-content-between align-items-center mb-3"
                              key={`${languagesElement}${index}`}
                            >
                              <Field
                                name={`languages.${index}`}
                                as="select"
                                className="form-control w-50 "
                              >
                                <option
                                  value={
                                    languagesElement ? languagesElement : ""
                                  }
                                >
                                  {languagesElement
                                    ? languagesElement
                                    : "Choose Option"}
                                </option>
                                {languageList.map((language, index) => (
                                  <option
                                    key={`${language.code}and${index}`}
                                    value={language.name}
                                  >
                                    {language.name}
                                  </option>
                                ))}
                              </Field>
                              <i
                                className="fas fa-trash-alt"
                                onClick={() => arrayHelpers.remove(index)}
                              ></i>
                            </div>
                          ))}
                          <button
                            className="blueButtonV2"
                            onClick={() => arrayHelpers.push("")}
                          >
                            Add language
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </Form.Group>
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} md={6}>
                    <Form.Label className="mr-5">Website</Form.Label>
                    <Field
                      placeholder="Type your website"
                      name="website"
                      type="text"
                      as={Form.Control}
                    />
                  </Form.Group>
                </Form.Row>
                <div className="mt-5">
                  <button className="blueButton w-100" type="submit">
                    Save
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    )
  );
};

export default EditProfile;
