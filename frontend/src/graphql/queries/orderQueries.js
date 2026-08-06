import { gql } from "@apollo/client";

export const GET_ORDERS = gql`
query{

    orders{

        id

        totalPrice

        status

        user{
            id
            name
        }

        items{

            quantity

            price

            product{

                id
                name
                price

            }

        }

    }

}
`;