import React, { useEffect, useState } from "react";
import { Formik, Field, FieldArray } from "formik";
import { Form, Col } from "react-bootstrap";
import { registerUser } from "../api/usersApi";
import { getSpecializations } from "../api/specializationApi";
import { isLoggedIn } from "../helpers/helperFuctions";
import {
  errorHandlerForInput,
  errorHandlerText,
} from "../helpers/helperFuctions";

const RegisterDoctorOrClinic = ({
  setError,
  setRegisterDoctor,
  setStoreUser,
  history,
  url,
  error,
}) => {
  const [roleType, setRoleType] = useState("");
  const [specializationList, setSpecializationList] = useState([]);

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

  const sumbitRegister = async (data, setSubmitting, resetForm) => {
    try {
      setSubmitting(true);
      if (roleType === "clinic") {
        delete data.surname;
        delete data.gender;
        delete data.clinicOrHospital;
      }
      if (data.gender === null) delete data.gender;

      data.role = roleType;
      data.specialization = [data.specialization];
      data.specialization === "" && delete data.specialization;

      const response = await registerUser(data);

      if (response.status === 201) {
        setSubmitting(false);
        localStorage.setItem("LoggedIn", true);

        if (isLoggedIn()) {
          setStoreUser();
          history.push(url);
        }
        resetForm();
      }
    } catch (error) {
      setError(error.response.data);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchSpecializations();
  }, []);

  return (
    <Col
      xs={{ span: 10, offset: 1 }}
      md={{ span: 5, offset: 0 }}
      lg="4"
      className="mt-5"
      style={{ background: "#ddf4f5" }}
    >
      <div className="registerDoctorOrClinic mt-4 px-3">
        <p>
          Are you a patient?{" "}
          <strong onClick={setRegisterDoctor}>Click here</strong>
        </p>
      </div>
      <Formik
        initialValues={{
          name: "",
          surname: "",
          email: "",
          password: "",
          gender: null,
          specialization: [],
          clinicOrHospital: "",
        }}
        onSubmit={(data, { setSubmitting, resetForm }) => {
          sumbitRegister(data, setSubmitting, resetForm);
        }}
      >
        {({ values, isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="mt-2 px-3">
            <Form.Row className="align-items-center mb-4">
              <Col xs={12}>
                <Form.Control
                  name="role"
                  as="select"
                  onChange={(e) => {
                    setRoleType(e.currentTarget.value);
                  }}
                >
                  <option value="">Choose type of user</option>
                  <option value="doctor">Doctor</option>
                  <option value="clinic">Clinic/Hospital</option>
                </Form.Control>
              </Col>
            </Form.Row>
            {roleType && (
              <>
                <Form.Row>
                  <Form.Group as={Col} xs={12}>
                    <Field
                      placeholder={`${
                        roleType === "doctor" ? "First name" : "Name"
                      }`}
                      name="name"
                      type="text"
                      as={Form.Control}
                      className={errorHandlerForInput("name", error)}
                    />
                    {errorHandlerText("name", error)}
                  </Form.Group>
                  {roleType === "doctor" && (
                    <Form.Group as={Col} xs={12}>
                      <Field
                        placeholder="Last name"
                        name="surname"
                        type="text"
                        as={Form.Control}
                        className={errorHandlerForInput("surname", error)}
                      />
                      {errorHandlerText("surname", error)}
                    </Form.Group>
                  )}
                </Form.Row>
                <Form.Row>
                  <Form.Group as={Col} xs={12}>
                    <Field
                      placeholder="Email"
                      name="email"
                      type="email"
                      as={Form.Control}
                      className={errorHandlerForInput("email", error)}
                    />
                    {errorHandlerText("email", error)}
                  </Form.Group>

                  <Form.Group as={Col} xs={12}>
                    <Field
                      placeholder="Password"
                      name="password"
                      type="password"
                      as={Form.Control}
                      className={errorHandlerForInput("password", error)}
                    />
                    {errorHandlerText("password", error)}
                  </Form.Group>
                </Form.Row>

                {roleType === "doctor" && (
                  <>
                    <Form.Row>
                      <Form.Group as={Col} xs={12}>
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
                  </>
                )}

                <Form.Row>
                  <Form.Group as={Col} sm="12">
                    <Field
                      name="specialization"
                      as="select"
                      className="form-control"
                    >
                      <option value="">Choose specialization</option>
                      {specializationList.map((specialization, index) => (
                        <option
                          key={`${specialization._id}andofc${index}`}
                          value={specialization.field}
                        >
                          {specialization.field}
                        </option>
                      ))}
                    </Field>
                  </Form.Group>
                </Form.Row>
                {roleType === "doctor" && (
                  <Form.Row>
                    <Form.Group as={Col} md={12}>
                      <Field
                        placeholder="Hospital or clinic"
                        name="clinicOrHospital"
                        type="text"
                        as={Form.Control}
                        className={errorHandlerForInput(
                          "clinicOrHospital",
                          error
                        )}
                      />
                      {errorHandlerText("clinicOrHospital", error)}
                    </Form.Group>
                  </Form.Row>
                )}
                <div>
                  <button
                    className="orangeButton mb-5 mt-3 w-100"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Register
                  </button>
                </div>
              </>
            )}
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export default RegisterDoctorOrClinic;
