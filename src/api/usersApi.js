import axios from "../helpers/authRefresh";

export const loginUser = async (body) => {
  const response = await fetch(
    `${process.env.REACT_APP_BE_URL}/api/users/login`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(body),
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
