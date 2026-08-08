import { useQuery } from "@apollo/client/react";

import { GET_ORDERS } from "../graphql/queries/orderQueries";

import OrderList from "../components/orders/OrderList";

const Orders = ()=>{

    const{

        loading,

        error,

        data

    } = useQuery(GET_ORDERS);

    if(loading)

        return <h2>Loading...</h2>;

    if(error)

        return <h2>{error.message}</h2>;

    return(

        <div>

            <h1>My Orders</h1>

            <OrderList

                orders={data.orders}

            />

        </div>

    );

};

export default Orders;