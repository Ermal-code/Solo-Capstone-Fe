import React from "react";
import { useSelector } from "react-redux";
import EditDoctorOrClinicProfile from "../components/EditDoctorOrClinicProfile";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      {user.role === "patient" ? (
        <div></div>
      ) : (
        <EditDoctorOrClinicProfile user={user} />
      )}
    </div>
  );
};

export default EditProfile;
