import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { getHospitalStaff } from "../api/staffMembersApi";
import Loader from "./Loader";
import ModalStaff from "./ModalStaff";
import SingleMember from "./SingleMember";

const StaffSection = ({ userId }) => {
  const [staff, setStaff] = useState([]);
  const [loader, setLoader] = useState(true);
  const [showDropDown, setShowDropDown] = useState(false);
  const [show, setShow] = useState(false);
  const [addMember, setAddMember] = useState(false);

  const user = useSelector((state) => state.user);

  const handleClose = () => setShow(false);

  useEffect(() => {
    getHospitalStaff(userId, setStaff, setLoader);
  }, []);

  return (
    <>
      {loader && <Loader />}
      <ModalStaff
        handleClose={handleClose}
        show={show}
        staff={staff}
        setStaff={setStaff}
        addMember={addMember}
      />
      <Row className="p-4 pt-5">
        {user && user._id === userId && (
          <Col xs={{ span: 2, offset: 10 }}>
            <div
              className="d-flex justify-content-end mb-2"
              style={{ position: "relative" }}
            >
              <i
                className="fas fa-ellipsis-h"
                onClick={() => setShowDropDown(!showDropDown)}
              ></i>
              {showDropDown && (
                <div
                  className="navbarDropDown shadow"
                  style={{ left: "-70px", top: "20px" }}
                  onMouseLeave={() => setShowDropDown(false)}
                >
                  <ul>
                    <li
                      onClick={() => {
                        setAddMember(true);
                        setShow(true);
                        setShowDropDown(false);
                      }}
                    >
                      Add member
                    </li>
                    <li
                      onClick={() => {
                        setAddMember(false);
                        setShow(true);
                        setShowDropDown(false);
                      }}
                    >
                      Delete
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </Col>
        )}
        {staff.map((member, index) => (
          <Col
            xs={6}
            md={4}
            key={`${member._id}and${index}`}
            className="px-0 mb-4"
          >
            <SingleMember member={member} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default StaffSection;
