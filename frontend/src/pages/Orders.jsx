import { useQuery } from "@apollo/client/react";
import { Package } from "lucide-react";

import { GET_ORDERS } from "../graphql/queries/orderQueries";
import OrderList from "../components/orders/OrderList";
import Skeleton from "../components/ui/Skeleton";

const Orders = () => {

  const {
    loading,
    error,
    data,
  } = useQuery(GET_ORDERS);

  if (loading) {
    return (
      <div className="space-y-6">

        <Skeleton className="h-10 w-40" />

        <div className="space-y-5">
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-64 w-full" />
        </div>

      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[var(--danger)]">
          {error.message}
        </p>
      </div>
    );
  }

  const orders = data?.orders || [];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div className="flex items-center gap-3">

        <div className="
          flex h-11 w-11
          items-center justify-center
          rounded-full
          bg-blue-50
          text-[var(--primary)]
        ">
          <Package size={21} />
        </div>

        <div>

          <h1 className="text-3xl font-semibold tracking-tight">
            My Orders
          </h1>

          <p className="mt-1 text-sm text-[var(--muted)]">
            Track and manage your purchases.
          </p>

        </div>

      </div>

      <OrderList orders={orders} />

    </div>
  );
};

export default Orders;