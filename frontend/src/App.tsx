import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getAuth } from './redux/silces/authSlice.tsx'
import React, { useEffect } from 'react'

import Header from './components/Header.tsx'
//import Footer from "./components/Footer";

function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAuth())
  }, [dispatch])

  return (
    <>
      <Header />

      <Outlet />
    </>
  )
}

export default App
