import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../Redux/Login/action";
import { getTodosData } from "../Redux/Todos/action";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Login = () => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.login);
  dispatch(getTodosData());

  const handleLogin = () => {
    const payload = {
      username,
      password,
    };
    dispatch(login(payload));
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <h1>Enter Login Credentials</h1>
      <Box
        style={{ marginTop: "20px" }}
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <TextField
          id="outlined-basic"
          label="Password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <Button color="success" variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    </div>
  );
};

export default Login;
