import React from "react";

const SingleDocument = ({ document }) => {
  return (
    <div>
      <div className="patientDocument">
        <img src={document.file} alt="patient's file document" />
        <div>
          <i className="far fa-eye"></i>
        </div>
      </div>
      <h5 className="mt-2 text-center">{document.title}</h5>
    </div>
  );
};

export default SingleDocument;
