import axios from "axios";

let token = null;
if (sessionStorage.easyValuationKey) {
  token = JSON.parse(sessionStorage.easyValuationKey).easyValuationToken;
} else {
  token = null;
}

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});
instance.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
instance.defaults.headers.common["Content-Type"] = "application/json";

export default instance;
