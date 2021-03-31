import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import moment from "moment";

const SingleExperienceOrEducation = ({
  experience,
  deleteExperience,
  handleShow,
  userId,
  setSelectedExperience,
  education,
  setSelectedEducation,
  deleteEducation,
  setIsExperience,
}) => {
  const [showDropDown, setShowDropDown] = useState(false);

  return (
    <Row className="mt-3">
      <Col xs="4" sm="3">
        <h6>
          {(experience ? experience.endDate : education.endDate) &&
          (experience ? experience.endDate !== "" : education.endDate !== "")
            ? `${moment(
                experience ? experience.startDate : education.startDate
              ).format("YYYY")}-${moment(
                experience ? experience.endDate : education.endDate
              ).format("YYYY")}`
            : `Since ${moment(
                experience ? experience.startDate : education.startDate
              ).format("YYYY")}`}
        </h6>
      </Col>
      <Col xs="7" sm="8">
        <h5 className="mb-0">
          {experience ? experience.role : education.school}
        </h5>
        <p className="mb-0">
          {experience ? experience.company : education.type}
          {(experience ? experience.area : education.area) &&
            `, ${experience ? experience.area : education.area}`}
        </p>
        {education && education.degree && (
          <p className="mb-0">{education.degree}</p>
        )}
      </Col>
      <Col xs="1">
        {userId && (experience ? experience.user : education.user) === userId && (
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
                      setIsExperience();
                      setSelectedExperience
                        ? setSelectedExperience()
                        : setSelectedEducation();

                      handleShow();
                      setShowDropDown(false);
                    }}
                  >
                    Edit
                  </li>
                  <li
                    onClick={() =>
                      deleteExperience ? deleteExperience() : deleteEducation()
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

export default SingleExperienceOrEducation;
