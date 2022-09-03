import React from "react";
import LoginPanel from "./LoginPanel";
import { AnimatedPresence, motion } from "framer-motion";
import { Link, Route } from "react-router-dom";
import Header from "../header/Header";
import { useSelector } from "react-redux";

const Login = ({ variants, transition, setIsLogged, routes }) => {
  const isLogged = useSelector((state) => state.isLogged);

  return (
    <div>
      <Header routes={routes} isLogged={isLogged} />

      <motion.div
        className="login"
        initial="out"
        animate="in"
        exit="out"
        variants={variants}
        transition={transition}
      >
        <LoginPanel setIsLogged={setIsLogged} routes={routes} />
      </motion.div>
    </div>
  );
};

export default Login;
