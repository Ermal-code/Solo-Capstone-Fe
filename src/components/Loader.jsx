import React from "react";
import MemoLogoED from "../svg/LogoED";

const Loader = ({ height }) => {
  return (
    <div className="d-flex justify-content-center align-items-center w-100 h-100 mb-5">
      <MemoLogoED className="loader" height={height ? height : "45px"} />
    </div>
  );
};

export default Loader;
