import React, { useEffect, useState } from 'react'
import images from '../assets/images'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlayCircle} from '@fortawesome/free-solid-svg-icons'
import { AnimatePresence, motion } from 'framer-motion'
import axios from 'axios';
const Main = () => {

  const parentVariant = {
    visible: {
      opacity: 1,
      transition: {
        delay: 0.7,
        when: "beforeChildren",
        staggerChildren: 0.6
        
      }
    },
    hidden: {
      opacity: 0
    }
  }
  const childVariant = {
    visible: {
      opacity: 1,
    },
    hidden: {
      opacity: 0
    }
  }

  const [current, setCurrent] = useState(0)
  const [currentMovie, setCurrentMovie] = useState([])
  const [currentShow, setCurrentShow] = useState([])
  const [currentTopRatedMovie,setCurrentTopRatedMovie ] = useState([])
  const [currentTopRatedShow,setCurrentTopRatedShow ] = useState([])
  const [currentPopularMovie,setCurrentPopularMovie ] = useState([])
  const [currentPopularShow,setCurrentPopularShow ] = useState([])
  const [selectShow, setSelectShow] = useState()
  const [selectMovie, setSelectMovie] = useState()
  useEffect(() => {
   const id = setInterval(() => {
     if (current < images.length -1) {
       setCurrent(current + 1)
      }
      else {
        setCurrent(0)
      }
      
    }, 6000);
    
    return () => clearInterval(id)
    
  }, [current])

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/popular-movies")
      .then((response) => {
        setCurrentMovie(response.data.results);
        setCurrentPopularMovie(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    axios
      .get("http://localhost:8080/api/popular-shows")
      .then((response) => {
        setCurrentShow(response.data.results);
        setCurrentPopularShow(response.data.results);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(() => {

    axios
      .get('http://localhost:8080/api/top-rated-shows')
      .then(response => {
        setCurrentTopRatedShow(response.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])
  useEffect(() => {

    axios
      .get('http://localhost:8080/api/top-rated-movies')
      .then(response => {
        setCurrentTopRatedMovie(response.data.results)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])




  
const updateSelectShow = (e) => {
  setSelectShow(e.target.value)
}
useEffect(() => {
  if (selectShow == 'Popular shows') {
    setCurrentShow(currentPopularShow)
  } else if (selectShow == 'Best rated shows') {
    setCurrentShow(currentTopRatedShow)
  }

}, [selectShow])
  
const updateSelectMovie = (e) => {
  setSelectMovie(e.target.value)
}
useEffect(() => {
  if (selectMovie == 'Popular movies') {
    setCurrentMovie(currentPopularMovie)
  } else if (selectMovie == 'Best rated movies') {
    setCurrentMovie(currentTopRatedMovie)
  }

}, [selectMovie])
  
  
  
  
  return (
    <div className='h-screen relative bg-black overflow-hidden   '>
      {images.map((image, index) => (
        <AnimatePresence key={index}>{
          index == current && (
            <motion.img initial={{opacity:0}} animate={{opacity: 1}} exit={{ opacity: 0 }} transition={{ duration: 2 }} key={index} src={image.link} className='absolute top-0 left-0 object-cover w-full h-full' alt='cover photo' />
            
            )
            
          }
          </AnimatePresence>
      )
      
      )}
      

      <div className='absolute top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.7)]'>
        
      </div>
      
      <div className='h-full w-full max-w-5xl left-1/2 px-5 top-0 mt-12 font-normal md:gap-2 gap-6 -translate-x-1/2 absolute flex items-center justify-center z-40 text-stone-200'>
        <motion.div variants={parentVariant} animate="visible" initial="hidden"  className=' relative justify-center items-start w-1/2 h-4/5  flex-wrap flex flex-col gap-2 hide3last  '>
          <motion.div variants={childVariant} className=' justify-center items-end absolute top-1 left-0  p-1 flex  '>

          <select onChange={updateSelectShow} id='select_show' className='text-black px-2 text-sm md:text-base font-medium md:px-4 py-1 rounded-md focus:outline-none '>
            <option id="Popular_shows">Popular shows</option>
            <option id="Best_rated_shows">Best rated shows</option>
          </select>
          </motion.div>
          
          {currentShow
            .filter(item => item.vote_average>5)
            .slice(1,7)
            .map((item, index) => {
              return <motion.div key={index} variants={childVariant} animate="visible" initial="hidden" transition={{duration: index/4+0.5, delay: index/4+0.5}} className='rounded-xl shadow-lg shadow-stone-900 border-white h-1/4 md:w-5/12  w-full p-2 flex cursor-pointer relative'>
                <h2 className='absolute z-40 font-medium font-[Roboto]  pointer-events-none text-base '>{item.name}</h2>
              <img src={`https://image.tmdb.org/t/p/original` + item.poster_path} className=' rounded-xl absolute top-0 left-0 h-full w-full object-cover -z-10' />
              <span className='w-full h-full rounded-xl bg-[rgba(0,0,0,0.344)] hover:bg-[rgba(0,0,0,0.05)] transition-all ease-in duration-300 absolute left-0 top-0 '></span>
                <FontAwesomeIcon className=' self-end pointer-events-none right-0 p-2 text-stone-300 text-2xl absolute ' icon={faPlayCircle}></FontAwesomeIcon>
                <h4 className=' text-sm font-semibold absolute bottom-1 bg-sky-700 px-2 rounded-lg'>{item.vote_average}</h4>
            </motion.div>
            })}
          

      </motion.div>
        <motion.div variants={parentVariant} animate="visible" initial="hidden" className='relative justify-center items-end hide3last w-1/2 h-4/5  md:flex-wrap flex flex-col gap-2 '>

        <motion.div variants={childVariant} className=' justify-center items-end absolute top-1 left-0 md:left-8  p-1 flex '>
        <select onChange={updateSelectMovie}  id='select_movie' className='text-black font-medium px-2 text-sm md:text-base md:px-4 py-1  rounded-md focus:outline-none '>
            <option id="Popular_movies">Popular movies</option>
            <option  id="Best_rated_movies">Best rated movies</option>
          </select>
          </motion.div>
          {currentMovie
            .filter(item => item.vote_count > 1000)
            .slice(0, 6)
            .map((item, index) => {
            return <motion.div key={index} variants={childVariant} animate="visible" initial="hidden" transition={{delay: index/4 + 0.5, duration: index/4 +0.5}}  className=' rounded-xl shadow-lg shadow-stone-900 border-white h-1/4 md:w-5/12 w-full p-2 flex cursor-pointer  relative'>
              <h2 className='absolute z-40 font-medium font-[Roboto] pointer-events-none text-base'>{ item.title }</h2>
            <img src={`https://image.tmdb.org/t/p/original` + item.poster_path} className='rounded-xl absolute top-0 left-0 h-full w-full object-cover -z-10' />
            <span className='w-full h-full rounded-xl bg-[rgba(0,0,0,0.344)] hover:bg-[rgba(0,0,0,0.05)] transition-all ease-in duration-300 absolute left-0 top-0 '></span>
            <FontAwesomeIcon className=' self-end pointer-events-none text-stone-300 right-0 pr-2 text-2xl absolute ' icon={faPlayCircle}></FontAwesomeIcon>
            <h4 className=' text-sm font-semibold absolute bottom-1 bg-sky-700 px-2 rounded-lg'>{item.vote_average}</h4>
          </motion.div>
              })
            
            }
          
          
          
      </motion.div>
      </div>


    </div>
  )
}

export default Main