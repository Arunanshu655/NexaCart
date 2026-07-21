import { useEffect } from 'react'
import socket from './socket/socket'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from './pages/ChatPage';


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
      <Router>
        <Routes>
          <Route path="/chat/:chatId" element={<ChatPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
