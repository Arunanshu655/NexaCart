import { useMutation } from "@apollo/client/react";

import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from "../../graphql/mutations/cartMutations";

import { GET_CART } from "../../graphql/queries/cartQueries";

const CartItem = ({ item }) => {

  const [removeFromCart] = useMutation(REMOVE_FROM_CART, {
    refetchQueries: [{ query: GET_CART }],
  });

  const [updateQuantity] = useMutation(UPDATE_CART_QUANTITY, {
    refetchQueries: [{ query: GET_CART }],
  });

  const increaseQuantity = async () => {

    await updateQuantity({
      variables: {
        productId: item.product.id,
        quantity: item.quantity + 1,
      },
    });

  };

  const decreaseQuantity = async () => {

    if (item.quantity === 1) {

      await removeFromCart({
        variables: {
          productId: item.product.id,
        },
      });

      return;
    }

    await updateQuantity({
      variables: {
        productId: item.product.id,
        quantity: item.quantity - 1,
      },
    });

  };

  const removeItem = async () => {

    await removeFromCart({
      variables: {
        productId: item.product.id,
      },
    });

  };

  return (

    <div
      style={{
        border: "1px solid gray",
        padding: "15px",
        marginBottom: "10px",
      }}
    >

      <h3>{item.product.name}</h3>

      <p>₹ {item.product.price}</p>

      <div>

        <button onClick={decreaseQuantity}>-</button>

        <span
          style={{
            margin: "0 10px",
          }}
        >
          {item.quantity}
        </span>

        <button onClick={increaseQuantity}>+</button>

      </div>

      <br />

      <button onClick={removeItem}>
        Remove
      </button>

    </div>

  );

};

export default CartItem;