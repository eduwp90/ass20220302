import React from 'react'
import { useSelector } from 'react-redux'

const Result:React.FC = () => {
  const commission = useSelector<any>((state) => state)
  console.log(commission)

  return (
    <div>Commission</div>
  )
}

export default Result
