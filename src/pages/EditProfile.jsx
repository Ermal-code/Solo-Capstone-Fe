import React from "react";
import { useSelector } from "react-redux";
import EditDoctorOrClinicProfile from "../components/EditDoctorOrClinicProfile";
import EditPatientProfile from "../components/EditPatientProfile";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    user && (
      <div
        style={{ borderRadius: "15px", background: "white" }}
        className="my-5 py-3 px-2  px-md-0"
      >
        {user.role === "patient" ? (
          <EditPatientProfile user={user} />
        ) : (
          <EditDoctorOrClinicProfile user={user} />
        )}
      </div>
    )
  );
};

export default EditProfile;
