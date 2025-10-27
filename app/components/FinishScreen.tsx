import React from 'react'
import { motion, number } from 'framer-motion'
import { FaRedo } from 'react-icons/fa'


type ActionType= {
  type : "restart";
}

interface FinishScreenItems {
  points : number;
  maxPossiblePoints : number;
  highscore : number;
  dispatch : React.Dispatch<ActionType>;
}

const FinishScreen = ({ points, maxPossiblePoints, highscore, dispatch }:FinishScreenItems) => {
  const percentage = (points / maxPossiblePoints) * 100
  
  const getEmoji = () => {
    if (percentage === 100) return "🎖"
    if (percentage >= 80) return "🍬"
    if (percentage >= 50) return "🙃"
    if (percentage > 0) return "😣"
    return "💩"
  }

  const getColor = () => {
    if (percentage >= 80) return 'text-green-500'
    if (percentage >= 50) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-4xl font-bold mb-6">Quiz Completed!</h2>
      <p className={`text-3xl ${getColor()} mb-4`}>
        <span className="text-5xl mr-2">{getEmoji()}</span>
        You scored <strong>{points}</strong> out of {maxPossiblePoints}
      </p>
      <p className="text-xl mb-6">
        ({Math.ceil(percentage)}%)
      </p>
      <p className="text-gray-600 mb-8">
        Highscore: <strong>{highscore}</strong> points
      </p>
      <motion.button
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg transition duration-300 flex items-center justify-center mx-auto"
        onClick={() => dispatch({ type: "restart" })}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaRedo className="mr-2" />
        Restart Quiz
      </motion.button>
    </motion.div>
  )
}

export default FinishScreen