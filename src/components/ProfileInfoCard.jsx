import React, { useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { roundedAvg } from "../helpers/helperFuctions";
import IdPin from "./IdPin";
import ModalUploadPicture from "./ModalUploadPicture";

const ProfileInfoCard = ({ profile }) => {
  const user = useSelector((state) => state.user);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="profileCardContainer shadow mt-5">
      <IdPin />
      <ModalUploadPicture show={show} handleClose={handleClose} />
      <Row className="p-5 ">
        <Col xs={12}>
          <img
            src={`${process.env.PUBLIC_URL}/profili_i_dokit2-02.jpg`}
            className="idBackground"
          />
        </Col>
        <Col md={4}>
          <div className="imageContainer">
            <img
              src={profile.image}
              className="profileAvatar"
              alt="User avatar"
            />
            {user && profile._id === user._id && (
              <div className="addProfileImage">
                <i className="fas fa-plus" onClick={() => handleShow()}></i>
              </div>
            )}
          </div>
        </Col>
        <Col md={8} className="profileInfoCard">
          <h3>
            {profile.role === "doctor" && "Dr. "}
            {profile.name} {profile.surname}
          </h3>
          <h5>
            {profile.specialization.map((specialization, index) => (
              <strong key={`${specialization._id}index${index}`}>
                {index === profile.specialization.length - 1
                  ? ` ${specialization.field}`
                  : ` ${specialization.field},`}
              </strong>
            ))}
          </h5>
        </Col>
        <Col xs={12}>
          <div
            className="mt-3 d-flex justify-content-end"
            style={{ color: "#739AA0" }}
          >
            {[1, 2, 3, 4, 5].map((star) => (
              <i
                key={`keyOfStar${star}`}
                className={`${
                  star <= roundedAvg(profile.rating.map((rate) => rate.rate))
                    ? "fas"
                    : "far"
                } fa-star fa-2x`}
              ></i>
            ))}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProfileInfoCard;
