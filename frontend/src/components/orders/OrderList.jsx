import OrderCard from "./OrderCard";

const OrderList = ({ orders }) => {

    if (!orders || orders.length === 0) {
        return <h2>No Orders Yet</h2>;
    }

    return (

        <div>

            {orders.map((order) => (

                <OrderCard
                    key={order.id}
                    order={order}
                />

            ))}

        </div>

    );

};

export default OrderList;