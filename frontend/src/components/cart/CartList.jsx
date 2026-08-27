import { ShoppingCart } from "lucide-react";

import CartItem from "./CartItem";

const CartList = ({ items }) => {

  if (!items || items.length === 0) {
    return (
      <div className="
        rounded-[10px]
        border border-dashed
        border-[var(--border)]
        bg-white
        px-6 py-16
        text-center
      ">

        <ShoppingCart
          size={42}
          strokeWidth={1.5}
          className="mx-auto text-gray-300"
        />

        <h2 className="mt-5 text-xl font-semibold">
          Your cart is empty
        </h2>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Add some products to your cart to get started.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-4">

      {items.map((item) => (
        <CartItem
          key={item.product.id}
          item={item}
        />
      ))}

    </div>
  );
};

export default CartList;