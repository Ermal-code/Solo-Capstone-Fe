import React, { useEffect, useState } from "react";
import { getExperiences, deleteExperience } from "../api/experienceApi";
import ModalExperience from "./ModalExperience";
import SingleExperienceOrEducation from "./SingleExperienceOrEducation";
import { useSelector } from "react-redux";
import { getEducations, deleteEducation } from "../api/educationApi";
import Loader from "./Loader";

const ExperienceSection = ({ userId }) => {
  const user = useSelector((state) => state.user);
  const [experiences, setExperiences] = useState([]);
  const [educations, setEducations] = useState([]);
  const [selectedEducation, setSelectedEducation] = useState(null);
  const [selectedExperience, setSelectedExperience] = useState(null);
  const [isExperience, setIsExperience] = useState(true);
  const [show, setShow] = useState(false);
  const [loader, setLoader] = useState(true);

  const handleClose = () => {
    setSelectedExperience(null);
    setSelectedEducation(null);
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    getExperiences(userId, setExperiences, setLoader);
    getEducations(userId, setEducations, setLoader);
  }, []);

  return (
    <div className="p-3">
      <ModalExperience
        isExperience={isExperience}
        show={show}
        handleClose={handleClose}
        selectedExperience={selectedExperience}
        selectedEducation={selectedEducation}
        getExperiences={() => getExperiences(userId, setExperiences)}
        getEducations={() => getEducations(userId, setEducations)}
      />

      {loader ? (
        <Loader />
      ) : (
        <>
          <div className="d-flex justify-content-between">
            <h4 className="mt-4">Experience</h4>
            {user && userId === user._id && (
              <h6
                className="mt-4"
                onClick={() => {
                  setIsExperience(true);
                  handleShow();
                }}
              >
                Add experience
              </h6>
            )}
          </div>
          {experiences.map((experience, index) => (
            <SingleExperienceOrEducation
              key={`${experience._id}${index}`}
              experience={experience}
              handleShow={handleShow}
              userId={user && user._id}
              setSelectedExperience={() => setSelectedExperience(experience)}
              deleteExperience={() =>
                deleteExperience(experience._id, user._id, setExperiences)
              }
              setIsExperience={() => setIsExperience(true)}
            />
          ))}

          <div className="d-flex justify-content-between">
            <h4 className="mt-4">Education</h4>
            {user && userId === user._id && (
              <h6
                className="mt-4"
                onClick={() => {
                  setIsExperience(false);
                  handleShow();
                }}
              >
                Add education
              </h6>
            )}
          </div>
          {educations.map((education, index) => (
            <SingleExperienceOrEducation
              key={`${education._id}${index}`}
              education={education}
              handleShow={handleShow}
              userId={user && user._id}
              setSelectedEducation={() => setSelectedEducation(education)}
              deleteEducation={() =>
                deleteEducation(education._id, user._id, setEducations)
              }
              setIsExperience={() => setIsExperience(false)}
            />
          ))}
        </>
      )}
    </div>
  );
};

export default ExperienceSection;
