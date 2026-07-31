import { useState } from 'react'
import './App.css'
import MainRouter from './components/MainRouter'

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      
    <MainRouter/>
     <ToastContainer position="top-right"  autoClose={2500}  theme="colored"/>
    </>
  )
}

export default App
