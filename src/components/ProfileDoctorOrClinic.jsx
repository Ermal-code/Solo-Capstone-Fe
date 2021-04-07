import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { getDoctorOrClinicAppointments } from "../api/appointmentApi";
import AboutSection from "./AboutSection";
import ProfileInfoCard from "./ProfileInfoCard";
import ReviewSection from "./ReviewSection";
import SchedueleAppointment from "./SchedueleAppointment";
import SectionSelector from "./SectionSelector";
import ExperienceSection from "./ExperienceSection";
import StaffSection from "./StaffSection";

const ProfileDoctorOrClinic = ({ profile }) => {
  const [sectionSelector, setSectionSelector] = useState(1);
  const [doctorAppointments, setDoctorAppointments] = useState([]);

  const getDoctorAppointments = async () => {
    try {
      const response = await getDoctorOrClinicAppointments(profile._id);
      if (response.statusText === "OK") {
        const appointments = response.data;
        setDoctorAppointments(appointments);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDoctorAppointments();
  }, []);

  return (
    <div className="mb-5">
      <Row>
        <Col lg={7}>
          <ProfileInfoCard profile={profile} />
          <SectionSelector
            profile={profile}
            sectionSelector={sectionSelector}
            setSectionSelector={setSectionSelector}
          />
          <div className="profileSection shadow">
            {sectionSelector === 1 && <AboutSection profile={profile} />}
            {sectionSelector === 2 &&
              (profile.role === "doctor" ? (
                <ExperienceSection userId={profile._id} />
              ) : (
                <StaffSection userId={profile._id} />
              ))}

            {sectionSelector === 3 && (
              <ReviewSection
                profile={profile}
                doctorAppointments={doctorAppointments}
              />
            )}
          </div>
        </Col>
        <Col lg={5}>
          <SchedueleAppointment
            profile={profile}
            doctorAppointments={doctorAppointments}
          />
        </Col>
      </Row>
    </div>
  );
};

export default ProfileDoctorOrClinic;
