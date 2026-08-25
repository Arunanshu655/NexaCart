import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { Star } from "lucide-react";

import { ADD_REVIEW } from "../../graphql/mutations/reviewMutations";

import Card from "../ui/Card";
import Button from "../ui/Button";

const ReviewForm = ({
  productId,
  onReviewAdded,
}) => {

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const [addReview, { loading }] =
    useMutation(ADD_REVIEW);

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    try {

      await addReview({
        variables: {
          productId,
          rating: Number(rating),
          comment: comment.trim(),
        },
      });

      setRating(5);
      setComment("");

      if (onReviewAdded) {
        await onReviewAdded();
      }

    } catch (err) {

      alert(err.message);

    }
  };

  return (
    <Card hover={false}>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">
          Write a Review
        </h3>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Share your experience with this product.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >

        {/* Rating */}
        <div>

          <label className="text-sm font-medium">
            Your Rating
          </label>

          <div className="mt-3 flex gap-2">

            {Array.from({ length: 5 }).map((_, index) => {

              const value = index + 1;

              return (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  className="transition-transform duration-200 hover:scale-110"
                >
                  <Star
                    size={25}
                    className={
                      value <= rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }
                  />
                </button>
              );

            })}

          </div>

        </div>

        {/* Comment */}
        <div>

          <label className="text-sm font-medium">
            Your Review
          </label>

          <textarea
            rows={5}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us what you think..."
            className="
              mt-2
              w-full
              resize-none
              rounded-[10px]
              border border-[var(--border)]
              bg-white
              px-4 py-3
              text-sm
              outline-none
              transition-all duration-200
              focus:border-[var(--primary)]
              focus:ring-2
              focus:ring-blue-100
            "
          />

        </div>

        <Button
          type="submit"
          loading={loading}
        >
          Submit Review
        </Button>

      </form>

    </Card>
  );
};

export default ReviewForm;