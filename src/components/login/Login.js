import React from "react";
import LoginPanel from "../login/LoginPanel";
import { AnimatedPresence, motion } from "framer-motion";
import { Link, Route } from "react-router-dom";

const Login = ({ variants, transition, setIsLogged, routes }) => {
  return (
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
  );
};

export default Login;
