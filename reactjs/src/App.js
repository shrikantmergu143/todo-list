import React from 'react'

import { Route, Routes } from 'react-router'
import { App_url } from './components/common/Constant'
import Home from './components/Home'

function App(props) {
  return (
    <Routes>
        <Route exact path={App_url.Home}  element={<Home/>} />
    </Routes>
  )
}

export default App
