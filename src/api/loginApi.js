import axiosConfig from "./axiosConfig";
import axios from "axios";

const loginApi = async function (url, login, password) {
  try {
    //ZMIENIĆ NA AXIOS.POST - FETCH ZWRACA Response, AXIOS zwraca Json
    const res = await axiosConfig.post(url, {
      login: login,
      password: password,
    });

    if (res.status !== 200) throw new Error("Problem...", res);

    localStorage.setItem("easyValuationToken", res.data.easyValuationToken);
    localStorage.setItem(
      "easyValuationRefreshToken",
      res.data.easyValuationRefreshToken
    );

    console.log(JSON.stringify(res.data));
    return JSON.stringify(res.data);
  } catch (error) {
    console.error("Error :", error);
    return false;
  }
};

export default loginApi;
