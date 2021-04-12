import axios from "axios";
import authAxios from "../helpers/authRefresh";

export const getHospitalStaff = async (hopstialId, setStaff, setLoader) => {
  try {
    setLoader && setLoader(true);
    const response = await axios.get(
      `${process.env.REACT_APP_BE_URL}/api/staff/${hopstialId}`
    );

    if (response.statusText === "OK") {
      setLoader && setLoader(false);
      setStaff(response.data);
    }
  } catch (error) {
    console.log(error);
  }
};

export const deleteHospitalStaff = async (staffId, hospitalId, setStaff) => {
  try {
    const response = await authAxios.delete(
      `${process.env.REACT_APP_BE_URL}/api/staff/${staffId}`,
      { withCredentials: true }
    );
    if (response.status === 203) {
      getHospitalStaff(hospitalId, setStaff);
    }
  } catch (error) {
    console.log(error.response.data);
  }
};

export const addHospitalStaff = async (doctorId, hopstialId, setStaff) => {
  try {
    const response = await authAxios.post(
      `${process.env.REACT_APP_BE_URL}/api/staff`,
      { doctor: doctorId },
      { headers: { "Content-Type": "application/json" }, withCredentials: true }
    );
    if (response.status === 201) {
      getHospitalStaff(hopstialId, setStaff);
    }
  } catch (error) {
    console.log(error.response.data);
  }
};
