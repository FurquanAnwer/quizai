import React from 'react'
import { motion } from 'framer-motion'

interface ProgressItems {
  index : number;
  numQuestions : number;
  points : number;
  maxPossiblePoints : number;
  answer : number|null;
}


const Progress = ({ index, numQuestions, points, maxPossiblePoints, answer }:ProgressItems) => {
  const progress = ((index + Number(answer !== null)) / numQuestions) * 100

  return (
    <header className="w-full bg-white shadow-md rounded-lg p-4 mb-8">
      <div className="flex justify-between items-center mb-2">
        <p className="text-gray-600">
          Question <strong className="text-blue-600">{index + 1}</strong> / {numQuestions}
        </p>
        <p className="text-gray-600">
          <strong className="text-green-600">{points}</strong> / {maxPossiblePoints} points
        </p>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <motion.div
          className="bg-blue-600 h-2.5 rounded-full"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>
    </header>
  )
}

export default Progress