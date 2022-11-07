import React from "react";
import LoginPanel from "./LoginPanel";
import { motion } from "framer-motion";
import Header from "../header/Header";
import { useSelector } from "react-redux";

const Login = ({ variants, transition, setIsLogged, routes }) => {
  const isLogged = useSelector((state) => {
    console.log(state);

    return state.isLogged;
  });

  return (
    <div className="homeContainer">
      <Header routes={routes} isLogged={isLogged} />

      <motion.div
        className="login"
        initial="out"
        animate="in"
        exit="out"
        variants={variants}
        transition={transition}
      >
        <LoginPanel
          setIsLogged={setIsLogged}
          routes={routes}
          variants={variants}
          transition={transition}
        />
      </motion.div>
    </div>
  );
};

export default Login;
