import { Button, Grid, TextField } from "@mui/material";
import { Container } from "@mui/system";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkIsAdmin } from "../../Utils/LoginCheck";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigator = useNavigate();

  const loginHandler = () => {
    if (email != "" && password != "") {
      const isAdmin = checkIsAdmin(email, password);
      sessionStorage.setItem("isAdmin", isAdmin);
      navigator({
        pathname: "/",
      });
    } else {
      alert("Please enter email and password");
    }
  };
  return (
    <Container>
      <h4>Login</h4>
      <Grid container spacing={1}>
        <Grid item md={12}>
          <label>Email</label>
          <br />
          <TextField
            size='small'
            type={"text"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Grid>
        <Grid item md={12}>
          <label>Password</label>
          <br />
          <TextField
            size='small'
            type={"password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Grid>
        <Grid item md={12}>
          <Button onClick={loginHandler} variant='outlined'>
            Submit
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
}
