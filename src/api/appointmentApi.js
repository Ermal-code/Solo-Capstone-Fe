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

export const getDoctorOrClinicAppointments = async (id) => {
  const response = await axios.get(
    `${process.env.REACT_APP_BE_URL}/api/appointments/doctorOrClinicAppointments/${id}`
  );
  return response;
};

export const getPatientAppointments = async (
  setPatientAppointments,
  setLinks,
  offset,
  filterQuery,
  setLoader
) => {
  try {
    setLoader(true);
    const response = await axiosAuth.get(
      `${process.env.REACT_APP_BE_URL}/api/appointments/patientAppointments/${filterQuery}?limit=10&offset=${offset}`,
      { withCredentials: true }
    );

    if (response.statusText === "OK") {
      setPatientAppointments(response.data.appointments);
      setLinks(response.data.links);
      setLoader(false);
    }
  } catch (error) {
    console.log(error.response.data);
    setPatientAppointments([]);
    setLinks(null);
    setLoader(false);

    return error.response.data;
  }
};
