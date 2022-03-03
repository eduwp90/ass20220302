import React from 'react'
import { useSelector } from 'react-redux'
import { rootState } from '../../store/store'
import './Result.css'

const Result:React.FC = () => {
  const commission = useSelector<rootState, string>((state) => state.commission)
  console.log(commission)

  return (
    <div className='result-container'>
      <h2>Your transaction commission is:</h2>
      <h1>{commission} EUR</h1>
    </div>
  )
}

export default Result
