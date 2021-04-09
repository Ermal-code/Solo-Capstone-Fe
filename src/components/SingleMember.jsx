import React from "react";
import { useHistory } from "react-router";
import { deleteHospitalStaff } from "../api/staffMembersApi";

const SingleMember = ({ member, deleteModal, setStaff }) => {
  const history = useHistory();
  return (
    <div className="d-flex justify-content-between">
      <div
        className="d-flex justify-content-start singleMember"
        onClick={() => history.push(`/profile/${member.doctor._id}`)}
      >
        <img
          src={member.doctor.image}
          style={{
            borderRadius: "50%",
            objectFit: "cover",
            height: "60px",
            width: "60px",
          }}
          alt="doctor"
        />
        <div className="ml-2">
          <h6 className="mb-1">
            Dr. {member.doctor.name} {member.doctor.surname}
          </h6>
          <h6 style={{ color: "gray" }}>{member.doctor.specialization[0]}</h6>
        </div>
      </div>
      {deleteModal && (
        <div>
          <i
            className="fas fa-trash-alt"
            onClick={() =>
              deleteHospitalStaff(member._id, member.hospital, setStaff)
            }
          ></i>
        </div>
      )}
    </div>
  );
};

export default SingleMember;
