'use client'
import React, { useEffect } from 'react'
import {AnimatePresenceProps, motion, useAnimate} from 'motion/react';
import { AnimationSequence } from 'motion';

const ButtonAnimation = () => {
    const [scope,animate ]=useAnimate();
    const sequence:AnimationSequence = [
        [".text",{display:"none"},{duration: 0.1}],
        ["button", {width: "0rem",borderRadius:"500px"},{duration: 0.3}],
        [".success", {opacity:1, scale:[1,1.2,1,0.8,1]},{duration: 0.8}],
      
    ]

    
    const startAnimation=()=>{
       
        animate(sequence)

    }
  return (
    <div ref={scope} className=' relative flex flex-col h-screen items-center justify-center'>
        
        

        <motion.button 
        onClick={()=>startAnimation()}
        style={{
            width:"30rem"
        }}
        className='bg-blue-400 text-white rounded-lg h-20  flex items-center justify-center'>
            <motion.span className='text font-bold text-2xl'>
                Send a transaction
            </motion.span>
        </motion.button>

        <motion.div 
        style={{
            opacity:0,
            scale: 0,
        }}
        className='success bg-blue-400 rounded-full inset-0 absolute h-20 w-20 m-auto'>


        </motion.div>


    </div>
  )
}

export default ButtonAnimation