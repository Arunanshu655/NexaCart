import { useMutation } from "@apollo/client/react";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
} from "../../graphql/mutations/cartMutations";

import { GET_CART } from "../../graphql/queries/cartQueries";

import Card from "../ui/Card";

const CartItem = ({ item }) => {

  const [removeFromCart, { loading: removing }] =
    useMutation(REMOVE_FROM_CART, {
      refetchQueries: [{ query: GET_CART }],
    });

  const [updateQuantity, { loading: updating }] =
    useMutation(UPDATE_CART_QUANTITY, {
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

  const subtotal =
    item.product.price * item.quantity;

  const isLoading = removing || updating;

  return (
    <Card
      hover={false}
      className="p-4 sm:p-5"
    >

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

        {/* Product Image Placeholder */}
        <div className="
          flex h-24 w-24
          shrink-0
          items-center justify-center
          rounded-[10px]
          bg-[#F5F5F7]
        ">
          <ShoppingBag
            size={32}
            strokeWidth={1.5}
            className="text-gray-300"
          />
        </div>

        {/* Product Information */}
        <div className="min-w-0 flex-1">

          <h3 className="truncate text-base font-semibold">
            {item.product.name}
          </h3>

          <p className="mt-1 text-sm text-[var(--muted)]">
            ₹{item.product.price} each
          </p>

          {/* Quantity */}
          <div className="mt-4 flex items-center gap-3">

            <div className="
              flex items-center
              rounded-full
              border border-[var(--border)]
              bg-white
              p-1
            ">

              <button
                onClick={decreaseQuantity}
                disabled={isLoading}
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  transition-all duration-200
                  hover:bg-[var(--background)]
                  disabled:opacity-50
                "
              >
                <Minus size={15} />
              </button>

              <span className="w-8 text-center text-sm font-medium">
                {item.quantity}
              </span>

              <button
                onClick={increaseQuantity}
                disabled={isLoading}
                className="
                  flex h-8 w-8
                  items-center justify-center
                  rounded-full
                  transition-all duration-200
                  hover:bg-[var(--background)]
                  disabled:opacity-50
                "
              >
                <Plus size={15} />
              </button>

            </div>

            <button
              onClick={removeItem}
              disabled={isLoading}
              className="
                inline-flex items-center gap-1.5
                text-sm
                text-[var(--danger)]
                transition-colors duration-200
                hover:opacity-75
                disabled:opacity-50
              "
            >
              <Trash2 size={15} />
              Remove
            </button>

          </div>

        </div>

        {/* Subtotal */}
        <div className="sm:text-right">

          <p className="text-xs text-[var(--muted)]">
            Subtotal
          </p>

          <p className="mt-1 text-lg font-semibold">
            ₹{subtotal.toFixed(2)}
          </p>

        </div>

      </div>

    </Card>
  );
};

export default CartItem;