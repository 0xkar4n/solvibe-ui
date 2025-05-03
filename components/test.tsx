'use client'
import React, { useEffect } from 'react'
import {AnimatePresenceProps, motion, useAnimate, useMotionValue, useTransform} from 'motion/react';
import { animate, AnimationSequence } from 'motion';

const Test=()=>{
const count = useMotionValue(0);

const rounded = useTransform(count, Math.round);

useEffect(() => {

  animate(count, 100, { duration: 10 });

}, []);

return <motion.h1 className='font-bold text-yellow-400 '>{rounded}</motion.h1>;
}

export default Test;