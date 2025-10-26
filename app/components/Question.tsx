import React from 'react'
import { motion } from 'framer-motion'
import Options from './Options'

const Question = ({ question, dispatch, answer }) => {
  return (
    <motion.div 
      className="bg-white rounded-lg shadow-lg p-6 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h4 
        className="text-2xl font-bold mb-6 text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {question.question}
      </motion.h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </motion.div>
  )
}

export default Question