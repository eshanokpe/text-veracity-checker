
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
          {/* Text Verification System */}
        </span>
        <h3 className="text-3xl md:text-4xl text-center font-bold text-gradient">
          PLAGIARISM DETECTION IN TEXT-BASED ASSIGNMENTS USING NATURAL LANGUAGE PROCESSING TECHNIQUE
        </h3>
      </div>
    </motion.header>
  );
};

export default Header;
