import React from "react";
import { Row, Col } from "react-bootstrap";

const ProfileInfoCard = ({ profile }) => {
  return (
    <Row
      className="mt-5 p-3"
      style={{ border: "2px solid black", borderRadius: "15px" }}
    >
      <Col md={4}>
        <img
          src={profile.image}
          className="img-fluid profileAvatar"
          alt="User avatar"
        />
      </Col>
      <Col md={8} className="profileInfoCard">
        <h3>
          {profile.name} {profile.surname}
        </h3>
        <h5>
          Specialist in:
          {profile.specialization.map((specialization, index) => (
            <strong key={`${specialization._id}index${index}`}>
              {profile.specialization.length > 1
                ? ` ${
                    index === profile.specialization.length - 1
                      ? `${specialization.field}`
                      : `${specialization.field},`
                  }`
                : ` ${specialization.field}`}
            </strong>
          ))}
        </h5>
        {(profile.role === "doctor" || profile.role === "clinic") && (
          <div className="mt-3" style={{ color: "#b9e9b2" }}>
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={`keyOfStar${star}`}
                className={`${
                  star <=
                  Math.round(
                    profile.rating
                      .map((rate) => rate.rate)
                      .reduce((acc, current) => acc + current, 0) /
                      profile.rating.length
                  )
                    ? "fas"
                    : "far"
                } fa-star fa-2x`}
              ></i>
            ))}
          </div>
        )}
      </Col>
    </Row>
  );
};

export default ProfileInfoCard;
