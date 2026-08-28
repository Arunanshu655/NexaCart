import { ShoppingBag } from "lucide-react";

const OrderItem = ({ item }) => {

  const subtotal =
    item.price * item.quantity;

  return (
    <div className="
      flex
      flex-col
      gap-4
      rounded-[10px]
      bg-[var(--background)]
      p-4
      sm:flex-row
      sm:items-center
    ">

      {/* Image Placeholder */}
      <div className="
        flex h-20 w-20
        shrink-0
        items-center justify-center
        rounded-[10px]
        bg-white
      ">
        <ShoppingBag
          size={28}
          strokeWidth={1.5}
          className="text-gray-300"
        />
      </div>

      {/* Product */}
      <div className="min-w-0 flex-1">

        <h4 className="truncate text-sm font-semibold">
          {item.product?.name || "Product"}
        </h4>

        <p className="mt-1 text-xs text-[var(--muted)]">
          ₹{item.price} × {item.quantity}
        </p>

      </div>

      {/* Subtotal */}
      <div className="sm:text-right">

        <p className="text-xs text-[var(--muted)]">
          Subtotal
        </p>

        <p className="mt-1 font-semibold">
          ₹{subtotal.toFixed(2)}
        </p>

      </div>

    </div>
  );
};

export default OrderItem;