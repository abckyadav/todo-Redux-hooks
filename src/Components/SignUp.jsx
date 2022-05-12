import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const SignUp = () => {
  const navigate = useNavigate();

  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    username: "",
    mobile: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("clicked");

    fetch(`https://masai-api-mocker.herokuapp.com/auth/register`, {
      method: "POST",
      body: JSON.stringify(details),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        alert(`User Created Successfully`);
        navigate("/login");
      });
  };

  return (
    <div>
      <h1>Signup</h1>

      <Box
        style={{ marginTop: "20px" }}
        component="form"
        sx={{
          "& > :not(style)": { m: 2, width: "25ch" },
        }}
        autoComplete="off"
        onSubmit={handleSubmit}
      >
        <TextField
          required
          id="outlined-basic"
          label="Name"
          variant="outlined"
          name="name"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        <TextField
          required
          id="outlined-basic"
          label="Email"
          variant="outlined"
          name="email"
          onChange={(e) => {
            handleChange(e);
          }}
        />{" "}
        <br />
        <TextField
          required
          id="outlined-basic"
          label="Password"
          variant="outlined"
          name="password"
          onChange={(e) => {
            handleChange(e);
          }}
        />{" "}
        <br />
        <TextField
          required
          id="outlined-basic"
          label="Username"
          variant="outlined"
          name="username"
          onChange={(e) => {
            handleChange(e);
          }}
        />{" "}
        <br />
        <TextField
          required
          type="number"
          id="outlined-basic"
          label="Mobile Number"
          variant="outlined"
          name="mobile"
          onChange={(e) => {
            handleChange(e);
          }}
        />{" "}
        <br />
        <TextField
          required
          id="outlined-basic"
          label="Description"
          variant="outlined"
          name="description"
          onChange={(e) => {
            handleChange(e);
          }}
        />
        <br />
        <Button type="submit" color="success" size="large" variant="contained">
          Register
        </Button>
      </Box>
    </div>
  );
};

export default SignUp;
