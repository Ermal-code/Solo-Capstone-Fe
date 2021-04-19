import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, withRouter, useHistory, useLocation } from "react-router-dom";
import { isLoggedIn } from "../helpers/helperFuctions";
import { useDispatch, useSelector } from "react-redux";
import { getUserById, logOutUser } from "../api/usersApi";
import MemoLogoED from "../svg/LogoED";
import MemoLogoEasyDoctor from "../svg/LogoEasyDoctor";

const Header = ({ history, location }) => {
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
            <Navbar.Brand>
              <div className="d-none d-sm-block">
                <MemoLogoEasyDoctor />
              </div>
              <div className="d-block d-sm-none">
                <MemoLogoED height="40px" />
              </div>
            </Navbar.Brand>
          </Link>
          <Nav>
            {isLoggedIn() === "false" ? (
              <Link to={`/login?${location.pathname}`} className="nav-link">
                <i className="fas fa-user"></i> Log In/Register
              </Link>
            ) : (
              user && (
                <div
                  className={
                    showDropDown ? `accountInfoLight pt-2` : `accountInfo pt-2`
                  }
                  onClick={() => setShowDropDown(!showDropDown)}
                  onMouseLeave={() => setShowDropDown(false)}
                >
                  <div className="d-flex justify-content-between align-items-center ">
                    <img src={user.image} />
                    <div className="ml-2">
                      <p>
                        {user.name} {user.surname}
                      </p>
                      <p className="d-none d-md-block">Manage your account</p>
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
                            if (
                              location.pathname === "/profile/me" &&
                              user.role === "patient"
                            ) {
                              history.push("/");
                            } else if (
                              location.pathname === "/profile/me" &&
                              (user.role === "doctor" || user.role === "clinic")
                            ) {
                              history.push("/profile/" + user._id);
                            }
                            dispatch({
                              type: "UNSET_USER",
                            });
                            logOutUser();
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
