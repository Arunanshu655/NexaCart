import { gql } from "@apollo/client";

export const ADD_TO_CART = gql`
  mutation AddToCart(
    $productId: ID!
    $quantity: Int!
  ) {
    addToCart(
      productId: $productId
      quantity: $quantity
    ) {
      id
      items {
        quantity
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart(
    $productId: ID!
  ) {
    removeFromCart(productId: $productId) {
      id
      items {
        quantity
        product {
          id
          name
          price
        }
      }
    }
  }
`;

export const UPDATE_CART_QUANTITY = gql`
  mutation UpdateCartQuantity(
    $productId: ID!
    $quantity: Int!
  ) {
    updateCartQuantity(
      productId: $productId
      quantity: $quantity
    ) {
      id
      items {
        quantity
        product {
          id
          name
          price
        }
      }
    }
  }
`;