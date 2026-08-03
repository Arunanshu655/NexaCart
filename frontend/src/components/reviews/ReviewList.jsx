import ReviewCard from "./ReviewCard";

const ReviewList = ({ reviews }) => {

    if (!reviews.length)
        return <h3>No reviews yet.</h3>;

    return (

        <div>

            {reviews.map(review => (

                <ReviewCard

                    key={review.id}

                    review={review}

                />

            ))}

        </div>

    );

};

export default ReviewList;