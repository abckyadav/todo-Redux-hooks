import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { Link } from "react-router-dom";

export const Navbar = () => {
  const styling = {
    textDecoration: "none",
    color: "white",
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Todo App
          </Typography>

          <Link style={styling} to="/">
            <Button color="inherit">Home</Button>
          </Link>
          <Link style={styling} to="/todos-create">
            <Button color="inherit">Create-Todos</Button>
          </Link>
          <Link style={styling} to="/summary">
            <Button color="inherit">Summary</Button>
          </Link>
          <Link style={styling} to="/login">
            <Button color="inherit">Login</Button>
          </Link>
          <Link style={styling} to="/register">
            <Button color="inherit">Register</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
