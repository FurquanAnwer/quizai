// import React from 'react'

// const StartScreen = ({numQuestions,dispatch}) => {
//   return (
//     <div className='start'>
//         <h2>Welcome to the React Quiz!</h2>
//         <h3>{numQuestions} questions to test your React mastery</h3>
//         <button className='btn btn-ui' onClick={()=>dispatch({type:"start"})}>Lets start</button>
//     </div>
//   )
// }

// export default StartScreen


import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaReact, FaRocket } from 'react-icons/fa'

const StartScreen = ({ numQuestions, dispatch }) => {
  const [showButton, setShowButton] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => setShowButton(true), 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => (prev < 100 ? prev + 1 : 100))
    }, 20)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 text-white p-4 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        className="absolute top-0 left-0 h-2 bg-yellow-400"
      />
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center relative z-10"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-50px] left-[-50px] text-6xl text-blue-300 opacity-50"
        >
          <FaReact />
        </motion.div>
        <h1 className="text-6xl font-bold mb-6 tracking-tight">Master React</h1>
        <h2 className="text-2xl mb-8 font-light">
          Prove your expertise with <span className="font-semibold">{numQuestions}</span> mind-bending questions!
        </h2>
        <AnimatePresence>
          {showButton && (
            <motion.button
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(255,255,255,0.5)" }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-purple-700 font-bold py-4 px-8 rounded-full text-xl shadow-lg hover:bg-purple-100 transition duration-300 flex items-center space-x-2"
              onClick={() => dispatch({ type: "start" })}
            >
              <span>Launch Quiz</span>
              <FaRocket className="text-2xl" />
            </motion.button>
          )}
        </AnimatePresence>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-12 text-sm max-w-md text-center"
      >
        <p className="mb-4">Are you ready to challenge yourself and become a true React master?</p>
        <p>Each question will test your knowledge of React concepts, best practices, and problem-solving skills. Good luck!</p>
      </motion.div>
      

    </div>
  )
}

export default StartScreen