import React, { useState } from "react";
import { Row, Form, Col, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { getUserById, loginUser, registerUser } from "../api/usersApi";
import MemoLoginIlustrationSvg from "../svg/LoginIlustrationSvg";
import { Formik, Field } from "formik";
import { useDispatch } from "react-redux";
import { isLoggedIn } from "../helpers/helperFuctions";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Login");

  const setStoreUser = () => {
    dispatch(async (dispatch) => {
      try {
        const response = await getUserById("me");
        if (response.statusText === "OK") {
          dispatch({
            type: "SET_USER",
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    });
  };

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
            birthdate: "",
          }}
          onSubmit={async (data, { setSubmitting }) => {
            try {
              setSubmitting(true);
              if (data.gender === "") {
                delete data.gender;
              }
              let response;
              if (selectedSection === "Login") {
                response = await loginUser({
                  email: data.email,
                  password: data.password,
                });
              } else {
                response = await registerUser(data);
              }

              if (response.status === 201) {
                setSubmitting(false);

                localStorage.setItem("LoggedIn", true);

                if (isLoggedIn() === "true") {
                  setStoreUser();
                  history.push("/");
                }
              }
            } catch (error) {
              console.log(error.response.data);
              setError(error.response.data);
              setSubmitting(false);
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
                  <Alert variant="danger" className="w-100 text-center">
                    {error.message}
                  </Alert>
                )}
              </Form.Row>
              {selectedSection === "Login" && (
                <p className="mt-3 text-center" style={{ color: "#1a73e8" }}>
                  Forgot password?
                </p>
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
                          value="Other"
                          label="Other"
                        />
                      </div>
                    </Form.Group>
                  </Form.Row>
                  <Form.Row>
                    <Form.Group as={Col} sm="7">
                      <Form.Label className="mr-3">Birthdate</Form.Label>
                      <Field name="birthdate" type="date" as={Form.Check} />
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
