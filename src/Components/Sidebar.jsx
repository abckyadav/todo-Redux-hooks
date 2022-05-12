import React from "react";
import Profile from "./Profile";
import TagStats from "./TagStats";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Login/action";
import Button from "@mui/material/Button";

const Sidebar = ({ token, username, todos }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Profile token={token} username={username} />
      <hr />
      <TagStats todos={todos} />
      <hr />

      <Button
        variant="contained"
        color="error"
        onClick={() => dispatch(logout())}
      >
        Logout
      </Button>
    </div>
  );
};

export default Sidebar;
