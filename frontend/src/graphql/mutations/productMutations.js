import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`mutation m3{
   addProduct(name: "Curd", price: 50,description: "Hi"){
      id,
      name,
      description
   }
}
`