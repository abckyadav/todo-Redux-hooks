import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../Redux/Login/action";
import { getTodosData } from "../Redux/Todos/action";

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
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />

      <input
        type="text"
        placeholder="Enter Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
