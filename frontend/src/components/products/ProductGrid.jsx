import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {

  if (!products.length) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-xl font-semibold">
          No products found
        </h2>

        <p className="mt-2 text-sm text-[var(--muted)]">
          Try searching for something else.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
        />
      ))}
    </div>
  );
};

export default ProductGrid;