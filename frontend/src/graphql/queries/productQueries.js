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
export const GET_PRODUCT = gql`
query q3($id: ID!){
    product(id:$id){

        id
        name
        price
        description

        reviews{

            id

            rating

            comment

            user{
                id
                name
            }

        }

    }
}
`;