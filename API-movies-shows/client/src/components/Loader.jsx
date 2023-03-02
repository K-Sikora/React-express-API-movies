import React from "react";
import { motion, useCycle } from "framer-motion";

const Loader = () => {
  const [opacity, cycleOpacity] = useCycle(0, 1);
  return (
    <div className="flex items-center justify-center gap-4 h-full z-50">
      <motion.div
        animate={{ opacity }}
        transition={{ duration: 0.15, delay: 0.1, ease: "easeIn" }}
        className="bg-emerald-500 w-6 h-6 rounded-full"
      ></motion.div>
      <motion.div
        animate={{ opacity }}
        transition={{ duration: 0.15, delay: 0.2, ease: "easeIn" }}
        className="bg-emerald-500 w-6 h-6 rounded-full"
      ></motion.div>
      <motion.div
        animate={{ opacity }}
        transition={{ duration: 0.15, delay: 0.3, ease: "easeIn" }}
        className="bg-emerald-500 w-6 h-6 rounded-full"
      ></motion.div>
    </div>
  );
};

export default Loader;
