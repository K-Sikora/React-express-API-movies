import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import NotFound from './NotFound'
import {motion, AnimatePresence} from 'framer-motion'
import { Link, useParams, useNavigate as RouterHistory, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faCircle, faChartColumn, faChevronDown, faListNumeric} from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import axios from 'axios'

const SingleItem = () => {

  const { item, id } = useParams()
  const [itemData, setItemData] = useState()
  const [notFound, setNotFound] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [keyword, setKeyword] = useState({})
  const [episodesVisible, setEpisodesVisible] = useState(false)
  const [error, setError] = useState()
  const [similar, setSimilar] = useState()
  const [isVisibleKeywords, setIsVisibleKeywords] = useState(false)




  useEffect(() => {
    axios.get(`http://localhost:8080/api/${item}/${id}`).
      then(response => {
        console.log(response.data)
        setItemData(response.data)
        setIsLoading(false)
      }
    ).catch(err => {
      console.log(err)
    })

  }, [item, id])

  useEffect(() => {
    axios.get(`http://localhost:8080/api/${item}/keywords/${id}`)
      .then(response => {
        console.log(response.data)
        setKeyword(response.data)
        setIsLoading(false)
      }
    ).catch(err => {
      console.log(err)

    })
    
  }, [item, id])


  useEffect(() => {
    axios.get(`http://localhost:8080/api/${item}/similar/${id}`)
      .then(response => {
      console.log(response.data)
      setSimilar(response.data)
      })
      .catch(err => {
      console.log(err)
    })
  }, [item, id])


  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });


  if (isLoading) {
    return <NotFound />
  }


  return (
    <div className='bg-stone-800 text-white'>
      <Navbar /> 
      <div className='max-w-6xl mx-auto'>
      {itemData && 
        <div className='min-h-screen gap-6 bg-stone-800 flex flex-col   py-5 px-0 justify-start'>
          <div className='px-5 flex flex-col gap-4'>
          <h2 className=' text-2xl md:text-4xl'>{itemData.name || itemData.title}</h2>
          <span className=' flex items-center gap-2'>
            <p className='text-base md:text-lg text-stone-300'>
              {itemData.release_date && itemData.release_date.slice(0, 4)}
              {itemData.first_air_date && itemData.first_air_date.slice(0, 4)}
            
            </p>
            <FontAwesomeIcon className='text-[6px] text-stone-200' icon={faCircle}></FontAwesomeIcon>
            {itemData.runtime && 
            <p className='flex gap-1 text-sm md:text-base  items-center text-stone-300'>
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
              {itemData.runtime}m
              </p>
            }
                {itemData.number_of_seasons && <h5 onMouseOverCapture={() => {
                  setEpisodesVisible(true)
                }} onMouseLeave={() => { setEpisodesVisible(false) }} className='flex gap-1 text-sm items-center relative cursor-default text-stone-300'>
                  {itemData.number_of_seasons === 1 ? itemData.number_of_seasons + ' Season' : itemData.number_of_seasons + ' Seasons'}
                  <FontAwesomeIcon className='text-white' icon={faListNumeric}></FontAwesomeIcon>
                  <AnimatePresence>
                    {episodesVisible && <motion.span
                      animate={{opacity:1}}
                      initial={{opacity:0}}
                      exit={{opacity:0}}
                      
                      className='absolute top-0 z-[61] text-sm flex flex-col left-full text-left mx-2 rounded-md bg-black/50 gap-1 min-w-max py-2 px-3'>
                    {itemData.seasons.map((season, index) => (
                      <p key={index}>Season {index +1}: <span className='text-stone-200'>{season.episode_count} episodes</span></p>
                      
                ))}

                  </motion.span>
                  }
                  </AnimatePresence>
                </h5>}
            </span>
            </div>
          <div className=' h-[60vh] relative md:mx-5  '>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original` + itemData.backdrop_path} alt='cover image' />
            <div className='absolute left-2 bottom-2 h-40  z-[60]'>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original` + itemData.poster_path} />
            </div>
            <div className='absolute flex items-center justify-center top-0 left-0 h-full w-full cursor-pointer duration-300 bg-black/20  hover:bg-black/40'>
              {/* <FontAwesomeIcon className='text-emerald-400 text-3xl cursor-pointer' icon={faPlay}></FontAwesomeIcon> */}
            </div>
            </div>
            {itemData.vote_average && keyword && <div className='flex items-center font-semibold gap-5  px-6'>
              <CircularProgressbar styles={buildStyles({
                textSize: '26px',
                textColor: 'white',
                trailColor: '#065f46',
                pathColor: '#34d399'
                
              })} className='h-12 w-12 ' value={itemData.vote_average * 10} text={`${itemData.vote_average.toFixed(1) * 10 + '%'}`}></CircularProgressbar>
              {itemData.popularity && <p className='flex gap-1 items-center'>
                <FontAwesomeIcon className='text-emerald-400 text-xl' icon={faChartColumn}></FontAwesomeIcon>
                {itemData.popularity.toFixed(2)}</p>}
              <div> 
                <button onClick={() => {
                  setIsVisibleKeywords(!isVisibleKeywords)
                }} className='flex items-center text-sm font-medium gap-2 cursor-pointer'>Keywords <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></button>
              </div>

            </div>}
            <AnimatePresence>
            {
                isVisibleKeywords && <motion.div
                  animate={{ opacity: 1 }}
                  initial={{opacity:0}}
                  exit={{opacity: 0}}
                  className='flex gap-4 flex-wrap  px-5'>
                {keyword.keywords && keyword.keywords.map((k, index) => (
                  <motion.button
                    animate={{ opacity: 1 }}
                    initial={{opacity:0}}
                    transition={{delay: index/20}}
                    key={index} className='capitalize text-stone-100 text-sm bg-stone-800 px-2 hover:bg-stone-700 transition-[background-color] duration-150 py-[1px] rounded-md '>{k.name}</motion.button>
              ))}
                {keyword.results && keyword.results.map((k, index) => (
                  <motion.button
                    animate={{ opacity: 1 }}
                    initial={{opacity:0}}
                    transition={{delay: index/20}}
                    key={index} className='capitalize text-stone-100 text-sm bg-stone-800 px-2 hover:bg-stone-700 transition-[background-color] duration-150 py-[1px] rounded-md '>{k.name}</motion.button>
              ))}
               </motion.div>
            }
            </AnimatePresence>
            <div> 

            <div className='flex gap-2 flex-wrap px-5'>
            {itemData.genres && itemData.genres.map((item, index) => (
              <button key={index} className='border-[2px] text-stone-200 font-normal border-stone-600 hover:border-stone-500 duration-300 px-4 text-sm py-2 rounded-full'>{item.name}</button>
            ))}
            
              </div>
          </div>
              <div className='px-5 font-[Roboto] pb-5'> 
                <p>{itemData.overview}</p>
            </div>
            {similar && <div className='px-5 flex flex-col gap-6'> 

            <h3 className='text-2xl text-emerald-50'>
              {item === 'movie' ? 'See similar movies' : 'See similar shows'}
            </h3>

              <Swiper
                autoHeight={true}
                slidesPerView={
                  windowWidth > 1280 ? 5 :
                  windowWidth > 768 ? 4 : 
                  windowWidth < 768 ? 3 : null
                
                }
                loop={true}
            spaceBetween={20}
            pagination={{
            clickable: true,
            }}
            className="mySwiper h-[80vh] w-full"
              >
                {similar.results && similar.results
                  .slice(0, 14)
                  .map((similarItem, index) => (
                    similarItem.backdrop_path && 
                    <SwiperSlide key={index} className=' flex relative items-end '>

                      <div className='absolute top-0 left-0'>
                        <Link
                            to={`/${item}/${similarItem.id}`}
                        >
                        <div className='relative '>
                      <img className='rounded-md' src={`https://image.tmdb.org/t/p/original` + similarItem.poster_path} alt='background photo' />
                              <div className='absolute bottom-2 left-2'>
                              <CircularProgressbar styles={buildStyles({
                textSize: '28px',
                textColor: 'white',
                trailColor: '#065f46',
                pathColor: '#34d399'
                
              })} className='h-10 w-10 bg-stone-800 rounded-full font-semibold ' value={similarItem.vote_average * 10} text={`${similarItem.vote_average.toFixed(1) * 10 + '%'}`}></CircularProgressbar>


                      </div>
                          </div>
                          </Link>
                      <h5 className='mt-2 font-medium text-base text-stone-100'>
                      {similarItem.name || similarItem.title}

                      </h5>
                      <h6 className='mt-2 font-medium text-base  text-stone-300'>
                      {similarItem.release_date && similarItem.release_date.slice(0,4)  || similarItem.first_air_date && similarItem.first_air_date.slice(0,4)}

                      </h6>

                      </div>
                      
                    </SwiperSlide>

                  ))
                }

            </Swiper>

            </div>
            }



          </div>
          
          
        }
        </div>
        

    </div>
  )
}

export default SingleItem