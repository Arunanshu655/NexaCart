import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { GET_Products } from "../graphql/queries/productQueries";
import { useQuery } from "@apollo/client/react";

const Home = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const { loading, error, data } = useQuery(GET_Products, {
    fetchPolicy: "cache-first",
  });

  const [products, setProducts] = useState([]);

  // Update products only when query data changes
  useEffect(() => {
    if (data?.products) {
      setProducts(data.products);
    }
  }, [data]);

  const handleLogin = () => {
    if (isAuthenticated) logout();
    else navigate("/login");
  };

  if (loading) return <h2>Loading products...</h2>;
  if (error) return <h2>Error: {error.message}</h2>;

  return (
    <>
      <h1>Home</h1>

      {/* User check */}
      {user ? (
        <h2>Hello Dear: {user.name}</h2>
      ) : (
        <h2>Loading user...</h2>
      )}

      <button onClick={handleLogin}>
        {isAuthenticated ? "Logout" : "Login"}
      </button>

      <div>
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product.id}>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              <button>Add to cart</button>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </>
  );
};

export default Home;
