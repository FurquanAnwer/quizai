import React from 'react'
import { motion } from 'framer-motion'

const Options = ({ question, dispatch, answer }) => {
  const hasAnswered = answer !== null

  return (
    <div className="grid gap-4 mt-8">
      {question.options.map((option, index) => (
        <motion.button
          key={option}
          className={`p-4 rounded-lg text-left transition duration-300 ${
            hasAnswered
              ? index === question.correctOption
                ? 'bg-green-500 text-white'
                : index === answer
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 text-gray-800'
              : 'bg-white text-gray-800 hover:bg-blue-100'
          } ${!hasAnswered && 'hover:shadow-md'}`}
          disabled={hasAnswered}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          whileHover={!hasAnswered ? { scale: 1.02 } : {}}
          whileTap={!hasAnswered ? { scale: 0.98 } : {}}
        >
          {option}
        </motion.button>
      ))}
    </div>
  )
}

export default Options