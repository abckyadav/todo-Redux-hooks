import React from "react";
import Profile from "./Profile";
import TagStats from "./TagStats";
import { useDispatch } from "react-redux";
import { logout } from "../Redux/Login/action";

const Sidebar = ({ token, username, todos }) => {
  const dispatch = useDispatch();

  return (
    <div>
      <Profile token={token} username={username} />
      <hr />
      <TagStats todos={todos} />
      <hr />
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Sidebar;
