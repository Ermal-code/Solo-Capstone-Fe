import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const refreshAuthLogic = (failedRequest) =>
  axios
    .post(
      `${process.env.REACT_APP_BE_URL}/api/users/refreshToken`,
      {},
      { withCredentials: true }
    )
    .then((tokenRefreshResponse) => {
      return Promise.resolve();
    });

createAuthRefreshInterceptor(axios, refreshAuthLogic);

export default axios;
