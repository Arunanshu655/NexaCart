import ProductCard from "./ProductCard";

const ProductGrid = ({ products }) => {

    if (!products.length)
        return <h2>No Products Found.</h2>;

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns:
                    "repeat(auto-fill,minmax(250px,1fr))",
                gap: "20px"
            }}
        >

            {products.map(product => (

                <ProductCard
                    key={product.id}
                    product={product}
                />

            ))}

        </div>

    );

};

export default ProductGrid;