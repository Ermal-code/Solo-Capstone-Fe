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
        <Col md={5}>
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
        <Col md={7} className="profileInfoCard mt-2">
          <h3>
            {profile.role === "doctor" && "Dr. "}
            {profile.name} {profile.surname}
          </h3>
          <h5>
            {profile.specialization.map((specialization, index) => (
              <strong key={`${specialization._id}index${index}`}>
                {index === profile.specialization.length - 1
                  ? ` ${specialization}`
                  : ` ${specialization},`}
              </strong>
            ))}
          </h5>
          <div className="mt-3" style={{ color: "#739AA0" }}>
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
