import { CREATE_ORDER } from "../../graphql/mutations/orderMutations";

import { GET_CART } from "../../graphql/queries/cartQueries";

import { GET_ORDERS } from "../../graphql/queries/orderQueries";

import { useMutation } from "@apollo/client/react";
import Button from "../ui/Button";
const CheckoutButton = () => {

    const [checkout,{loading}] = useMutation(

        CREATE_ORDER,

        {

            refetchQueries:[
                {query:GET_CART},
                {query:GET_ORDERS}
            ]

        }

    );

    const handleCheckout = async()=>{

        try{

            await checkout();

            alert("Order placed successfully");

        }

        catch(err){

            alert(err.message);

        }

    };

    return(

        <><Button

            onClick={handleCheckout}

            disabled={loading}

        >

            {loading

                ? "Processing..."

                : "Checkout"}

        </Button>
        </>

    );

};

export default CheckoutButton;