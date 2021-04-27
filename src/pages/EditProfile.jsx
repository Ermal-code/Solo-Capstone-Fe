import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../api/usersApi";
import EditDoctorOrClinicProfile from "../components/EditDoctorOrClinicProfile";
import EditPatientProfile from "../components/EditPatientProfile";

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const setStoreUser = () => {
    dispatch(async (dispatch) => {
      try {
        const response = await getUserById("me");
        if (response.statusText === "OK") {
          dispatch({
            type: "SET_USER",
            payload: response.data,
          });
        }
      } catch (error) {
        console.log(error.response);
      }
    });
  };

  return (
    user && (
      <div
        style={{ borderRadius: "15px", background: "white" }}
        className="my-5 py-3 px-2  px-md-0"
      >
        {user.role === "patient" ? (
          <EditPatientProfile user={user} setStoreUser={setStoreUser} />
        ) : (
          <EditDoctorOrClinicProfile user={user} setStoreUser={setStoreUser} />
        )}
      </div>
    )
  );
};

export default EditProfile;
