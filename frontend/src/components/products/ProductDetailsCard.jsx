import { ShoppingCart, ShieldCheck, Truck } from "lucide-react";

import Card from "../ui/Card";
import AddToCartButton from "./AddToCartButton";

const ProductDetailsCard = ({ product }) => {
  return (
    <Card className="overflow-hidden p-0">

      <div className="grid grid-cols-1 lg:grid-cols-2">

        {/* Product Image */}
        <div className="
          flex min-h-[400px]
          items-center justify-center
          bg-[#F5F5F7]
          lg:min-h-[520px]
        ">
          <ShoppingCart
            size={90}
            strokeWidth={1}
            className="text-gray-300"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center p-7 sm:p-10">

          <p className="text-sm font-medium text-[var(--primary)]">
            Product
          </p>

          <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
            {product.name}
          </h1>

          <p className="mt-5 text-3xl font-semibold">
            ₹{product.price}
          </p>

          <p className="mt-6 leading-7 text-[var(--muted)]">
            {product.description || "No description available."}
          </p>

          <div className="mt-8">
            <AddToCartButton
              productId={product.id}
            />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-2">

            <div className="flex items-center gap-3">
              <Truck
                size={20}
                className="text-[var(--primary)]"
              />

              <div>
                <p className="text-sm font-medium">
                  Fast Delivery
                </p>

                <p className="text-xs text-[var(--muted)]">
                  Delivered to your doorstep
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <ShieldCheck
                size={20}
                className="text-[var(--primary)]"
              />

              <div>
                <p className="text-sm font-medium">
                  Secure Purchase
                </p>

                <p className="text-xs text-[var(--muted)]">
                  Safe and reliable checkout
                </p>
              </div>
            </div>

          </div>

        </div>

      </div>

    </Card>
  );
};

export default ProductDetailsCard;