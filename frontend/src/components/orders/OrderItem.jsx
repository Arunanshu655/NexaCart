const OrderItem = ({ item }) => {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px"
            }}
        >

            <h4>{item.product.name}</h4>

            <p>Price : ₹{item.price}</p>

            <p>Quantity : {item.quantity}</p>

            <p>Subtotal : ₹{item.price * item.quantity}</p>

        </div>

    );

};

export default OrderItem;