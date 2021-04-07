import React, { useState, useEffect } from "react";
import { getUserById } from "../api/usersApi";
import { useHistory, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ProfileDoctorOrClinic from "../components/ProfileDoctorOrClinic";
import ProfilePatient from "../components/ProfilePatient";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Profile = () => {
  const history = useHistory();
  const params = useParams();
  const [loader, setLoader] = useState(true);
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState(null);
  const user = useSelector((state) => state.user);

  const getProfile = async () => {
    try {
      setLoader(true);
      const response = await getUserById(params.id);
      if (response.statusText === "OK") {
        const user = response.data;

        setProfile(user);

        setLoader(false);
      }
    } catch (error) {
      setError(error.response.data);

      setLoader(false);

      setTimeout(() => {
        history.goBack();
      }, 3000);
    }
  };

  useEffect(() => {
    getProfile();
  }, [params.id, user]);

  return (
    <div>
      {loader ? (
        <div className="waitingScreen">
          <Loader height="150px" />
        </div>
      ) : (
        <>
          {error && (
            <div className="mt-5 d-flex justify-content-center">
              <Alert variant="danger">
                {error.message}
                <br /> You will be redirected to previous page in 3 seconds
              </Alert>
            </div>
          )}
          {profile && (
            <div>
              {(profile.role === "doctor" || profile.role === "clinic") && (
                <ProfileDoctorOrClinic profile={profile} />
              )}
              {profile.role === "patient" && (
                <ProfilePatient profile={profile} />
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
