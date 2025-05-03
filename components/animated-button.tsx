'use client'
import React, { useEffect } from 'react'
import {AnimatePresenceProps, motion, useAnimate} from 'motion/react';
import { AnimationSequence } from 'motion';

const AnimatedButton = () => {
   
    const [scope,animate ]=useAnimate();
    const sequence:AnimationSequence = [
      ["button",{width: "2rem", opacity:[0,1]},{duration: 0.2}]
    ]

    
    const startAnimation=()=>{
      animate(sequence)
    }

   
     
    




  return (
    <div>
      <button
   className='bg-blue-500 rounded-lg  p-4 w-6 h-8 text-cyan-300'
      >
      

        Send a transaction
        
      </button>


    </div>
  )
}

export default AnimatedButton