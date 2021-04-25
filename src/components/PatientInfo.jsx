import React from "react";
import { Col, Row } from "react-bootstrap";

const PatientInfo = ({ profile }) => {
  const profileAddress = `${profile.city}, ${profile.state}`;

  const profileInfoArray = [
    { name: "Birthdate", value: profile.birthdate },
    { name: "Gender", value: profile.gender },
    { name: "Weight", value: `${profile.weight} kg` },
    { name: "Height", value: `${profile.height} cm` },
    { name: "Profession", value: profile.profession },
  ];

  const profileInfoArray2 = [
    { name: "Address", value: profileAddress },
    { name: "Martial status", value: profile.maritalStatus },
    { name: "Phone number", value: profile.phone },
    { name: "Socail number", value: profile.socialNumber },
    { name: "Email", value: profile.email },
  ];
  return (
    <div className="py-3 px-4">
      <h5 className="mt-3" style={{ color: "#6ca1d8" }}>
        Profile information
      </h5>
      <Row className="mt-3 pb-4 border-bottom border-mutted">
        <Col md="6">
          {profileInfoArray.map((info, index) => (
            <div
              className="d-flex justify-content-between align-items-center"
              key={`${profile._id}${info.name}and${index}`}
            >
              <p className="mb-1">{info.name}</p>
              <p className="mb-1">
                <strong>{info.value}</strong>
              </p>
            </div>
          ))}
        </Col>
        <Col md="6">
          {profileInfoArray2.map((info, index) => (
            <div
              className="d-flex justify-content-between align-items-center"
              key={`${profile._id}${info.name}and${index}`}
            >
              <p className="mb-1">{info.name}</p>
              <p className="mb-1">
                <strong>{info.value}</strong>
              </p>
            </div>
          ))}
        </Col>
      </Row>
      <Row className="pt-3">
        <Col md="4" className="border-right border-mutted">
          <h6 className="mt-3" style={{ color: "#6ca1d8" }}>
            Allergies
          </h6>

          <div className="d-flex justify-content-between ">
            <p>Food</p>
            <div>
              {profile.foodAllergies.map((allergie, index) => (
                <p
                  className="mb-1"
                  key={`${profile._id}${allergie}${index + 10}`}
                >
                  <strong>{allergie}</strong>
                </p>
              ))}
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3 mt-md-4">
            <p>Med.</p>
            <div>
              {profile.medicineAllergies.map((allergie, index) => (
                <p
                  className="mb-1"
                  key={`${profile._id}${allergie}${index + 10}`}
                >
                  <strong>{allergie}</strong>
                </p>
              ))}
            </div>
          </div>
        </Col>
        <Col md="4" className="border-right border-mutted">
          <h6 className="mt-3" style={{ color: "#6ca1d8" }}>
            Illnes
          </h6>
          <div className="d-flex justify-content-between">
            <p>Diabetes</p>
            <div>
              <p className="mb-1">
                <strong>{profile.diabetes}</strong>
              </p>
            </div>
          </div>
          <div className="d-flex justify-content-between mt-3 mt-md-5">
            <p>HyperTension</p>
            <div>
              <p className="mb-1">
                <strong>{profile.hypertension}</strong>
              </p>
            </div>
          </div>
        </Col>
        <Col md="4">
          <h6 className="mt-3" style={{ color: "#6ca1d8" }}>
            Surgical interventions
          </h6>
          {profile.surgicalInterventions.length > 0 ? (
            profile.surgicalInterventions.map((intervention, index) => (
              <p
                className="mb-1"
                key={`${profile._id}${intervention}and${index}`}
              >
                <strong>{intervention}</strong>
              </p>
            ))
          ) : (
            <p className="mb-1">
              <strong>None</strong>
            </p>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default PatientInfo;
