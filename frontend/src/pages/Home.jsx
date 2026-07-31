import { useAuth } from "../context/AuthContext";

const Home = () => {

    const { user } = useAuth();

    return (

        <div>

            <h1>Welcome to ShopSphere</h1>

            <h3>
                {user
                    ? `Hello, ${user.name}!`
                    : "Discover amazing products."
                }
            </h3>

            <p>
                Browse products, add them to your cart,
                chat with sellers, and enjoy seamless shopping.
            </p>

        </div>

    );

};

export default Home;