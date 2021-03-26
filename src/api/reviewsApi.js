import axios from "axios";

export const getReviews = async (id, setReviews) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}/api/reviews/${id}`
    );
    if (response.statusText === "OK") {
      console.log(response.data);
      setReviews(response.data);
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
