import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle } from 'react-icons/fa';

function Error() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center p-8 bg-red-100 rounded-lg shadow-md"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 10, -10, 0]
        }}
        transition={{ 
          duration: 0.5, 
          repeat: Infinity, 
          repeatDelay: 0.5 
        }}
        className="text-4xl text-red-500 mb-4"
      >
        <FaExclamationTriangle />
      </motion.div>
      <motion.p 
        className="text-xl text-red-700 font-semibold text-center"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        There was an error fetching questions.
      </motion.p>
      <motion.p 
        className="mt-4 text-red-600"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Please try again later or contact support if the problem persists.
      </motion.p>
    </motion.div>
  );
}

export default Error;