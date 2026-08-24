import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";

import AddToCartButton from "./AddToCartButton";
import Card from "../ui/Card";

const ProductCard = ({ product }) => {

  return (
    <Card
      className="group overflow-hidden p-0"
    >

      {/* Image placeholder */}
      <Link to={`/products/${product.id}`}>
        <div className="
          flex h-52
          items-center justify-center
          bg-[#F5F5F7]
          text-[var(--muted)]
          transition-transform duration-200
          group-hover:scale-[1.02]
        ">
          <ShoppingCart size={42} strokeWidth={1.5} />
        </div>
      </Link>

      <div className="p-5">

        <Link to={`/products/${product.id}`}>
          <h3 className="
            truncate
            text-base
            font-semibold
            transition-colors duration-200
            hover:text-[var(--primary)]
          ">
            {product.name}
          </h3>
        </Link>

        <p className="
          mt-2
          line-clamp-2
          min-h-[42px]
          text-sm
          leading-5
          text-[var(--muted)]
        ">
          {product.description || "No description available."}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3">

          <span className="text-lg font-semibold">
            ₹{product.price}
          </span>

          <AddToCartButton
            productId={product.id}
          />

        </div>

      </div>

    </Card>
  );
};

export default ProductCard;