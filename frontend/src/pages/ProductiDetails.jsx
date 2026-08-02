import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";

import { GET_PRODUCT } from "../graphql/queries/productQueries";

import ProductDetailsCard from "../components/products/ProductDetailsCard";
import ReviewList from "../components/reviews/ReviewList";
import ReviewForm from "../components/reviews/ReviewForm";

const ProductDetails = () => {

    const { id } = useParams();

    const { loading, error, data, refetch } = useQuery(
        GET_PRODUCT,
        {
            variables: {
                id
            }
        }
    );

    if (loading)
        return <h2>Loading Product...</h2>;

    if (error)
        return <h2>{error.message}</h2>;

    const product = data.product;

    return (

        <div
            style={{
                width: "80%",
                margin: "30px auto"
            }}
        >

            <ProductDetailsCard
                product={product}
            />

            <hr />

            <h2>Reviews</h2>

            <ReviewList
                reviews={product.reviews}
            />

            <hr />

            <ReviewForm
                productId={product.id}
                onReviewAdded={refetch}
            />

        </div>

    );

};

export default ProductDetails;