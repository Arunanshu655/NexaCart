import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const GET_CART = gql`
  query GetCart {
    cart {
      id
      items {
        product {
          id
          name
          price
          description
        }
        quantity
      }
    }
  }
`;

const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($productId: ID!) {
    removeFromCart(productId: $productId) {
      id
      items {
        product {
          id
          name
          price
        }
        quantity
      }
    }
  }
`;

const UPDATE_CART_QUANTITY = gql`
  mutation UpdateCartQuantity($productId: ID!, $quantity: Int!) {
    updateCartQuantity(productId: $productId, quantity: $quantity) {
      id
      items {
        product {
          id
          name
          price
        }
        quantity
      }
    }
  }
`;

const CREATE_ORDER = gql`
  mutation CreateOrder {
    createOrder {
      id
      totalPrice
      status
      items {
        product {
          id
          name
          price
        }
        quantity
      }
    }
  }
`;

const Cart = () => {
  const { loading, error, data, refetch } = useQuery(GET_CART, {
    fetchPolicy: "network-only",
  });

  const [removeFromCart, { loading: removing }] = useMutation(REMOVE_FROM_CART, {
    onCompleted: () => refetch(),
  });

  const [updateCartQuantity, { loading: updating }] = useMutation(UPDATE_CART_QUANTITY, {
    onCompleted: () => refetch(),
  });

  const [createOrder, { loading: creatingOrder }] = useMutation(CREATE_ORDER, {
    onCompleted: () => {
      alert("Order created successfully.");
      refetch();
    },
  });

  const handleRemove = async (productId) => {
    try {
      await removeFromCart({ variables: { productId } });
    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to remove item from cart.");
    }
  };

  const handleQuantityChange = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      await updateCartQuantity({ variables: { productId, quantity } });
    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to update quantity.");
    }
  };

  const handleCheckout = async () => {
    try {
      await createOrder();
    } catch (err) {
      console.error(err);
      alert(err.message || "Unable to create order.");
    }
  };

  if (loading) {
    return <div>Loading cart...</div>;
  }

  if (error) {
    return <div>Error loading cart: {error.message}</div>;
  }

  const items = data?.cart?.items || [];
  const totalPrice = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div style={{ padding: "24px", maxWidth: "960px", margin: "0 auto" }}>
      <h2>Your Cart</h2>

      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div style={{ display: "grid", gap: "16px" }}>
            {items.map(({ product, quantity }) => (
              <div
                key={product.id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3 style={{ margin: "0 0 8px" }}>{product.name}</h3>
                  <p style={{ margin: "0 0 8px", color: "#555" }}>
                    {product.description || "No description available."}
                  </p>
                  <p style={{ margin: 0 }}>${product.price.toFixed(2)}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(product.id, quantity - 1)}
                    disabled={quantity <= 1 || updating}
                  >
                    -
                  </button>
                  <span>{quantity}</span>
                  <button
                    type="button"
                    onClick={() => handleQuantityChange(product.id, quantity + 1)}
                    disabled={updating}
                  >
                    +
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => handleRemove(product.id)}
                    disabled={removing}
                    style={{ background: "#ff4d4f", color: "white", border: "none", borderRadius: "4px", padding: "8px 12px", cursor: "pointer" }}
                  >
                    Remove
                  </button>
                  <span>${(product.price * quantity).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "24px", textAlign: "right" }}>
            <p style={{ fontSize: "18px", margin: "0 0 12px" }}>
              Total: <strong>${totalPrice.toFixed(2)}</strong>
            </p>
            <button
              type="button"
              onClick={handleCheckout}
              disabled={creatingOrder}
              style={{
                background: "#1890ff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "12px 20px",
                cursor: "pointer",
              }}
            >
              {creatingOrder ? "Placing order..." : "Checkout"}
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
