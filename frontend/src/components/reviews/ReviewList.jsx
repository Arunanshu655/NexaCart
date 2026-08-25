import { MessageSquare } from "lucide-react";

import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {

  if (!reviews || reviews.length === 0) {
    return (
      <div className="
        rounded-[10px]
        border border-dashed
        border-[var(--border)]
        bg-white
        px-6 py-12
        text-center
      ">

        <MessageSquare
          size={32}
          className="mx-auto text-gray-300"
        />

        <h3 className="mt-4 font-medium">
          No reviews yet
        </h3>

        <p className="mt-1 text-sm text-[var(--muted)]">
          Be the first person to review this product.
        </p>

      </div>
    );
  }

  return (
    <div className="space-y-4">

      {reviews.map((review) => (
        <ReviewCard
          key={review.id}
          review={review}
        />
      ))}

    </div>
  );
};

export default ReviewList;