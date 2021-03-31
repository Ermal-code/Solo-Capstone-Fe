import axios from "axios";
import authAxios from "../helpers/authRefresh";

export const getExperiences = async (userId, setExperiences, setLoader) => {
  try {
    setLoader && setLoader(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}/api/experiences/${userId}`
    );
    if (response.statusText === "OK") {
      setExperiences(response.data.reverse());
      setLoader && setLoader(false);
    }
  } catch (error) {
    console.log(error.response.data);
    setLoader && setLoader(false);
    return error.response.data;
  }
};

export const addExperience = async (body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/experiences`,
    body,
    { withCredentials: true }
  );
  return response;
};

export const editExperience = async (body, experienceId) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BE_URL}/api/experiences/${experienceId}`,
    body,
    { withCredentials: true }
  );
  return response;
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
    return error.response.data;
  }
};
