
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer
      className="mt-16 mb-8 px-4 text-center text-muted-foreground"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8, duration: 0.5 }}
    >
      <div className="text-sm">
        <p>© {new Date().getFullYear()}  PLAGIARISM DETECTION IN TEXT-BASED ASSIGNMENTS USING NATURAL LANGUAGE PROCESSING TECHNIQUE</p>
        {/* <p className="mt-1">Designed with simplicity in focus.</p> */}
      </div>
    </motion.footer>
  );
};

export default Footer;
