import axios from "axios";
import authAxios from "../helpers/authRefresh";

export const getReviews = async (id, setReviews, setLoader) => {
  try {
    setLoader && setLoader(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}/api/reviews/${id}`
    );
    if (response.statusText === "OK") {
      setReviews(response.data.reverse());
      setLoader && setLoader(false);
    }
  } catch (error) {
    console.log(error.response.data);
    setLoader && setLoader(false);
    return error.response.data;
  }
};

export const addReview = async (id, body) => {
  const response = await authAxios.post(
    `${process.env.REACT_APP_BE_URL}/api/reviews/${id}`,
    body,
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );
  return response;
};

export const editReview = async (reviewId, body) => {
  const response = await authAxios.put(
    `${process.env.REACT_APP_BE_URL}/api/reviews/${reviewId}`,
    body,
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );
  return response;
};

export const deleteReview = async (reviewId) => {
  const response = await authAxios.delete(
    `${process.env.REACT_APP_BE_URL}/api/reviews/${reviewId}`,
    { withCredentials: true }
  );
  return response;
};
