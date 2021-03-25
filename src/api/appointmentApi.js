import axios from "../helpers/authRefresh";

export const addNewAppointment = async (body) => {
  const response = await axios.post(
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
