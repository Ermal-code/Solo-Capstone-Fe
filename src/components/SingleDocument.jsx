import React from "react";

const SingleDocument = ({ document, setShow, setSelectedDocument }) => {
  return (
    <div>
      <div className="patientDocument" onClick={setSelectedDocument}>
        <img src={document.file} alt="patient's file document" />
        <div>
          <i className="far fa-eye" onClick={() => setShow(true)}></i>
        </div>
      </div>
      <h5 className="mt-2 text-center">{document.title}</h5>
    </div>
  );
};

export default SingleDocument;
