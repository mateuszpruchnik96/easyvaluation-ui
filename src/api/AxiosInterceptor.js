import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signOut } from "actions";

const instance = axios.create({
  baseURL: "http://localhost:8080/",
  withCredentials: true,
});

instance.defaults.headers.common["Content-Type"] = "application/json";

const AxiosInterceptor = ({ children }) => {
  const navigate = useNavigate();

  const getToken = () =>
    localStorage.getItem("easyValuationToken")
      ? localStorage.getItem("easyValuationToken")
      : null;

  const getAuthorizationHeader = () => `Bearer ${getToken()}`;

  const dispatch = useDispatch();

  const reqInterceptor = () => {
    instance.interceptors.request.use(async function (request) {
      console.log("REQUEST INTERCEPTOR WRAPPER");

      request.headers.Authorization = getAuthorizationHeader();

      return request;
    });
  };

  useEffect(() => {
    instance.interceptors.request.use(async function (request) {
      console.log("REQUEST INTERCEPTOR WRAPPER");

      request.headers.Authorization = getAuthorizationHeader();

      return request;
    });

    const resInterceptor = (response) => {
      console.log("RESPONSE INTERCEPTOR WRAPPER");

      return response;
    };

    const errInterceptor = async (error) => {
      console.log("INTERCEPTOR ERROR WRAPPER");
      if (error.response.status === 401) {
        // navigate("/login");
        console.log("INTERCEPTOR ERROR WRAPPER 1");

        const { config, message } = error.response;

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
          // .then((resp) => console.log(resp))
          .catch((e) => console.error(`ErrorX: ${e}`));

        console.log(refreshResponse);

        if (refreshResponse.status === 404) {
          localStorage.setItem("easyValuationToken", null);

          localStorage.setItem("easyValuationRefreshToken", null);

          dispatch(signOut());
          throw new Error(`Refresh response status: ${refreshResponse.status}`);
        } else if (refreshResponse.status === 200) {
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

          // return axios(newConfig);

          return refreshResponse;
        }
      } else if (error.response.status === 404) {
        throw new Error(`Project not found: ${error.response.status}`);
      } else if (error.response.status === 500) {
        throw new Error(`Server error: ${error.response.status}`);
      }

      return Promise.reject(error);
    };

    const interceptor = instance.interceptors.response.use(
      resInterceptor,
      errInterceptor
    );

    return () => instance.interceptors.response.eject(interceptor);
  }, [navigate]);

  return children;
};

export default instance;
export { AxiosInterceptor };
