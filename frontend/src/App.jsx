import { useEffect } from 'react'
import socket from './socket/socket'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';


function App() {
  const {token} = useAuth()
  useEffect(()=>{

    

    console.log(token)
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
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login"element={<Login />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
