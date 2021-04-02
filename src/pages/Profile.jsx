import React, { useState, useEffect } from "react";
import { getUserById } from "../api/usersApi";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProfileDoctorOrClinic from "../components/ProfileDoctorOrClinic";
import ProfilePatient from "../components/ProfilePatient";
import { useSelector } from "react-redux";

const Profile = () => {
  const params = useParams();
  const [loader, setLoader] = useState(true);
  const [profile, setProfile] = useState(null);
  const user = useSelector((state) => state.user);

  const getProfile = async () => {
    try {
      const response = await getUserById(params.id);
      if (response.statusText === "OK") {
        const user = response.data;
        setTimeout(() => {
          setProfile(user);

          setLoader(false);
        }, 3000);
      }
    } catch (error) {
      console.log(error.response.data);
      setTimeout(() => {
        setLoader(false);
      }, 3000);
    }
  };

  useEffect(() => {
    getProfile();
  }, [params.id, user]);

  return (
    <div>
      {loader && (
        <div className="waitingScreen">
          <Loader height="150px" />
        </div>
      )}
      {profile && (
        <div>
          {(profile.role === "doctor" || profile.role === "clinic") && (
            <ProfileDoctorOrClinic profile={profile} />
          )}
          {profile.role === "patient" && <ProfilePatient profile={profile} />}
        </div>
      )}
    </div>
  );
};

export default Profile;
