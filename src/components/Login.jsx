import React, { useState } from "react";
import { Row, Form, Button, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { loginUser, registerUser } from "../api/usersApi";
import MemoLoginIlustrationSvg from "./LoginIlustrationSvg";
import { Formik, Field } from "formik";

const Login = () => {
  const history = useHistory();

  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Login");

  // const submitLogin = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   try {
  //     const response = await loginUser({ email, password });

  //     if (response.ok) {
  //       localStorage.setItem("LoggedIn", true);
  //       history.push("/home");
  //     } else {
  //       const data = await response.json();
  //       setError(data);
  //     }
  //   } catch (error) {
  //     console.log("error: ", error);
  //   }
  // };

  return (
    <Row className="mb-5">
      <Col xs="12" className="mt-5">
        <div className="loginNavbar">
          <h6
            className={` ${
              selectedSection === "Login" ? "selectedLoginNavbar" : ""
            }`}
            onClick={(e) => setSelectedSection(e.currentTarget.innerText)}
          >
            Login
          </h6>
          <h6
            className={`ml-5 ${
              selectedSection === "Register" ? "selectedLoginNavbar" : ""
            }`}
            onClick={(e) => setSelectedSection(e.currentTarget.innerText)}
          >
            Register
          </h6>
        </div>
      </Col>
      <Col
        xs={{ span: 10, offset: 1 }}
        md={{ span: 5, offset: 0 }}
        lg="4"
        className="mt-5"
        style={{ background: "#ddf4f5" }}
      >
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            password: "",
            phone: "",
            gender: "",
          }}
          onSubmit={async (data, { setSubmitting, resetForm }) => {
            try {
              setSubmitting(true);
              if (data.gender === "") {
                delete data.gender;
              }
              const response = await registerUser(data);
              if (response.status === 201) {
                const data = response.data;
                console.log(data);
                setSubmitting(false);
                resetForm();
              }
            } catch (error) {
              console.log(error.response.data);
            }
          }}
        >
          {({ values, isSubmitting, handleSubmit }) => (
            <Form onSubmit={handleSubmit} className="mt-5 px-3">
              {selectedSection === "Register" && (
                <Form.Row>
                  <Form.Group as={Col} xs={12}>
                    <Field
                      placeholder="First name"
                      name="name"
                      type="text"
                      as={Form.Control}
                    />
                  </Form.Group>

                  <Form.Group as={Col} xs={12}>
                    <Field
                      placeholder="Last name"
                      name="surname"
                      type="text"
                      as={Form.Control}
                    />
                  </Form.Group>
                </Form.Row>
              )}
              <Form.Row>
                <Form.Group as={Col} xs={12}>
                  <Field
                    placeholder="Email"
                    name="email"
                    type="email"
                    as={Form.Control}
                  />
                  {selectedSection === "Login" && (
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  )}
                </Form.Group>

                <Form.Group as={Col} xs={12}>
                  <Field
                    placeholder="Password"
                    name="password"
                    type="password"
                    as={Form.Control}
                  />
                </Form.Group>
                {error && selectedSection === "Login" && (
                  <Alert>{error.message}</Alert>
                )}
              </Form.Row>
              {selectedSection === "Login" && (
                <p className="mt-3 text-center">Forgot password?</p>
              )}
              {selectedSection === "Register" && (
                <>
                  <Form.Row>
                    <Form.Group as={Col} xs={12}>
                      <Field
                        placeholder="Phone number"
                        name="phone"
                        type="text"
                        as={Form.Control}
                      />
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} xs={12}>
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
                  </Form.Row>{" "}
                </>
              )}
              <button
                className={`orangeButton mb-5 mt-3`}
                disabled={isSubmitting}
                type="submit"
              >
                {selectedSection}
              </button>
            </Form>
          )}
        </Formik>
      </Col>
      <Col md="7" className="d-none d-md-block ml-lg-4 mt-5">
        <MemoLoginIlustrationSvg />
      </Col>
    </Row>
  );
};

export default Login;
