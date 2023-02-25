import React from 'react'

const ItemCoverImage = (props) => {
  return (
    <div className=' h-[60vh] relative md:mx-5  '>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original` + props.itemData.backdrop_path} alt='cover image' />
            <div className='absolute left-2 bottom-2 h-40  z-[60]'>
            <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original` + props.itemData.poster_path} />
            </div>
            <div className='absolute flex items-center justify-center top-0 left-0 h-full w-full cursor-pointer duration-300 bg-black/20  hover:bg-black/40'>
            </div>
    </div>
  )
}

export default ItemCoverImage