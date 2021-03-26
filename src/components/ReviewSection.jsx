import React, { useState, useEffect } from "react";
import { getReviews } from "../api/reviewsApi";

const ReviewSection = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getReviews("604ba7e31a95b940948ae915", setReviews);
  }, []);

  return (
    <div>
      {reviews.map((review, index) => (
        <div key={`${review._id}and${index}`} className="px-4 py-3">
          <div className="d-flex justify-content-start">
            <img
              src={review.reviewUser.image}
              alt="review avatar"
              className="img-fluid"
              style={{
                borderRadius: "50%",
                height: "40px",
                width: "40px",
                objectFit: "cover",
              }}
            />
            <h5 className="ml-3">
              {review.reviewUser.name} {review.reviewUser.surname}
            </h5>
          </div>
          <div className="reviewText shadow">
            <p className="mb-0">{review.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;
