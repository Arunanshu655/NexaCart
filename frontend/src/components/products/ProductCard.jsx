import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }) => {

    return (

        <div
            style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px"
            }}
        >

            <h3>{product.name}</h3>

            <p>{product.description}</p>

            <h4>₹ {product.price}</h4>

            <AddToCartButton
                productId={product.id}
            />

        </div>

    );

};

export default ProductCard;