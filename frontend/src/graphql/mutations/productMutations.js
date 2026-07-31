import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`mutation m3{
   addProduct(name, price,description){
      id,
      name,
      description
   }
}
`


