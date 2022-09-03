import React from "react";
import { motion } from "framer-motion";
import RegistrationPanel from "./RegistrationPanel";
import { useSelector } from "react-redux";
import Header from "../header/Header";

const Registration = ({ variants, routes, transition, setIsLogged }) => {
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
        <RegistrationPanel setIsLogged={setIsLogged} />
      </motion.div>
    </div>
  );
};

export default Registration;
