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
    <Navbar bg="dark" variant="dark" className="pt-0">
      <Container>
        <div className="d-flex justify-content-between w-100">
          <Link to="/">
            <Navbar.Brand>Navbar</Navbar.Brand>
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
                          Profile
                        </li>
                        <li>Account</li>
                        <li>Appointments</li>
                        <li
                          onClick={() => {
                            localStorage.setItem("LoggedIn", false);
                            dispatch({
                              type: "UNSET_USER",
                            });
                          }}
                        >
                          Log out
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
