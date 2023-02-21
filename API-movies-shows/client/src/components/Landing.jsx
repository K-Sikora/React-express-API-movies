import React, { useState, useEffect } from 'react'
import {AnimatePresence, motion} from 'framer-motion'
import axios from 'axios'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation, EffectFade } from "swiper";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faStar, faPlay} from '@fortawesome/free-solid-svg-icons'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import 'swiper/swiper-bundle.css';
import {useQuery} from 'react-query'
import { Link } from 'react-router-dom';
const Landing = () => {

  const { data: trendingWeek, isLoading, isError } = useQuery('trendingWeek', async () => {
    const response = await axios.get('http://localhost:8080/api/trending-week')
    return response.data.results
  })
   
  const handleSwiperInit = (swiper) => {
    swiper.autoplay.start();

    setInterval(() => {
      if (swiper.params) {
        swiper.slideNext();

      }
    }, 6000);


  };

  return (
    <div className='h-screen relative max-w-6xl mx-auto mt-0 p-2 md:px-5 rounded-md '>
      
      <Swiper
        
        onInit={(swiper) => handleSwiperInit(swiper)}
        draggable={false}
        navigation={true}
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 6000,
          disableOnInteraction: true,
              }}
        loop={true}
        effect="fade"
        pagination={{
          clickable: true,
        }}
        
        modules={[Autoplay, Pagination, Navigation, EffectFade]}
        className="mySwiper shadow-xl shadow-neutral-800 h-5/6  bg-neutral-900 relative"
      >
        {trendingWeek && trendingWeek
          .filter(item => item.popularity>1000)
          .map((item, index) => (
          <SwiperSlide key={index}>
              <div className='w-full h-full relative group'>
                <img className='h-full w-full  object-cover top-0 left-0' src={`https://image.tmdb.org/t/p/original` + item.backdrop_path} alt='cover image' />
            <Link to={`/${item.media_type}/${item.id}`}>
                
          <div className='absolute top-0 left-0 bg-black/50 w-full h-full z-50  hover:bg-black/20 duration-300 cursor-pointer '></div>
                <div className='absolute w-full left-0  bottom-[10%] gap-3 flex  pointer-events-none z-[100]'>
                  <div className='w-10% '>
                  <div className=' h-40 w-24 '>
                    <img className='w-full h-full' src={`https://image.tmdb.org/t/p/w200` + item.poster_path} alt="poster image" />
                  </div>

                  </div>
                  <div className='flex w-90% justify-evenly flex-col '>
                    <h3 className='text-white text-xl font-medium font-[Roboto]'>{item.title || item.name}</h3>
                    <FontAwesomeIcon className=' self-start text-white border-2 duration-500 group-hover:border-emerald-500 rounded-full w-4 h-4 p-2 ' icon={faPlay}></FontAwesomeIcon>
                    <div className='flex items-center gap-2  '>
                      <FontAwesomeIcon className=' text-emerald-500 text-lg' icon={faStar}></FontAwesomeIcon>
                      <h4 className='text-white text-lg font-medium font-[Roboto]'>{item.vote_average.toFixed(1)}</h4>
                    </div>
                  </div>

                </div>
                </Link>
             </div>

          </SwiperSlide>
        ))}
              
      </Swiper>

    </div>
  )
}

export default Landing