import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getUserById } from "../api/usersApi";
import AboutSection from "./AboutSection";
import ProfileInfoCard from "./ProfileInfoCard";
import ReviewSection from "./ReviewSection";
import SchedueleAppointment from "./SchedueleAppointment";
import SectionSelector from "./SectionSelector";

const ProfileDoctorOrClinic = () => {
  const [profile, setProfile] = useState(null);
  const [sectionSelector, setSectionSelector] = useState(1);

  const getProfile = async () => {
    try {
      const response = await getUserById("604ba7e31a95b940948ae915");
      if (response.statusText === "OK") {
        const user = response.data;
        setProfile(user);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {profile && (
        <Row>
          <Col md={7}>
            <ProfileInfoCard profile={profile} />
            <SectionSelector
              profile={profile}
              sectionSelector={sectionSelector}
              setSectionSelector={setSectionSelector}
            />
            <div className="profileSection shadow">
              {sectionSelector === 1 && <AboutSection profile={profile} />}
              {sectionSelector === 3 && <ReviewSection profile={profile} />}
            </div>
          </Col>
          <Col md={5}>
            <SchedueleAppointment profile={profile} />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProfileDoctorOrClinic;
