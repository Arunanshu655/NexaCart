import { useMutation } from "@apollo/client";

import OrderItem from "./OrderItem";

import { CANCEL_ORDER } from "../../graphql/mutations/orderMutations";

import { GET_ORDERS } from "../../graphql/queries/orderQueries";

const OrderCard = ({ order }) => {

    const [cancelOrder, { loading }] = useMutation(

        CANCEL_ORDER,

        {

            refetchQueries: [

                { query: GET_ORDERS }

            ]

        }

    );

    const handleCancel = async () => {

        try {

            await cancelOrder({

                variables: {

                    orderId: order.id

                }

            });

            alert("Order Cancelled");

        }

        catch (err) {

            alert(err.message);

        }

    };

    return (

        <div
            style={{
                border: "2px solid black",
                padding: "20px",
                marginBottom: "20px",
                borderRadius: "10px"
            }}
        >

            <h3>Order ID</h3>

            <p>{order.id}</p>

            <h4>Status : {order.status}</h4>

            <h4>Total : ₹{order.totalPrice}</h4>

            <hr />

            {order.items.map((item, index) => (

                <OrderItem

                    key={index}

                    item={item}

                />

            ))}

            {order.status !== "delivered" &&
                order.status !== "cancelled" && (

                    <button

                        onClick={handleCancel}

                        disabled={loading}

                    >

                        {loading
                            ? "Cancelling..."
                            : "Cancel Order"}

                    </button>

                )}

        </div>

    );

};

export default OrderCard;