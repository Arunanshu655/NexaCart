import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { useEffect } from 'react'
import socket from './socket'

function App() {
  useEffect(()=>{
    socket.on("connect", () => {
      console.log("Connected:", socket.id);
    });

    return () => {
      socket.off("connect");
    }
  },[])

  return (
    <>
      <h1>Hello server testing</h1>
    </>
  )
}

export default App
