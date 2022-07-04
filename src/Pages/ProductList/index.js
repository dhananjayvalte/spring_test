import { Button, Container, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useContext } from "react";
import { useNavigate, createSearchParams } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import productList from "../../Utils/productList.json";

export default function ProductList() {
  const navigator = useNavigate();
  const cartContext = useContext(CartContext);
  const isAdmin = sessionStorage.getItem("isAdmin") == "true";
  const addToCart = (data) => {
    cartContext.addToCart(data);
    // navigator("/checkout");
  };

  return (
    <Container>
      {" "}
      <Box>
        {isAdmin && (
          <Button
            onClick={() =>
              navigator({
                pathname: "add-item",
                search: createSearchParams({
                  type: "add",
                }).toString(),
              })
            }
          >
            Add Item
          </Button>
        )}
        {cartContext.cartData?.length > 0 && (
          <Button onClick={() => navigator("/checkout")}>Checkout</Button>
        )}
      </Box>
      <Grid container spacing={2}>
        {productList.map((product, i) => {
          return (
            <ProductCart
              product={product}
              key={i}
              isAdmin={isAdmin}
              cartContext={cartContext}
            />
          );
        })}
      </Grid>
    </Container>
  );
}

export function ProductCart({ product, key, isAdmin, cartContext }) {
  const navigator = useNavigate();

  const checkIsInCart = cartContext.cartData.filter(
    (crd) => crd.id == product.id
  );
  const IsInCart = checkIsInCart.length > 0;
  return (
    <Grid item md={4} key={key}>
      <Box p={2} style={{ border: "1px solid #000" }}>
        <Typography>
          {product.name} ({product.price} INR)
        </Typography>
        {isAdmin ? (
          <Box display={"flex"}>
            <Button
              onClick={() =>
                navigator({
                  pathname: "add-item",
                  search: createSearchParams({
                    type: "edit",
                  }).toString(),
                })
              }
            >
              Edit
            </Button>
            <Button
              onClick={() =>
                navigator({
                  pathname: "add-item",
                  search: createSearchParams({
                    type: "delete",
                  }).toString(),
                })
              }
            >
              Delete
            </Button>
          </Box>
        ) : (
          <Box display={"flex"}>
            <Button onClick={() => cartContext.addToCart(product)}>
              Add To Cart
            </Button>
            {IsInCart && (
              <Button onClick={() => cartContext.removeFromCart(product)}>
                Remove From Cart
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Grid>
  );
}
