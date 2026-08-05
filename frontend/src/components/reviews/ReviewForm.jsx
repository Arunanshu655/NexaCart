import { useState } from "react";
import { useMutation } from "@apollo/client/react";
import { ADD_REVIEW } from "../../graphql/mutations/reviewMutations";
// import { gql } from "@apollo/client/";
// import { ADD_TO_CART } from "../../graphql/mutations/cartMutations";

// const ADD_REVIEW = gql`
// mutation AddReview(
//     $productId:ID!
//     $rating:Int!
//     $comment:String!
// ){

//     addReview(

//         productId:$productId

//         rating:$rating

//         comment:$comment

//     ){

//         id

//         rating

//         comment

//         user{
//             id
//             name
//         }

//     }

// }
// `;

export const ReviewForm = ({ productId, onReviewAdded }) => {

    const [rating, setRating] = useState(5);

    const [comment, setComment] = useState("");

    const [addReview, { loading }] =
        useMutation(ADD_REVIEW);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!comment.trim())
            return;

        try {

            await addReview({

                variables: {

                    productId,

                    rating: Number(rating),

                    comment

                }

            });

            setRating(5);

            setComment("");

            onReviewAdded();

        }

        catch (err) {
            // console.log(err)
            alert(err.message);

        }

    };

    return (

        <form onSubmit={handleSubmit}>

            <h3>Add Review</h3>

            <label>

                Rating

            </label>

            <br />

            <select

                value={rating}

                onChange={(e) =>

                    setRating(e.target.value)

                }

            >

                <option value={1}>1</option>

                <option value={2}>2</option>

                <option value={3}>3</option>

                <option value={4}>4</option>

                <option value={5}>5</option>

            </select>

            <br />
            <br />

            <textarea

                rows={4}

                cols={50}

                placeholder="Write your review..."

                value={comment}

                onChange={(e) =>

                    setComment(e.target.value)

                }

            />

            <br />
            <br />

            <button
                disabled={loading}
                type="submit"
            >

                {loading
                    ? "Submitting..."
                    : "Submit Review"}

            </button>

        </form>

    );

};

// export default ReviewForm;