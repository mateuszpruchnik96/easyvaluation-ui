import axios from "axios";
// import { useDispatch } from "react-redux";
// import { signIn } from "actions";

// const dispatch = useDispatch();
let token = null;
if (localStorage.easyValuationToken) {
  token = localStorage.easyValuationToken;
  console.log(token);
} else {
  token = null;
}

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});
instance.defaults.headers.common[`Authorization`] = `Bearer ${token}`;
instance.defaults.headers.common["Content-Type"] = "application/json";

instance.interceptors.request.use(async function (request) {
  console.log("Request interceptor");
  return request;
});

instance.interceptors.response.use(
  async function (response) {
    console.log("Response interceptor");
    console.log(response);

    return response;
  },
  async (error) => {
    console.log("Response error interceptor", error);
    if (error.response.status === 401) {
      const { config, message } = error.response;
      console.log(config);

      const refreshResponse = await axios
        .post(
          `http://localhost:8080/refreshtoken`,
          localStorage.easyValuationRefreshToken,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "text/plain",
            },
          }
        )
        // .then((resp) => console.log(resp))
        .catch((e) => console.error(`ErrorX: ${e}`));

      console.log(refreshResponse);

      if (refreshResponse.status != 200) {
        throw new Error(`Refresh response status: ${refreshResponse.status}`);
      } else {
        console.log(localStorage.easyValuationToken);
        localStorage.setItem(
          "easyValuationToken",
          refreshResponse.data.easyValuationToken
        );
        console.log(refreshResponse.data.easyValuationToken);
        console.log(localStorage.easyValuationToken);

        localStorage.setItem(
          "easyValuationRefreshToken",
          refreshResponse.data.easyValuationRefreshToken
        );

        return () => axios(config);

        // return refreshResponse;
        // dispatch(signIn());
      }
    }
  }
);

export default instance;
