import React from "react";
import { useSelector } from "react-redux";
import { addHospitalStaff } from "../api/staffMembersApi";

const ModalStaffSingleDoctor = ({ doctor, setStaff }) => {
  const user = useSelector((state) => state.user);
  return (
    <div className="d-flex justify-content-between">
      <div className="d-flex justify-content-start singleMember">
        <img
          src={doctor.image}
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
            Dr. {doctor.name} {doctor.surname}
          </h6>
          <h6 style={{ color: "gray" }}>{doctor.specialization}</h6>
        </div>
      </div>

      <div>
        <i
          className="fas fa-plus"
          onClick={() => addHospitalStaff(doctor._id, user._id, setStaff)}
        ></i>
      </div>
    </div>
  );
};

export default ModalStaffSingleDoctor;
