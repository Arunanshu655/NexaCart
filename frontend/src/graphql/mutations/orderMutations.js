import { gql } from "@apollo/client";

export const CREATE_ORDER = gql`

mutation{

    createOrder{

        id

        totalPrice

        status

    }

}

`;

export const CANCEL_ORDER = gql`

mutation CancelOrder($orderId:ID!){

    cancelOrder(orderId:$orderId){

        id

        status

    }

}

`;