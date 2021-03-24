import axios from "axios";

export const getSpecializations = async () => {
  const response = await axios.get(
    `${process.env.REACT_APP_BE_URL}/api/specializations`
  );
  return response;
};
