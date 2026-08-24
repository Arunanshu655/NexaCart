import { useQuery } from "@apollo/client/react";
import { Search, SlidersHorizontal } from "lucide-react";

import { GET_PRODUCTS } from "../graphql/queries/productQueries";
import ProductGrid from "../components/products/ProductGrid";
import Skeleton from "../components/ui/Skeleton";

const Products = () => {

  const {
    loading,
    error,
    data
  } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-first",
  });

  if (error) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-[var(--danger)]">
          {error.message}
        </p>
      </div>
    );
  }

  const products = data?.products || [];

  return (
    <div className="space-y-8">

      {/* Header */}
      <section className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="text-sm font-medium text-[var(--primary)]">
            Store
          </p>

          <h1 className="mt-1 text-3xl font-semibold tracking-tight">
            Explore Products
          </h1>

          <p className="mt-2 text-sm text-[var(--muted)]">
            Find something you'll love.
          </p>
        </div>

        <button
          className="
            inline-flex items-center gap-2
            self-start
            rounded-full
            border border-[var(--border)]
            bg-white
            px-4 py-2.5
            text-sm font-medium
            transition-all duration-200
            hover:border-[var(--primary)]
            hover:text-[var(--primary)]
          "
        >
          <SlidersHorizontal size={16} />
          Filters
        </button>

      </section>

      {/* Search */}
      <div className="relative">

        <Search
          size={19}
          className="
            absolute left-4 top-1/2
            -translate-y-1/2
            text-[var(--muted)]
          "
        />

        <input
          type="text"
          placeholder="Search products..."
          className="
            w-full
            rounded-full
            border border-[var(--border)]
            bg-white
            py-3.5 pl-11 pr-5
            text-sm
            outline-none
            transition-all duration-200
            focus:border-[var(--primary)]
            focus:ring-2
            focus:ring-blue-100
          "
        />

      </div>

      {/* Product count */}
      {!loading && (
        <p className="text-sm text-[var(--muted)]">
          {products.length} product{products.length !== 1 ? "s" : ""}
        </p>
      )}

      {/* Loading */}
      {loading ? (

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="rounded-[10px] border border-[var(--border)] bg-white p-5"
            >
              <Skeleton className="h-48 w-full" />

              <Skeleton className="mt-5 h-5 w-3/4" />

              <Skeleton className="mt-3 h-4 w-1/2" />

              <Skeleton className="mt-5 h-10 w-32" />
            </div>
          ))}

        </div>

      ) : (

        <ProductGrid products={products} />

      )}

    </div>
  );
};

export default Products;