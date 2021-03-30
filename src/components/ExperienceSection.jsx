import React, { useEffect, useState } from "react";
import { getExperiences } from "../api/experienceApi";
import ModalExperience from "./ModalExperience";
import SingleExperience from "./SingleExperience";
import { useSelector } from "react-redux";

const ExperienceSection = ({ userId }) => {
  const user = useSelector((state) => state.user);
  const [experiences, setExperiences] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState(null);

  const handleClose = () => {
    setSelectedExperience(null);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    getExperiences(userId, setExperiences);
  }, []);

  return (
    <div className="p-3">
      <ModalExperience
        show={show}
        handleClose={handleClose}
        selectedExperience={selectedExperience}
        userId={user && user._id}
      />
      <div className="d-flex justify-content-between">
        <h4 className="mt-4">Experience</h4>
        {user && userId === user._id && (
          <h6 className="mt-4" onClick={() => handleShow()}>
            Add experience
          </h6>
        )}
      </div>
      {experiences.map((experience, index) => (
        <SingleExperience
          experience={experience}
          setExperiences={setExperiences}
          key={`${experience._id}${index}`}
          handleShow={handleShow}
          user={user}
          setSelectedExperience={() => setSelectedExperience(experience)}
        />
      ))}
    </div>
  );
};

export default ExperienceSection;
