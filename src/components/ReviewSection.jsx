import React, { useState, useEffect } from "react";
import { addReview, getReviews } from "../api/reviewsApi";
import { FormControl, Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import ReviewText from "./ReviewText";
import { addRate } from "../api/usersApi";

const ReviewSection = ({ profile, doctorAppointments }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const user = useSelector((state) => state.user);

  const submitReview = async () => {
    try {
      const response = await addReview(profile._id, { text: reviewText });
      if (response.status === 201) {
        setReviewText("");
        getReviews(profile._id, setReviews);
      }
    } catch (error) {
      console.log(error.response);
    }
  };

  const getRating = () => {
    const rate = rating
      ? rating
      : profile.rating.find((rate) => rate.user === user._id).rate;
    return rate;
  };

  const rateUser = async () => {
    try {
      await addRate(profile._id, { rate: rating });
    } catch (error) {
      console.log(error.response);
      if (error.response) {
        setRating(null);
      }
    }
  };

  useEffect(() => {
    getReviews(profile._id, setReviews);
  }, []);

  return (
    <div>
      {user && user._id === profile._id ? (
        <div></div>
      ) : (
        <div className="px-4 py-3">
          {user && (
            <div className="mb-4 d-flex justify-content-between">
              {profile.rating.find((rate) => rate.user === user._id) ||
              rating ? (
                <div className="addRating">
                  You rated this {profile.role} with:{" "}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={`keyOfStarand${star}`}
                      className={`${
                        star <= getRating() ? "fas" : "far"
                      } fa-star fa-2x`}
                      style={{ color: "#fcba03" }}
                      onClick={() => {
                        setRating(star);
                        setShowConfirm(true);
                      }}
                    ></i>
                  ))}
                </div>
              ) : (
                <div className="addRating">
                  You have yet to rate this {profile.role}
                  {[1, 2, 3, 4, 5].map((star) => (
                    <i
                      key={`keyOfStarOfOf${star}`}
                      className={`far fa-star fa-2x`}
                      style={{ color: "#fcba03" }}
                      onClick={() => {
                        setRating(star);
                        setShowConfirm(true);
                      }}
                    ></i>
                  ))}
                </div>
              )}
              {showConfirm && (
                <div>
                  <i
                    className="fas fa-times fa-2x mr-3"
                    style={{ color: "tomato" }}
                    onClick={() => {
                      setShowConfirm(false);
                      setRating(null);
                    }}
                  ></i>
                  <i
                    className="fas fa-check fa-2x"
                    onClick={() => {
                      rateUser();
                      setShowConfirm(false);
                    }}
                    style={{ color: "green" }}
                  ></i>
                </div>
              )}
            </div>
          )}
          <FormControl
            as="textarea"
            aria-label="With textarea"
            rows="4"
            readOnly={
              !user ||
              doctorAppointments.filter(
                (appointment) => appointment.patient._id === user._id
              ).length === 0
            }
            value={
              user
                ? doctorAppointments.find(
                    (appointment) => appointment.patient._id === user._id
                  )
                  ? reviewText
                  : "You should have at least one appointment with this doctor to be able to leave rate and review"
                : "You need to log in to leave a rate and review"
            }
            onChange={(e) => setReviewText(e.currentTarget.value)}
          />
          <Button
            variant="success"
            className="mt-3"
            disabled={
              !user ||
              doctorAppointments.filter(
                (appointment) => appointment.patient._id === user._id
              ).length === 0
            }
            onClick={() => submitReview()}
          >
            Submit
          </Button>
        </div>
      )}
      {reviews.map((review, index) => (
        <ReviewText
          review={review}
          key={`${review._id}and${index}`}
          user={user}
          getReviews={() => getReviews(profile._id, setReviews)}
        />
      ))}
    </div>
  );
};

export default ReviewSection;
