import { gql } from "@apollo/client";

export const GET_CART = gql`
  query GetCart {
    cart {
      id
      items {
        quantity
        product {
          id
          name
          price
          description
        }
      }
    }
  }
`;