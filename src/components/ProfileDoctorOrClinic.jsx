import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getDoctorOrClinicAppointments } from "../api/appointmentApi";
import { getUserById } from "../api/usersApi";
import AboutSection from "./AboutSection";
import ProfileInfoCard from "./ProfileInfoCard";
import ReviewSection from "./ReviewSection";
import SchedueleAppointment from "./SchedueleAppointment";
import SectionSelector from "./SectionSelector";

const ProfileDoctorOrClinic = () => {
  const [profile, setProfile] = useState(null);
  const [sectionSelector, setSectionSelector] = useState(1);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

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

  const getDoctorAppointments = async () => {
    try {
      const response = await getDoctorOrClinicAppointments(
        "604ba7e31a95b940948ae915"
      );
      if (response.statusText === "OK") {
        const appointments = response.data;
        setDoctorAppointments(appointments);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getProfile();
    getDoctorAppointments();
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
              {sectionSelector === 3 && (
                <ReviewSection
                  profile={profile}
                  doctorAppointments={doctorAppointments}
                />
              )}
            </div>
          </Col>
          <Col md={5}>
            <SchedueleAppointment
              profile={profile}
              doctorAppointments={doctorAppointments}
            />
          </Col>
        </Row>
      )}
    </div>
  );
};

export default ProfileDoctorOrClinic;
