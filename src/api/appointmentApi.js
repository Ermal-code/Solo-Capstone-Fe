import axiosAuth from "../helpers/authRefresh";
import axios from "axios";

export const addNewAppointment = async (body) => {
  const response = await axiosAuth.post(
    `${process.env.REACT_APP_BE_URL}/api/appointments`,
    body,
    { headers: { "Content-Type": "application/json" }, withCredentials: true }
  );
  return response;
};

export const getDoctorOrClinicAppointments = async (query) => {
  const response = await axiosAuth.get(
    `${process.env.REACT_APP_BE_URL}/api/appointments${query}`,
    { withCredentials: true }
  );
  return response;
};

export const getPatientAppointments = async (
  setPatientAppointments,
  setLinks,
  url,
  setLoader
) => {
  try {
    setLoader && setLoader(true);
    const response = await axiosAuth.get(
      `${process.env.REACT_APP_BE_URL}/api/appointments${url}`,
      { withCredentials: true }
    );

    if (response.statusText === "OK") {
      setPatientAppointments(response.data.appointments);
      setLinks(response.data.links);
      setLoader && setLoader(false);
    }
  } catch (error) {
    console.log(error.response.data);
    setPatientAppointments([]);
    setLinks(null);
    setLoader && setLoader(false);

    return error.response.data;
  }
};
