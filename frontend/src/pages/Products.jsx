import { useQuery } from "@apollo/client/react";

import { GET_PRODUCTS } from "../graphql/queries/productQueries";

import ProductGrid from "../components/products/ProductGrid";

const Products = () => {

    const { loading, error, data } = useQuery(GET_PRODUCTS);

    if (loading)
        return <h2>Loading Products...</h2>;

    if (error)
        return <h2>{error.message}</h2>;

    return (

        <div>

            <h1>Products</h1>

            <ProductGrid
                products={data.products}
            />

        </div>

    );

};

export default Products;