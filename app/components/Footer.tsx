import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

const Footer = ({ children }:{children : React.ReactNode}) => {
  return (
    <motion.footer
      className="mt-8 p-4 bg-gray-100 rounded-lg shadow-inner"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.footer>
  )
}

export default Footer