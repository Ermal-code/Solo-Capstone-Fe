import axios from "axios";
import authAxios from "../helpers/authRefresh";

export const getEducations = async (userId, setEducations) => {
  try {
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}/api/educations/${userId}`
    );
    if (response.statusText === "OK") {
      setEducations(response.data.reverse());
    }
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};

export const addEducation = async (body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/educations`,
    body,
    { withCredentials: true }
  );
  return response;
};

export const editEducation = async (body, educationId) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BE_URL}/api/Educations/${educationId}`,
    body,
    { withCredentials: true }
  );
  return response;
};

export const deleteEducation = async (educationId, userId, setEducations) => {
  try {
    const response = await authAxios.delete(
      `${process.env.REACT_APP_BE_URL}/api/experiences/${educationId}`,
      { withCredentials: true }
    );
    if (response.status === 203) {
      getEducations(userId, setEducations);
    }
  } catch (error) {
    console.log(error.response.data);
    return error.response.data;
  }
};
