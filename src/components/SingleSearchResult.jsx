import React from "react";
import { useHistory } from "react-router";
import { roundedAvg } from "../helpers/helperFuctions";

const SingleSearchResult = ({ docOrhosp }) => {
  const history = useHistory();
  return (
    <div
      className="singleSearchResult mt-4 shadow"
      onClick={() => history.push(`/profile/${docOrhosp._id}`)}
    >
      <div>
        <img
          src={docOrhosp.image}
          style={{
            height: "80px",
            width: "80px",
            borderRadius: "50%",
            objectFit: "cover",
          }}
        />
      </div>
      <div className="ml-4 d-flex justify-content-between align-items-center w-100">
        <div>
          <h5>
            {docOrhosp.name} {docOrhosp.surname && docOrhosp.surname}
          </h5>
          <h6>{docOrhosp.specialization[0]}</h6>
          <div style={{ color: "#a0a0a0", minHeight: "50px" }}>
            <h6>
              {docOrhosp.street}, {docOrhosp.city}
              <br />
              {docOrhosp.state}
            </h6>
          </div>
        </div>
        <div className="d-none d-sm-block">
          {[1, 2, 3, 4, 5].map((star, index) => (
            <i
              key={`keyOfStar${star}${index}${docOrhosp._id}`}
              className={`${
                star <= roundedAvg(docOrhosp.rating.map((rate) => rate.rate))
                  ? "fas"
                  : "far"
              } fa-star`}
              style={{ fontSize: "24px", color: "#24acb8" }}
            ></i>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SingleSearchResult;
