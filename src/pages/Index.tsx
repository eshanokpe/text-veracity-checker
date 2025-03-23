
import React from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import TextAnalyzer from "@/components/TextAnalyzer";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-b from-background to-secondary/20">
      <motion.div
        className="absolute inset-0 -z-10 h-full w-full bg-background"
        style={{
          backgroundImage: `radial-gradient(circle 400px at 50% 300px, rgba(65, 105, 225, 0.1), transparent)`,
          backgroundSize: "cover",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      
      <main className="flex-1 w-full container flex flex-col items-center justify-start pt-8 pb-16">
        <Header />
        
        <motion.div
          className="w-full max-w-3xl mx-auto my-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <div className="text-center mb-16 px-4">
            <motion.h2 
              className="text-3xl md:text-4xl font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Verify the Originality of Your Text
            </motion.h2>
            <motion.p 
              className="text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              Our advanced text verification system helps you ensure the authenticity of your content. 
              Simply paste your text or upload a document to analyze for originality.
            </motion.p>
          </div>
          
          <TextAnalyzer />
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
