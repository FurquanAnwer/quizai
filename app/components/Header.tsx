import React from 'react';
import { motion } from 'framer-motion';
import { FaReact } from 'react-icons/fa';

function Header() {
  return (
    <motion.header 
      className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 shadow-lg"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mr-4 text-white text-4xl"
        >
          <FaReact />
        </motion.div>
        <motion.h1 
          className="text-3xl font-bold text-white"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          The React Quiz
        </motion.h1>
      </div>
    </motion.header>
  );
}

export default Header;