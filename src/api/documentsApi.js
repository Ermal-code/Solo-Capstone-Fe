import axios from "../helpers/authRefresh";

export const getPatientDocuments = async (patientId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BE_URL}/api/documents/${patientId}`,
    { withCredentials: true }
  );

  return response;
};
