import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import NotFound from './NotFound'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faCircle, faChartColumn} from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css';
import axios from 'axios'

const SingleItem = () => {

  const { item, id } = useParams()
  const [itemData, setItemData] = useState()
  const [notFound, setNotFound] = useState(false)
  
  useEffect(() => {
    axios.get(`http://localhost:8080/api/${item}/${id}`).then(
      response => {
        console.log(response.data)
        setItemData(response.data)
      }
    ).catch(err => {
      console.log(err)
      setNotFound(true)
    })

  }, [item, id])

  return (
    <div className='bg-stone-800 text-white'>
      <Navbar /> 
      <div className='max-w-6xl mx-auto'>
      {itemData && 
        <div className='h-[100vh] gap-4 bg-stone-800 flex flex-col  py-5 px-0 justify-start'>
          <div className='px-5 flex flex-col gap-4'>
          <h2 className=' text-2xl'>{itemData.name || itemData.title}</h2>
          <span className=' flex items-center gap-2'>
            <p className='text-base text-stone-300'>
              {itemData.release_date && itemData.release_date.slice(0, 4)}
              {itemData.first_air_date && itemData.first_air_date.slice(0, 4)}
            
            </p>
            <FontAwesomeIcon className='text-[6px] text-stone-200' icon={faCircle}></FontAwesomeIcon>
            {itemData.runtime && 
            <p className='flex gap-1 text-sm  items-center text-stone-300'>
              <FontAwesomeIcon icon={faClock}></FontAwesomeIcon>
              {itemData.runtime}m
              </p>
            }
            {itemData.number_of_seasons && <p className='flex gap-1 text-sm items-center text-stone-300'>
              {itemData.number_of_seasons === 1 ? itemData.number_of_seasons + ' Season' : itemData.number_of_seasons + ' Seasons'}
              </p>}
            </span>
            </div>
          <div className='h-4/6 relative'>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original` + itemData.backdrop_path} alt='cover image' />
            <div className='absolute left-2 bottom-2 h-40  z-[60]'>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original` + itemData.poster_path} />
            </div>
            <div className='absolute flex items-center justify-center top-0 left-0 h-full w-full cursor-pointer duration-300 bg-black/20 hover:bg-black/40'>
              {/* <FontAwesomeIcon className='text-emerald-400 text-3xl cursor-pointer' icon={faPlay}></FontAwesomeIcon> */}
            </div>
            
            </div>
            {itemData.vote_average && <div className='flex items-center gap-3 font-semibold  px-5'>
              <CircularProgressbar styles={buildStyles({
                textSize: '26px',
                textColor: 'white',
                trailColor: '#065f46',
                pathColor: '#34d399'
                
              })} className='h-12 w-12 ' value={itemData.vote_average * 10} text={`${itemData.vote_average.toFixed(1) * 10 + '%'}`}></CircularProgressbar>
              {itemData.popularity && <p className='flex gap-1 items-center'>
                <FontAwesomeIcon className='text-emerald-400 text-xl' icon={faChartColumn}></FontAwesomeIcon>
                {itemData.popularity.toFixed(2)}</p>}
            </div>}
            
            
            <div> 

            <div className='flex gap-2 flex-wrap px-5'>
            {itemData.genres && itemData.genres.map((item, index) => (
              <button key={index} className='border-[2px] text-stone-200 font-normal border-stone-600 px-3 text-sm py-1 rounded-full'>{item.name}</button>
            ))}
            
              </div>
          </div>
              <div className='px-5 font-[Roboto]'> 
                <p>{itemData.overview}</p>
            </div>
            
        </div>
        }
        </div>
      {notFound && <NotFound />}


    </div>
  )
}

export default SingleItem