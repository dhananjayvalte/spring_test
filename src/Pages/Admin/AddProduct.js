import {
  Container,
  Box,
  Grid,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function AddProduct() {
  const location = useLocation();
  const [type, setType] = useState("add");

  useEffect(() => {
    const types = location.search.split("type=");
    setType(types[1]);
  }, [location]);
  return (
    <Container>
      <Typography>Add Product</Typography>
      <Box mb={2} mt={2}>
        <Grid container spacing={1}>
          <Grid item md={12}>
            <lable>Name</lable> <br />
            <TextField size='small' />
          </Grid>
          <Grid item md={12}>
            <lable>Price</lable> <br />
            <TextField size='small' />
          </Grid>
          <Grid item md={12}>
            <lable>Quantity</lable> <br />
            <TextField size='small' />
          </Grid>
          <Grid item md={12}>
            <lable>Category</lable> <br />
            <TextField size='small' />
          </Grid>
          <Grid item md={12}>
            {type == "add" && <Button variant='outlined'>Submit</Button>}

            {type == "delete" && <Button variant='outlined'>Delete</Button>}

            {type == "edit" && <Button variant='outlined'>Update</Button>}
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
