import CartItem from "./CartItem";

const CartList = ({ items }) => {

    if (!items.length)
        return <h2>Your cart is empty.</h2>;

    return (

        <div>

            {items.map(item => (

                <CartItem
                    key={item.product.id}
                    item={item}
                />

            ))}

        </div>

    );

};

export default CartList;