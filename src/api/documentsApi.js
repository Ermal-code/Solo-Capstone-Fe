import axios from "../helpers/authRefresh";

export const getPatientDocuments = async (patientId) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BE_URL}/api/documents/${patientId}`,
    { withCredentials: true }
  );

  return response;
};

export const addNewDocument = async (body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/documents/`,
    body,
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return response;
};

export const editNewDocument = async (documentId, body) => {
  const response = await axios.put(
    `${process.env.REACT_APP_BE_URL}/api/documents/${documentId}`,
    body,
    {
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    }
  );
  return response;
};

export const addFileDocument = async (documentId, body) => {
  const response = await axios.post(
    `${process.env.REACT_APP_BE_URL}/api/documents/${documentId}/addFile`,
    body,
    { withCredentials: true }
  );
  return response;
};

export const deleteDocument = async (documentId) => {
  const response = await axios.delete(
    `${process.env.REACT_APP_BE_URL}/api/documents/${documentId}`,
    { withCredentials: true }
  );
  return response;
};
