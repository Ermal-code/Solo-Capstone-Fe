import React from "react";
import { useSelector } from "react-redux";

const SingleDocument = ({
  document,
  setShow,
  setSelectedDocument,
  setAddOrEditDocument,
  profileId,
}) => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <div className="patientDocument" onClick={setSelectedDocument}>
        <img src={document.file} alt="patient's file document" />
        <div>
          <i
            className="far fa-eye"
            onClick={() => {
              setAddOrEditDocument(false);
              setShow(true);
            }}
          ></i>
          {user && profileId === user._id && (
            <i
              className="far fa-edit ml-5"
              onClick={() => {
                setAddOrEditDocument(true);
                setShow(true);
              }}
            ></i>
          )}
        </div>
      </div>
      <p className="mt-2 text-center">{document.title}</p>
    </div>
  );
};

export default SingleDocument;
