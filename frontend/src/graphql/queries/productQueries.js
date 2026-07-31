import { gql } from "@apollo/client";

export const GET_PRODUCTS = gql`
query q2{
  products {
    id,
    name,
    price,
    # description,
    reviews {
      comment,
      rating,
      user {
        name
      }
    }
  }
}
`