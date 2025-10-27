import React from 'react';
import { motion, easeInOut } from 'framer-motion';

const loadingContainerVariants = {
  start: { transition: { staggerChildren: 0.2 } },
  end: { transition: { staggerChildren: 0.2 } },
};

const loadingCircleVariants = {
  start: { y: '0%' as string },
  end: { y: '100%' as string },
};

const loadingCircleTransition = {
  duration: 0.5,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: easeInOut, // ✅ fixed
};

const loadingTextVariants = {
  start: { opacity: 0.5 },
  end: { opacity: 1 },
};

const loadingTextTransition = {
  duration: 0.8,
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: easeInOut, // ✅ fixed
};

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
      <motion.div
        className="flex space-x-2 mb-4"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        {[1, 2, 3].map((index) => (
          <motion.span
            key={index}
            className="w-4 h-4 bg-white rounded-full"
            variants={loadingCircleVariants}
            transition={loadingCircleTransition}
          />
        ))}
      </motion.div>
      <motion.p
        className="text-white text-xl font-semibold"
        variants={loadingTextVariants}
        initial="start"
        animate="end"
        transition={loadingTextTransition}
      >
        Loading questions...
      </motion.p>
    </div>
  );
}
