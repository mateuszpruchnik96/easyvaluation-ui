import React from "react";
import { motion } from "framer-motion";
import RegistrationPanel from "./RegistrationPanel";

const Registration = ({ variants, transition, setIsLogged }) => {
  return (
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
  );
};

export default Registration;
