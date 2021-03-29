import React, { useState } from "react";
import { deleteReview, editReview } from "../api/reviewsApi";
import { FormControl, Button } from "react-bootstrap";

const ReviewText = ({ review, user, getReviews }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showEditReview, setShowEditReview] = useState(false);
  const [reviewText, setReviewText] = useState(review.text);

  const deleteTheREview = async () => {
    try {
      const response = await deleteReview(review._id);
      if (response.status === 203) {
        getReviews();
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const submitEdit = async () => {
    try {
      const response = await editReview(review._id, { text: reviewText });
      if (response.status === 200) {
        getReviews();
        setShowEditReview(false);
      }
    } catch (error) {
      console.log(error.response);
    }
  };
  return (
    <div className="px-4 py-3">
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
        {showEditReview ? (
          <>
            <div className="w-100">
              <FormControl
                as="textarea"
                aria-label="With textarea"
                value={reviewText}
                onChange={(e) => setReviewText(e.currentTarget.value)}
              />
              <div className="mt-3 d-flex justify-content-end">
                <Button
                  variant="outline-primary mr-3"
                  onClick={() => setShowEditReview(false)}
                >
                  Cancel
                </Button>
                <Button variant="success" onClick={() => submitEdit()}>
                  Edit
                </Button>
              </div>
            </div>
          </>
        ) : (
          <>
            <p>{review.text}</p>
            {user && review.reviewUser._id === user._id && (
              <div style={{ position: "relative" }}>
                <i
                  className="fas fa-ellipsis-h"
                  onClick={() => setShowDropDown(!showDropDown)}
                ></i>
                {showDropDown && (
                  <div
                    className="navbarDropDown shadow"
                    style={{ left: "-70px", top: "20px" }}
                    onMouseLeave={() => setShowDropDown(false)}
                  >
                    <ul>
                      <li
                        onClick={() => {
                          setShowEditReview(true);
                          setShowDropDown(false);
                        }}
                      >
                        Edit
                      </li>
                      <li onClick={() => deleteTheREview()}>Delete</li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ReviewText;
