import axios from "../helpers/authRefresh";

export const loginUser = async (body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/users/login`,
    body,
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return response;
};

export const getUserById = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BE_URL}/api/users/${id}`,
    {
      withCredentials: true,
    }
  );

  return response;
};

export const registerUser = async (body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/users/register`,
    body,
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );

  return response;
};

export const addRate = async (userId, body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/users/${userId}/addRating`,
    body,
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );

  return response;
};

export const editProfile = async (body) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BE_URL}/api/users/me`,
    body,
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );
  return response;
};

export const logOutUser = async () => {
  try {
    const response = await axios.post(
      `${process.env.REACT_APP_BE_URL}/api/users/logout`,
      {},
      { withCredentials: true }
    );
    return response;
  } catch (error) {
    console.log(error.response);
    return error.response.data;
  }
};

export const addPicture = async (body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/users/addProfilePic`,
    body,
    {
      withCredentials: true,
    }
  );
  return response;
};

export const getDoctorsAndClinics = async (query) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BE_URL}/api/users/doctorsAndClinics${query}`
  );
  return response;
};

export const addAllowedUser = async (id) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/users/${id}/addAllowedUser`,
    {},
    { withCredentials: true }
  );
  return response;
};
