import React, { useEffect } from 'react'
import Navbar from './Navbar'
import {motion, useCycle} from 'framer-motion'
const NotFound = () => {


  const [opacity, cycleOpacity] = useCycle(0, 1);
  useEffect(() => {
    const interval = setInterval(() => {
      cycleOpacity();
    }, 700);
    return () => clearInterval(interval);
  }, [cycleOpacity]);
  
  return (
    <>
        <Navbar />
      <div className='bg-stone-900 min-h-screen gap-4 flex items-center -mt-16 md:-mt-20 justify-center'>
        <motion.div
          animate={{opacity}}
          transition={{ duration: 0.15, delay:0.1, ease: 'easeIn' }}
          className='bg-emerald-500 w-6 h-6 rounded-full'>

        </motion.div>
        <motion.div
          animate={{opacity}}
          transition={{ duration: 0.15, delay:0.2, ease: 'easeIn' }}
          className='bg-emerald-500 w-6 h-6 rounded-full'>

        </motion.div>
        <motion.div
          animate={{opacity}}
          transition={{ duration: 0.15, delay:0.3, ease: 'easeIn' }}
          className='bg-emerald-500 w-6 h-6 rounded-full'>

        </motion.div>

    </div>
    </>
  )
}

export default NotFound