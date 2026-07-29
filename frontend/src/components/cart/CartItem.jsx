const CartItem = ({ item }) => {

    return (

        <div
            style={{
                border: "1px solid #ccc",
                marginBottom: "10px",
                padding: "15px"
            }}
        >

            <h3>{item.product.name}</h3>

            <p>Price: ₹{item.product.price}</p>

            <p>Quantity: {item.quantity}</p>

        </div>

    );

};

export default CartItem;