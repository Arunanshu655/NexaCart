import { useMutation } from "@apollo/client/react";

import { ADD_TO_CART } from "../../graphql/mutations/cartMutations";
import Button from "../ui/Button";
const AddToCartButton = ({ productId , quantity=1}) => {

    const [addToCart, { loading }] =
        useMutation(ADD_TO_CART);

    const handleAdd = async () => {

        try {

            await addToCart({

                variables: {
                    productId,
                    quantity: 1
                }

            });

            alert("Added to Cart");

        }

        catch (err) {

            alert(err.message);

        }

    };

    return (

        <Button
            disabled={loading}
            onClick={handleAdd}
        >

            {loading
                ? "Adding..."
                : "Add to Cart"
            }

        </Button>

    );

};

export default AddToCartButton;