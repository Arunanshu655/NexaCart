import { PackageOpen } from "lucide-react";

import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {

  if (!orders || orders.length === 0) {
    return (
      <div className="
        rounded-[10px]
        border border-[var(--border)]
        bg-white
        px-6 py-20
        text-center
      ">

        <PackageOpen
          size={48}
          strokeWidth={1.5}
          className="mx-auto text-gray-300"
        />

        <h2 className="mt-5 text-xl font-semibold">
          No orders yet
        </h2>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Your completed purchases will appear here.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-5">

      {orders.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
        />
      ))}

    </div>
  );
};

export default OrderList;