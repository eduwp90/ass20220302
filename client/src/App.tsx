import React from 'react'
import './App.css'

import { Outlet } from 'react-router-dom'

function App () {
  return (
    <div className="main-container">
      <Outlet />
    </div>
  )
}

export default App
