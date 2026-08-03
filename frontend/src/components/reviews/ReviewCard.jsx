const ReviewCard = ({ review }) => {

    return (

        <div
            style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "8px"
            }}
        >

            <h4>{review.user.name}</h4>

            <p>
                Rating : ⭐ {review.rating}/5
            </p>

            <p>{review.comment}</p>

        </div>

    );

};

export default ReviewCard;