
import React from "react";
import { motion } from "framer-motion";

const Header = () => {
  return (
    <motion.header 
      className="w-full py-6 px-4 flex justify-center items-center"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex flex-col items-center">
        <span className="text-xs uppercase tracking-wider text-muted-foreground mb-2">
          Text Verification System
        </span>
        <h1 className="text-4xl md:text-5xl font-bold text-gradient">Veracity</h1>
      </div>
    </motion.header>
  );
};

export default Header;
