import axios from "axios";

let token = JSON.parse(sessionStorage.easyValuationKey).easyValuationToken;

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});
instance.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;
