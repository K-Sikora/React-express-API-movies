import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock, faCircle, faChartColumn, faChevronDown, faListNumeric} from '@fortawesome/free-solid-svg-icons'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'

import React from 'react'

const ItemDetails = (props) => {
  return (
   <>
    {props.itemData.vote_average && props.keyword && <div className='flex items-center font-semibold gap-5 px-6'>
    <CircularProgressbar styles={buildStyles({
      textSize: '26px',
      textColor: 'white',
      trailColor: '#065f46',
      pathColor: '#34d399'
      
    })} className='h-12 w-12 ' value={props.itemData.vote_average * 10} text={`${props.itemData.vote_average.toFixed(1) * 10 + '%'}`}></CircularProgressbar>
    {props.itemData.popularity && <p className='flex gap-1 items-center'>
      <FontAwesomeIcon className='text-emerald-400 text-xl' icon={faChartColumn}></FontAwesomeIcon>
      {props.itemData.popularity.toFixed(2)}</p>}
    <div> 
      <button onClick={() => {
        props.setIsVisibleKeywords(!props.isVisibleKeywords)
      }} className='flex items-center text-sm font-medium gap-2 cursor-pointer'>Keywords <FontAwesomeIcon icon={faChevronDown}></FontAwesomeIcon></button>
    </div>

  </div>}
      
  </>
  )
}

export default ItemDetails