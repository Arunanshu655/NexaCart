import CheckoutButton from "../orders/CheckOutButton";
const CartSummary = ({ items }) => {

    const total = items.reduce((sum, item) => {

        return sum + item.product.price * item.quantity;

    }, 0);

    return (

        <div
            style={{
                marginTop: "20px"
            }}
        >

            <h2>Total: ₹{total}</h2>

            <CheckoutButton/>

        </div>

    );

};

export default CartSummary;