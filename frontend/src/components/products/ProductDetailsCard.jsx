import AddToCartButton from "./AddToCartButton";

const ProductDetailsCard = ({ product }) => {
    console.log(product)
    return (

        <div
            style={{
                border: "1px solid #ccc",
                padding: "20px",
                borderRadius: "10px"
            }}
        >

            <h1>{product.name}</h1>

            <h2>₹ {product.price}</h2>

            <p>{product.description}</p>

            <br />

            <AddToCartButton
                productId={product.id}
                quantity={1}
            />

        </div>

    );

};

export default ProductDetailsCard;