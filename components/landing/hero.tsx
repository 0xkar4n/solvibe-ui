"use client"
import React from 'react'
import { motion } from "framer-motion"
import { Spotlight } from '../ui/spotlight-new'
import { Cover } from '../ui/cover'
import { Badge } from '../ui/badge'
import { PulsatingButton } from '../ui/pulsating-button'

const Hero = () => {
  return (
    <div className="h-screen z-10 flex items-center justify-center  bg-black text-white relative overflow-hidden">
      <div className="absolute inset-0">
        <Spotlight />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 flex flex-col items-center text-center space-y-6 max-w-[700px] pl-4"
      >
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <Badge className=" py-1.5 px-4  bg-neutral-500/20 text-purple-300  border border-dashed border-neutral-300 backdrop-blur-sm hover:text-neutral-500 hover:bg-neutral-500/40">
              <span className="mr-1 text-purple-400">✦</span> Built for Solana Dev's
            </Badge>
          </motion.div>

        <h1 className="max-w-5xl bg-gradient-to-br from-white to-gray-400 sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight bg-clip-text text-center text-3xl font-medium leading-tight text-transparent ">
          Built Solana Dapps at
          <span>
            {" "}  Lightning <Cover>Speed</Cover>
          </span>
        </h1>

        <p className="max-w-[600px] text-lg md:text-xl text-gray-400">
          SolVibe provides beautiful, accessible, and customizable components that make it easy to build modern
          Solana applications.
        </p>

        <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
          <PulsatingButton className='bg-white text-black font-sans font-semibold text-sm '>
            Explore Components
          </PulsatingButton>

        </div>
      </motion.div>

    </div>
  )
}

export default Hero;