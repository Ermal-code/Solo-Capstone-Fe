import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getUserById } from "../api/usersApi";
import MemoLoginIlustrationSvg from "../svg/LoginIlustrationSvg";
import { useDispatch, useSelector } from "react-redux";
import LoginOrRegisterPatient from "../components/LoginOrRegisterPatient";
import RegisterDoctorOrClinic from "../components/RegisterDoctorOrClinic";

const Login = ({ history, location }) => {
  const dispatch = useDispatch();
  const url = location.search.substring(1);
  const user = useSelector((state) => state.user);

  const [error, setError] = useState(null);
  const [selectedSection, setSelectedSection] = useState("Login");
  const [registerDoctor, setRegisterDoctor] = useState(false);

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

  useEffect(() => {
    if (user) {
      history.push("/");
    }
  }, [user]);

  return (
    <Row className="mb-5">
      <Col xs="12" className="mt-5">
        <div className="loginNavbar">
          <h6
            className={` ${
              selectedSection === "Login" ? "selectedLoginNavbar" : ""
            }`}
            onClick={(e) => {
              setSelectedSection(e.currentTarget.innerText);
              setRegisterDoctor(false);
              setError(null);
            }}
          >
            Login
          </h6>
          <h6
            className={`ml-5 ${
              selectedSection === "Register" ? "selectedLoginNavbar" : ""
            }`}
            onClick={(e) => {
              setSelectedSection(e.currentTarget.innerText);
              setError(null);
            }}
          >
            Register
          </h6>
        </div>
      </Col>
      {!registerDoctor ? (
        <LoginOrRegisterPatient
          selectedSection={selectedSection}
          error={error}
          setRegisterDoctor={() => {
            setRegisterDoctor(true);
            setError(null);
          }}
          setStoreUser={setStoreUser}
          history={history}
          url={url}
          setError={setError}
        />
      ) : (
        <RegisterDoctorOrClinic
          setError={setError}
          setRegisterDoctor={() => {
            setRegisterDoctor(false);
            setError(null);
          }}
          setStoreUser={setStoreUser}
          history={history}
          url={url}
          error={error}
        />
      )}

      <Col md="7" className="d-none d-md-block ml-lg-4 mt-5">
        <MemoLoginIlustrationSvg />
      </Col>
    </Row>
  );
};

export default Login;
