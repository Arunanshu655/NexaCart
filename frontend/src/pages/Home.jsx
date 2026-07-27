// import { set } from "mongoose";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
const Home = () => {

    const navigate = useNavigate()
    const { user, isAuthenticated, login, logout } = useAuth();
    // console.log("Home.jsx : " + isAuthenticated + " : " + user)
    const handleLogin = async () =>{
        if(isAuthenticated) logout();
        else navigate("/login")
    }
    // const userM = JSON.stringify(user, null, 2)
    console.log("Home.jsx : "+ user)
    useEffect(() => {
    }, [user])
    
    return (
        <>
            <h1>Home</h1>

            <pre>
                <h1>Hello Dear : {user ? user.name : ""}</h1>

                <button onClick={e => {handleLogin()}}>{isAuthenticated?"Logout":"Login"}</button>
                
            </pre>
        </>
    );

};

export default Home;