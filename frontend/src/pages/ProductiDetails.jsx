import { ArrowLeft, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client/react";

import { GET_PRODUCT } from "../graphql/queries/productQueries";

import ProductDetailsCard from "../components/products/ProductDetailsCard";
import ReviewList from "../components/reviews/ReviewList";
import ReviewForm from "../components/reviews/ReviewForm";
import Skeleton from "../components/ui/Skeleton";

const ProductDetails = () => {
  const { id } = useParams();

  const {
    loading,
    error,
    data,
    refetch,
  } = useQuery(GET_PRODUCT, {
    variables: { id },
  });

  if (loading) {
    return (
      <div className="space-y-8">

        <Skeleton className="h-5 w-32" />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">

          <Skeleton className="h-[450px] w-full" />

          <div className="space-y-5">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-24 w-full" />
            <Skeleton className="h-12 w-40" />
          </div>

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

  const product = data?.product;

  if (!product) {
    return (
      <div className="py-20 text-center">
        <h2 className="text-2xl font-semibold">
          Product not found
        </h2>

        <Link
          to="/products"
          className="mt-4 inline-flex items-center gap-2 text-sm text-[var(--primary)]"
        >
          <ArrowLeft size={16} />
          Back to Products
        </Link>
      </div>
    );
  }

  const averageRating =
    product.reviews?.length > 0
      ? (
          product.reviews.reduce(
            (sum, review) => sum + review.rating,
            0
          ) / product.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="space-y-12">

      {/* Back */}
      <Link
        to="/products"
        className="
          inline-flex items-center gap-2
          text-sm font-medium
          text-[var(--muted)]
          transition-colors duration-200
          hover:text-[var(--primary)]
        "
      >
        <ArrowLeft size={17} />
        Back to Products
      </Link>

      {/* Product */}
      <ProductDetailsCard product={product} />

      {/* Reviews */}
      <section>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>
            <h2 className="text-2xl font-semibold">
              Customer Reviews
            </h2>

            <p className="mt-1 text-sm text-[var(--muted)]">
              What other customers think about this product.
            </p>
          </div>

          {averageRating && (
            <div className="flex items-center gap-2">

              <Star
                size={19}
                className="fill-yellow-400 text-yellow-400"
              />

              <span className="font-semibold">
                {averageRating}
              </span>

              <span className="text-sm text-[var(--muted)]">
                ({product.reviews.length} reviews)
              </span>

            </div>
          )}

        </div>

        <ReviewList
          reviews={product.reviews || []}
        />

      </section>

      {/* Add Review */}
      <section className="max-w-2xl">

        <ReviewForm
          productId={product.id}
          onReviewAdded={refetch}
        />

      </section>

    </div>
  );
};

export default ProductDetails;