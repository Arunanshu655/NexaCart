import { useQuery } from "@apollo/client/react";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

import { GET_CART } from "../graphql/queries/cartQueries";

import CartList from "../components/cart/CartList";
import CartSummary from "../components/cart/CartSummary";
import Button from "../components/ui/Button";
import Skeleton from "../components/ui/Skeleton";

const Cart = () => {

  const {
    loading,
    error,
    data,
  } = useQuery(GET_CART);

  if (loading) {
    return (
      <div className="space-y-5">

        <Skeleton className="h-9 w-32" />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">

          <div className="space-y-4">

            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />
            <Skeleton className="h-36 w-full" />

          </div>

          <Skeleton className="h-80 w-full" />

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

  const items = data?.cart?.items || [];

  return (
    <div className="space-y-8">

      {/* Header */}
      <div>

        <div className="flex items-center gap-3">

          <div className="
            flex h-11 w-11
            items-center justify-center
            rounded-full
            bg-blue-50
            text-[var(--primary)]
          ">
            <ShoppingCart size={21} />
          </div>

          <div>

            <h1 className="text-3xl font-semibold tracking-tight">
              My Cart
            </h1>

            <p className="mt-1 text-sm text-[var(--muted)]">
              Review your items before checkout.
            </p>

          </div>

        </div>

      </div>

      {items.length > 0 ? (

        <div className="
          grid
          grid-cols-1
          gap-6
          lg:grid-cols-[minmax(0,1fr)_360px]
          lg:items-start
        ">

          {/* Cart Items */}
          <div>

            <CartList items={items} />

          </div>

          {/* Summary */}
          <div className="lg:sticky lg:top-24">

            <CartSummary items={items} />

          </div>

        </div>

      ) : (

        <div className="
          rounded-[10px]
          border border-[var(--border)]
          bg-white
          px-6 py-20
          text-center
        ">

          <ShoppingCart
            size={48}
            strokeWidth={1.5}
            className="mx-auto text-gray-300"
          />

          <h2 className="mt-5 text-2xl font-semibold">
            Your cart is empty
          </h2>

          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
            You haven't added anything yet. Explore our products
            and find something you'll love.
          </p>

          <div className="mt-6">

            <Link to="/products">

              <Button>
                Continue Shopping
              </Button>

            </Link>

          </div>

        </div>

      )}

    </div>
  );
};

export default Cart;