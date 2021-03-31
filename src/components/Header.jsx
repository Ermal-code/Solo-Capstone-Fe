import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, withRouter, useHistory } from "react-router-dom";
import { isLoggedIn } from "../helpers/helperFuctions";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../api/usersApi";

const Header = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (isLoggedIn() === "true") {
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
    }
  }, []);

  return (
    <Navbar variant="dark" className="py-0 navBarHeader">
      <Container>
        <div
          className={`d-flex justify-content-between w-100 ${
            isLoggedIn() === "false" && "align-items-center"
          }`}
        >
          <Link to="/">
            <Navbar.Brand className="mt-1">
              <img
                src={`${process.env.PUBLIC_URL}/EasyDoctorNavBar.png`}
                alt="logo"
                height="40px"
              />
            </Navbar.Brand>
          </Link>
          <Nav>
            {isLoggedIn() === "false" ? (
              <Link to="/" className="nav-link">
                <i className="fas fa-user"></i> Log In
              </Link>
            ) : (
              user && (
                <div
                  className={
                    showDropDown
                      ? `accountInfoLight shadow pt-2`
                      : `accountInfo pt-2`
                  }
                  onClick={() => setShowDropDown(!showDropDown)}
                  onMouseLeave={() => setShowDropDown(false)}
                >
                  <div className="d-flex justify-content-between align-items-center ">
                    <img src={user.image} className="img-fluid" />
                    <div className="ml-2">
                      <p>
                        {user.name} {user.surname}
                      </p>
                      <p>Manage your account</p>
                    </div>
                  </div>
                  {showDropDown && (
                    <div className="navbarDropDown shadow">
                      <ul>
                        <li onClick={() => history.push("/profile/me")}>
                          <i className="fas fa-user-alt"></i> Profile
                        </li>
                        <li
                          onClick={() =>
                            history.push("/editProfile/" + user._id)
                          }
                        >
                          <i className="fas fa-user-cog"></i> Account
                        </li>
                        {user.role !== "patient" && (
                          <li>
                            <i className="fas fa-calendar-alt"></i> Appointments
                          </li>
                        )}
                        <li
                          onClick={() => {
                            localStorage.setItem("LoggedIn", false);
                            dispatch({
                              type: "UNSET_USER",
                            });
                          }}
                        >
                          <i className="fas fa-door-open"></i> Log out
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              )
            )}
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default withRouter(Header);
