import axios from "axios";

let token = sessionStorage.easyValuationRefreshKey;
const instance = axios.create({
  baseURL: "http://localhost:8080/refresh",
  withCredentials: true,
});
instance.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
instance.defaults.headers.common["Content-Type"] = "application/json";

const axiosAuth = function () {
  instance
    .post(`http://localhost:8080/refreshtoken`)
    .then((resp) => console.log(resp))
    .catch((e) => console.error(`Error: ${e}`));
};

export default instance;
