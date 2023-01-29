import axios from "axios";
export const getToken = () =>
  localStorage.getItem("easyValuationToken")
    ? localStorage.getItem("easyValuationToken")
    : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;
const instance = axios.create({
  baseURL: "http://localhost:8080/refreshtoken",
  withCredentials: true,
});

instance.interceptors.request.use(async function (request) {
  request.headers.Authorization = getAuthorizationHeader();

  return request;
});

// const axiosRefresh = function () {
//   instance
//     .post(`http://localhost:8080/refreshtoken`)
//     .then((resp) => console.log(resp))
//     .catch((e) => console.error(`Error: ${e}`));
// };

instance.interceptors.response.use(
  async function (response) {
    console.log(response);
    localStorage.setItem(
      "easyValuationToken",
      response.data.easyValuationToken
    );

    localStorage.setItem(
      "easyValuationRefreshToken",
      response.data.easyValuationRefreshToken
    );
    return response;
  },
  async (error) => {
    throw error;
  }
);

export default instance;
