import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import NotFound from './NotFound'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
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
    <div className='bg-stone-800'>
      <Navbar /> 
      {itemData && 
        <div className='min-h-screen bg-stone-800 flex items-center -mt-20 justify-center'>
          <h2 className='text-white text-3xl'>{itemData.name || itemData.title}</h2>
          
        </div>
      }
      {notFound && <NotFound />}


    </div>
  )
}

export default SingleItem