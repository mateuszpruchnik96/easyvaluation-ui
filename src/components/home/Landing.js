import React from "react";
import { AnimatedPresence, motion } from "framer-motion";

const Landing = ({ variants, transition, isLogged }) => {
  return (
    <motion.div
      className="landing"
      initial="out"
      animate="in"
      exit="out"
      variants={variants}
      transition={transition}
    >
      <h1>Simplify your job</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
        velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
        occaecat cupidatat non proident, sunt in culpa qui officia deserunt
        mollit anim id est laborum
      </p>
    </motion.div>
  );
};

export default Landing;
