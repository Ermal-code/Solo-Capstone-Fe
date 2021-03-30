import axios from "axios";
import authAxios from "../helpers/authRefresh";

export const getExperiences = async (userId, setExperiences) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}/api/experiences/${userId}`
    );
    if (response.statusText === "OK") {
      setExperiences(response.data.reverse());
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const deleteExperience = async (
  experienceId,
  userId,
  setExperiences
) => {
  try {
    const response = await authAxios.delete(
      `${process.env.REACT_APP_BE_URL}/api/experiences/${experienceId}`,
      { withCredentials: true }
    );
    if (response.status === 203) {
      getExperiences(userId, setExperiences);
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
