import { useEffect } from 'react'
import socket from './socket/socket'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ChatPage from './pages/ChatPage';
import Register from './pages/Register';
import Login from './pages/Login';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './pages/Cart';
import Products from './pages/Products';

function App() {
  const {token} = useAuth()
  useEffect(()=>{
    console.log("fetch me calling ....")
    // fetchMe()
    console.log("fetch me  called")
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
      <Navbar/>
        <Routes>
          <Route path="/chat/:chatId" element={<ChatPage />} />
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login"element={<Login />}></Route>
          <Route path="/Home"element={<Home />}></Route>
          <Route path="/cart" element={<ProtectedRoute><Cart /></ProtectedRoute>}/>
          <Route path="/products" element={<ProtectedRoute><Products /></ProtectedRoute>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
