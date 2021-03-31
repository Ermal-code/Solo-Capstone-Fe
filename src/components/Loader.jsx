import React from "react";

const Loader = ({ height }) => {
  return (
    <div className="d-flex justify-content-center w-100 mb-5">
      <img
        src={`${process.env.PUBLIC_URL}/EasyDoctorLogo-01.png`}
        alt="logo"
        height={height ? height : "45px"}
        className="loader"
      />
    </div>
  );
};

export default Loader;
