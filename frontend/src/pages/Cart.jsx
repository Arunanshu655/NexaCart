import { useQuery } from "@apollo/client";

import { GET_CART } from "../graphql/queries/cartQueries";

import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";

const Cart = () => {

    const { loading, error, data } = useQuery(GET_CART);

    if (loading) return <h2>Loading...</h2>;

    if (error) return <h2>{error.message}</h2>;

    return (

        <div>

            <h1>My Cart</h1>

            <CartList items={data.cart.items} />

            <CartSummary items={data.cart.items} />

        </div>

    );

};

export default Cart;