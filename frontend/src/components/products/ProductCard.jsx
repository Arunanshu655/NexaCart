import AddToCartButton from "./AddToCartButton";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {

    return (

        <div
            style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px"
            }}
        >

            <h3>
                <Link to={`/product/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                    {product.name}
                </Link>
            </h3>

            <p>{product.description}</p>

            <h4>₹ {product.price}</h4>

            <AddToCartButton
                productId={product.id}
            />

        </div>

    );

};

export default ProductCard;