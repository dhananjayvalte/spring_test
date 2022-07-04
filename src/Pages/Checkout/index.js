import { Grid, Box, Typography, Button } from "@mui/material";
import { Container } from "@mui/system";
import React, { useContext } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Checkout() {
  const cartContext = useContext(CartContext);
  console.log("cartContext", cartContext);
  let sum = 0;
  cartContext.cartData.forEach((element) => {
    sum = sum + element.cart_quantity * element.price;
  });
  return (
    <Container>
      <Box mb={2}>
        <Typography variant='h5'>Checkout</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant='h6'>My Cart</Typography>
      </Box>
      {cartContext.cartData.length == 0 && <Typography>NO DATA</Typography>}

      <Grid container spacing={1}>
        <Grid item md={6}>
          {cartContext.cartData?.map((product, i) => {
            return (
              <Box key={i}>
                <Typography>
                  {product.name} ({product.price} INR)
                </Typography>
                <Box display={"flex"}>
                  <Button
                    onClick={() => {
                      cartContext.updataQuantity(-1, product.id);
                    }}
                    disabled={product.cart_quantity <= 1}
                  >
                    -
                  </Button>
                  <Typography>{product.cart_quantity}</Typography>
                  <Button
                    onClick={() => {
                      if (product.cart_quantity <= product.quantity) {
                        cartContext.updataQuantity(1, product.id);
                      } else {
                        alert("No Item left");
                      }
                    }}
                  >
                    +
                  </Button>
                </Box>
              </Box>
            );
          })}
        </Grid>
        <Grid item md={6}>
          <Typography>Items : {cartContext.cartData.length}</Typography>
          <Typography>Total Price : {sum}</Typography>
        </Grid>
      </Grid>
    </Container>
  );
}
