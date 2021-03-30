import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import moment from "moment";

import { deleteExperience } from "../api/experienceApi";

const SingleExperience = ({
  experience,
  setExperiences,
  handleShow,
  user,
  setSelectedExperience,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <Row className="mt-3">
      <Col xs="4" sm="3">
        <h6>
          {experience.endDate && experience.endDate !== ""
            ? `${moment(experience.startDate).format("YYYY")}-${moment(
                experience.endDate
              ).format("YYYY")}`
            : `Since ${moment(experience.startDate).format("YYYY")}`}
        </h6>
      </Col>
      <Col xs="7" sm="8">
        <h5>{experience.role}</h5>
        <p className="mb-0">
          {experience.company}
          {experience.area && `, ${experience.area}`}
        </p>
      </Col>
      <Col xs="1">
        {user && experience.user === user._id && (
          <div style={{ position: "relative" }}>
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
                      setSelectedExperience();
                      handleShow();
                      setShowDropDown(false);
                    }}
                  >
                    Edit
                  </li>
                  <li
                    onClick={() =>
                      deleteExperience(experience._id, user._id, setExperiences)
                    }
                  >
                    Delete
                  </li>
                </ul>
              </div>
            )}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default SingleExperience;
