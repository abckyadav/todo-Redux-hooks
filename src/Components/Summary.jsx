import React, { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { getTodosData } from "../Redux/Todos/action.js";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";

const Container = styled.div`
  margin: 0;
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100vh;
  gap: 20px;
`;
const GridItem1 = styled.div`
  grid-column: 1/4;
  border: 2px solid red;
`;
const GridItem2 = styled.div`
  grid-column: 4/13;
  border: 2px solid green;
  padding: 25px;
`;

const Card = styled.div`
  border: 2px solid #cecece;
  padding: 25px;
  width: 200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Summary = () => {
  const { token, username } = useSelector((state) => state.login);
  const { todos } = useSelector((state) => state.todos);

  return (
    <Container>
      <GridItem1>
        <Sidebar token={token} username={username} todos={todos} />
      </GridItem1>
      <GridItem2>
        <h1>Summary</h1>
        <Card>
          <div>TODO</div>
          <div>{todos.filter((item) => item.status === "Todo").length}</div>
        </Card>
        <Card>
          <div>INPROGRESS</div>
          <div>
            {todos.filter((item) => item.status === "InProgress").length}
          </div>
        </Card>
        <Card>
          <div>DONE</div>
          <div>{todos.filter((item) => item.status === "Done").length}</div>
        </Card>
      </GridItem2>
    </Container>
  );
};

export default Summary;
