import axios from "axios";

export const getToken = () =>
  localStorage.getItem("easyValuationToken")
    ? localStorage.getItem("easyValuationToken")
    : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

instance.defaults.headers.common["Content-Type"] = "application/json";

instance.interceptors.request.use(async function (request) {
  request.headers.Authorization = getAuthorizationHeader();

  return request;
});

instance.interceptors.response.use(
  async function (response) {
    return response;
  },

  async (error) => {
    console.log("Response error interceptor", error);
    if (error.response.status === 401) {
      const { config, message } = error.response;
      // console.log(config);

      const refreshResponse = await axios
        .post(
          `http://localhost:8080/refreshtoken`,
          localStorage.easyValuationRefreshToken,
          {
            headers: {
              Authorization: `${getAuthorizationHeader()}`,
              "Content-Type": "text/plain",
            },
          }
        )

        .catch((e) => console.error(`ErrorX: ${e}`));

      if (refreshResponse.status !== 200) {
        localStorage.setItem("easyValuationToken", null);

        localStorage.setItem("easyValuationRefreshToken", null);
        throw new Error(`Refresh response status: ${refreshResponse.status}`);
      } else {
        localStorage.setItem(
          "easyValuationToken",
          refreshResponse.data.easyValuationToken
        );

        localStorage.setItem(
          "easyValuationRefreshToken",
          refreshResponse.data.easyValuationRefreshToken
        );

        const newConfig = error.config;
        newConfig.headers.Authorization = `Bearer ${refreshResponse.data.easyValuationToken}`;

        return axios(newConfig);
      }
    }
  }
);

export default instance;
