'use client'
import React from 'react'
import { animate,motion } from 'motion/react'
import AnimatedButton from '@/components/animated-button'

const Basics = () => {
  return (
    <div className='bg-slate-300 min-h-screen flex items-center justify-center'>

    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.2 }}
      className="p-6 bg-black text-4xl font-bold text-white rounded-lg shadow">
        Hello everyone this is myt basics page for the motion code
        
    </motion.div>


    
    
    </div>
  )
}

export default Basics