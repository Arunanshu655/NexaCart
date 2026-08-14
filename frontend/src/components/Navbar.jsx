import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {

    const navigate = useNavigate();

    const { user, logout, isAuthenticated } = useAuth();

    const handleLogout = () => {

        logout();
        navigate("/login");

    };

    return (

        <nav
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "15px 40px",
                borderBottom: "1px solid #ddd"
            }}
        >

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    alignItems: "center"
                }}
            >

                <Link to="/">
                    <strong>Nexacart</strong>
                </Link>

                <Link to="/">
                    Home
                </Link>

                <Link to="/products">
                    Products
                </Link>

                {isAuthenticated && (
                    <>
                        <Link to="/cart">
                            Cart
                        </Link>

                        <Link to="/orders">
                            Orders
                        </Link>

                        <Link to="/chat">
                            Chat
                        </Link>
                    </>
                )}

                {user?.role === "seller" && (
                    <Link to="/dashboard">
                        Dashboard
                    </Link>
                )}

            </div>

            <div
                style={{
                    display: "flex",
                    gap: "15px",
                    alignItems: "center"
                }}
            >

                {!isAuthenticated ? (
                    <>

                        <Link to="/login">
                            Login
                        </Link>

                        <Link to="/register">
                            Register
                        </Link>

                    </>
                ) : (
                    <>

                        <span>
                            Welcome, {user?.name}
                        </span>

                        <button onClick={handleLogout}>
                            Logout
                        </button>

                    </>
                )}

            </div>

        </nav>

    );

};

export default Navbar;
