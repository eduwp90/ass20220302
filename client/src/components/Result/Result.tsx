import React from 'react'
import { useSelector } from 'react-redux'
import { commissionState } from './../../store/reducers/commissionReducer'

const Result:React.FC = () => {
  const commission = useSelector<commissionState, string>((state) => state.commission)
  console.log(commission)
  return (
    <div>Commission</div>
  )
}

export default Result
