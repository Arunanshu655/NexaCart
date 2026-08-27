import { CreditCard, ShoppingBag } from "lucide-react";

import CheckoutButton from "../orders/CheckOutButton";

const CartSummary = ({ items }) => {

  const total = items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  const totalItems = items.reduce(
    (sum, item) =>
      sum + item.quantity,
    0
  );

  return (
    <div className="
      rounded-[10px]
      border border-[var(--border)]
      bg-white
      p-6
      shadow-sm
    ">

      <div className="flex items-center gap-2">
        <ShoppingBag
          size={19}
          className="text-[var(--primary)]"
        />

        <h2 className="text-lg font-semibold">
          Order Summary
        </h2>
      </div>

      <div className="mt-6 space-y-4">

        <div className="flex justify-between text-sm">

          <span className="text-[var(--muted)]">
            Items
          </span>

          <span>
            {totalItems}
          </span>

        </div>

        <div className="flex justify-between text-sm">

          <span className="text-[var(--muted)]">
            Subtotal
          </span>

          <span>
            ₹{total.toFixed(2)}
          </span>

        </div>

        <div className="flex justify-between text-sm">

          <span className="text-[var(--muted)]">
            Delivery
          </span>

          <span className="font-medium text-[var(--success)]">
            Free
          </span>

        </div>

      </div>

      <div className="
        my-6
        border-t
        border-[var(--border)]
      " />

      <div className="flex items-center justify-between">

        <span className="font-medium">
          Total
        </span>

        <span className="text-2xl font-semibold">
          ₹{total.toFixed(2)}
        </span>

      </div>

      <div className="mt-6">

        <div className="mb-3 flex items-center gap-2 text-xs text-[var(--muted)]">
          <CreditCard size={14} />
          Secure checkout
        </div>

        <CheckoutButton />

      </div>

    </div>
  );
};

export default CartSummary;