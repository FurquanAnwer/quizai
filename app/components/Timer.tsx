import React, { useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaClock } from 'react-icons/fa'

const Timer = ({ dispatch, secondsRemaining }) => {
  const mins = Math.floor(secondsRemaining / 60)
  const seconds = secondsRemaining % 60

  useEffect(() => {
    const id = setInterval(() => {
      dispatch({ type: 'tick' })
    }, 1000)
    return () => clearInterval(id)
  }, [dispatch])

  return (
    <motion.div
      className="flex items-center justify-center bg-white rounded-full shadow-md p-4"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <FaClock className="text-blue-500 mr-2" />
      <span className="text-2xl font-bold text-gray-800">
        {mins < 10 && "0"}
        {mins}:{seconds < 10 && "0"}
        {seconds}
      </span>
    </motion.div>
  )
}

export default Timer