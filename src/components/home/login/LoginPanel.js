import React from "react";
import useInput from "../../inputMaterial/useInput";
import loginApi from "../../../api/loginApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "../../../actions/index.js";

const LoginPanel = ({ setIsLogged, routes }) => {
  const navigate = useNavigate();

  const { value: login, bind: bindLogin, reset: resetLogin } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const isLogged = useSelector((state) => state.isLogged);


  const dispatch = useDispatch();

  const handleSubmit = async (e, state) => {
    e.preventDefault();
    try {
      const res = await loginApi(
        "http://localhost:8080/login",
        login,
        password
      );

      console.log(res);
      if (res) {
        // let cookie;
        // for(const key of Object.keys(res){
        // })
        // document.cookies = res.headers.cookies;

        sessionStorage.setItem("easyValuationKey", res);
        // setIsLogged();
        dispatch(signIn());
        navigate(`/workbench`);
      } else {
        resetLogin();
        resetPassword();
        document.querySelector(".login__failure").classList.remove("hidden");
        setTimeout(() => {
          document.querySelector(".login__failure").classList.add("hidden");
        }, 5000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login__login-panel">
      <h2>Login</h2>
      <form onSubmit={(e) => handleSubmit(e, { login, password })}>
        <label>Login</label>
        <input type="text" placeholder="Enter login" {...bindLogin}></input>
        <label>Password</label>
        <input
          type="password"
          placeholder="Enter password"
          {...bindPassword}
        ></input>
        <input type="submit" value="Sign In"></input>
      </form>
      <p className="login__failure hidden">Wrong login or password!</p>

      {/* {isLoggedX ? <p>User is logged in</p> : <p>User is NOT logged in</p>}
      <button onClick={() => dispatch(signIn())}>Logging</button> */}

      <Link
        key={routes.find((route) => route.key === "/registration").key}
        to={routes.find((route) => route.path === "/registration").path}
      >
        Create an account
      </Link>
    </div>
  );
};

export default LoginPanel;
