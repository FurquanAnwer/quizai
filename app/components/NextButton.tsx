import React from 'react'
import { motion } from 'framer-motion'
import { FaArrowRight, FaFlag } from 'react-icons/fa'

const NextButton = ({ dispatch, answer, index, numQuestions }) => {
  if (answer === null) return null

  const isLastQuestion = index === numQuestions - 1

  return (
    <motion.button
      className={`px-6 py-3 rounded-full font-bold text-lg shadow-lg transition duration-300 flex items-center space-x-2 ${
        isLastQuestion
          ? 'bg-green-500 hover:bg-green-600 text-white'
          : 'bg-blue-500 hover:bg-blue-600 text-white'
      }`}
      onClick={() => dispatch({ type: isLastQuestion ? "finish" : "nextQuestion" })}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 50 }}
    >
      <span>{isLastQuestion ? 'Finish' : 'Next'}</span>
      {isLastQuestion ? <FaFlag className="ml-2" /> : <FaArrowRight className="ml-2" />}
    </motion.button>
  )
}

export default NextButton