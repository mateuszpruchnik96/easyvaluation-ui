import React, { useEffect } from "react";
import useInput from "../../inputMaterial/useInput";
import loginApi from "../../../api/loginApi";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signInPending, signOut } from "../../../actions/index.js";
import { motion } from "framer-motion";

const LoginPanel = ({ setIsLogged, routes, variants, transition }) => {
  const navigate = useNavigate();

  const { value: login, bind: bindLogin, reset: resetLogin } = useInput("");
  const {
    value: password,
    bind: bindPassword,
    reset: resetPassword,
  } = useInput("");

  const isLogged = useSelector((state) => state.isLogged);

  const dispatch = useDispatch();

  useEffect(() => {
    // const loginPanelEl = document.querySelector(".login__login-panel");
    // if (isLogged == "PENDING") {
    //   loginPanelEl.classList.add("login__login-panel--pending");
    // } else {
    //   loginPanelEl.classList.remove("login__login-panel--pending");
    // }
  });

  const handleSubmit = async (e, state) => {
    e.preventDefault();
    try {
      dispatch(signInPending());

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
        // const resx = JSON.parse(res);
        // console.log(res);

        // localStorage.setItem("easyValuationToken", res);
        // localStorage.setItem("easyValuationRefreshToken", res);
        // setIsLogged();
        dispatch(signIn());
        navigate(`/workbench`);
      } else {
        dispatch(signOut());
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
    <div
      className={
        isLogged === "PENDING"
          ? "login__login-panel login__login-panel--pending"
          : "login__login-panel"
      }
    >
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
      {isLogged === "PENDING" && (
        <>
          <motion.div
            className="pending-background"
            initial="out"
            animate="in"
            exit="out"
            variants={{
              in: {
                opacity: 1,
              },
              out: {
                opacity: 0,
              },
            }}
            transition={transition}
          ></motion.div>

          <motion.div
            className="dots"
            initial="out"
            animate="in"
            exit="out"
            variants={variants}
            transition={transition}
          >
            <span></span>
            <span></span>
            <span></span>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default LoginPanel;
