import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

const refreshAuthLogic = (failedRequest) =>
  axios({
    url: `${process.env.REACT_APP_BE_URL}/refreshToken`,
    withCredentials: true,
    method: "get",
  }).then((tokenRefreshResponse) => {
    return Promise.resolve();
  });

createAuthRefreshInterceptor(axios, refreshAuthLogic);

export default axios;
