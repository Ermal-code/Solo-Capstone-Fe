import React from "react";

const Toaster = ({ text, color }) => {
  return (
    <div className="Toaster" style={{ background: color }}>
      {text}
    </div>
  );
};

export default Toaster;
