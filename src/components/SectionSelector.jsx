import React from "react";

const SectionSelector = ({ profile, sectionSelector, setSectionSelector }) => {
  return (
    <>
      <div className="d-none d-sm-flex justify-content-start mt-5">
        <h5
          onClick={() => setSectionSelector(1)}
          className={` profileSectionSelector ${
            sectionSelector === 1 ? "profileSectionBorder" : ""
          }`}
        >
          <i className="fas fa-address-card"></i> About
        </h5>
        {profile.role === "doctor" ? (
          <h5
            onClick={() => setSectionSelector(2)}
            className={` profileSectionSelector ${
              sectionSelector === 2 ? " profileSectionBorder " : ""
            }`}
          >
            <i className="fas fa-briefcase"></i> Experiences
          </h5>
        ) : (
          <h5
            onClick={() => setSectionSelector(2)}
            className={` profileSectionSelector ${
              sectionSelector === 2 ? " profileSectionBorder " : ""
            }`}
          >
            <i className="fas fa-users"></i> Staff
          </h5>
        )}
        <h5
          onClick={() => setSectionSelector(3)}
          className={` profileSectionSelector ${
            sectionSelector === 3 ? " profileSectionBorder " : ""
          }`}
        >
          <i className="fas fa-comments"></i> Reviews
        </h5>
      </div>
      <div className="d-sm-none d-flex justify-content-start mt-5">
        <h5
          style={{ fontSize: "30px" }}
          onClick={() => setSectionSelector(1)}
          className={` profileSectionSelector ${
            sectionSelector === 1 ? "profileSectionBorder" : ""
          }`}
        >
          <i className="fas fa-address-card mx-2"></i>
        </h5>
        {profile.role === "doctor" ? (
          <h5
            style={{ fontSize: "30px" }}
            onClick={() => setSectionSelector(2)}
            className={` profileSectionSelector ${
              sectionSelector === 2 ? " profileSectionBorder " : ""
            }`}
          >
            <i className="fas fa-briefcase mx-2"></i>
          </h5>
        ) : (
          <h5
            style={{ fontSize: "30px" }}
            onClick={() => setSectionSelector(2)}
            className={` profileSectionSelector ${
              sectionSelector === 2 ? " profileSectionBorder " : ""
            }`}
          >
            <i className="fas fa-users mx-2"></i>
          </h5>
        )}
        <h5
          style={{ fontSize: "30px" }}
          onClick={() => setSectionSelector(3)}
          className={` profileSectionSelector ${
            sectionSelector === 3 ? " profileSectionBorder " : ""
          }`}
        >
          <i className="fas fa-comments mx-2"></i>
        </h5>
      </div>
    </>
  );
};

export default SectionSelector;
