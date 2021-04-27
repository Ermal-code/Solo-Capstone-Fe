import React from "react";
import { Formik, Field } from "formik";
import { Form, Col, Alert } from "react-bootstrap";
import MemoGoogleSvg from "../svg/googleSvg";
import { isLoggedIn } from "../helpers/helperFuctions";
import { loginUser, registerUser } from "../api/usersApi";
import ErrorText from "./ErrorText";
import {
  errorHandlerForInput,
  errorHandlerText,
} from "../helpers/helperFuctions";

const LoginOrRegisterPatient = ({
  selectedSection,
  error,
  setRegisterDoctor,
  setStoreUser,
  history,
  url,
  setError,
}) => {
  const loginOrRegister = async (data, setSubmitting) => {
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

        if (isLoggedIn()) {
          setStoreUser();
          history.push(url);
        }
      }
    } catch (error) {
      setError(error.response.data);
      setSubmitting(false);
    }
  };

  return (
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
          gender: "",
        }}
        onSubmit={(data, { setSubmitting }) => {
          loginOrRegister(data, setSubmitting);
        }}
      >
        {({ values, isSubmitting, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="mt-5 px-3">
            <a href={`${process.env.REACT_APP_BE_URL}/api/users/googleLogin`}>
              <button
                className="googleButton w-100"
                type="button"
                onClick={() => localStorage.setItem("LoggedIn", true)}
              >
                <MemoGoogleSvg className="mr-3" /> Continue with Google
              </button>
            </a>
            {selectedSection === "Register" && (
              <div className="registerDoctorOrClinic">
                <p>
                  Are you a doctor or a clinic?{" "}
                  <strong onClick={setRegisterDoctor}>Click here</strong>
                </p>
              </div>
            )}
            <div className="divider my-4 ">
              <strong>OR</strong>
            </div>
            {selectedSection === "Register" && (
              <Form.Row>
                <Form.Group as={Col} xs={12}>
                  <Field
                    placeholder="First name"
                    name="name"
                    type="text"
                    as={Form.Control}
                    className={errorHandlerForInput("name", error)}
                  />
                  {errorHandlerText("name", error)}
                </Form.Group>

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
              </Form.Row>
            )}
            <Form.Row>
              <Form.Group as={Col} xs={12}>
                <Field
                  placeholder="Email"
                  name="email"
                  type="email"
                  as={Form.Control}
                  className={errorHandlerForInput("email", error)}
                />
                {selectedSection === "Login" && (
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                )}
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
              {error && selectedSection === "Login" && (
                <ErrorText text={error.message} />
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
                {selectedSection === "Register" && error && !error.errors && (
                  <ErrorText text={error.message} />
                )}
              </>
            )}
            <button
              className="orangeButton mb-5 mt-3 w-100"
              disabled={isSubmitting}
              type="submit"
            >
              {selectedSection}
            </button>
          </Form>
        )}
      </Formik>
    </Col>
  );
};

export default LoginOrRegisterPatient;
