import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'

import FormComponent from './components/Form/Form'
import Result from './components/Result/Result'
import { Provider } from 'react-redux'
import { store } from './store/store'

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route index element={<Navigate to='/form' />} />
            <Route path='form' element={<FormComponent/>}/>
            <Route path='result' element={<Result/>}/>
          </Route>
        </Routes>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
)
