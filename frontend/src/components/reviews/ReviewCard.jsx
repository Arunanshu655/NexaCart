import { Star } from "lucide-react";

import Card from "../ui/Card";

const ReviewCard = ({ review }) => {

  return (
    <Card
      hover={false}
      className="p-5"
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex items-center gap-3">

          <div className="
            flex h-10 w-10
            items-center justify-center
            rounded-full
            bg-[var(--primary)]
            text-sm font-semibold
            text-white
          ">
            {review.user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <h4 className="text-sm font-semibold">
              {review.user?.name || "Anonymous"}
            </h4>

            <p className="text-xs text-[var(--muted)]">
              Verified Customer
            </p>
          </div>

        </div>

        <div className="flex items-center gap-1">

          {Array.from({ length: 5 }).map((_, index) => (
            <Star
              key={index}
              size={15}
              className={
                index < review.rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }
            />
          ))}

        </div>

      </div>

      <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
        {review.comment}
      </p>

    </Card>
  );
};

export default ReviewCard;