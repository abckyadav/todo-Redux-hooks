import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";
import { getTodosData } from "../Redux/Todos/action.js";

import Sidebar from "./Sidebar";
import TaskContainer from "./TaskContainer";

const Container = styled.div`
  margin: 0;
  padding: 25px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  height: 100vh;
  gap: 20px;
`;
const GridItem1 = styled.div`
  grid-column: 1/3;
  border: 2px solid red;
`;
const GridItem2 = styled.div`
  grid-column: 3/6;
  border: 2px solid green;
`;
const GridItem3 = styled.div`
  grid-column: 6/9;
  border: 2px solid teal;
`;
const GridItem4 = styled.div`
  grid-column: 9/12;
  border: 2px solid blue;
`;

const Home = () => {
  const dispatch = useDispatch();

  const { token, username } = useSelector((state) => state.login);
  const { todos } = useSelector((state) => state.todos);
  console.log("todos at home page:", todos);

  useEffect(() => {
    dispatch(getTodosData());
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <Container>
        <GridItem1>
          <Sidebar token={token} username={username} todos={todos} />
        </GridItem1>
        <GridItem2>
          <TaskContainer
            tasks={todos.filter((item) => item.status === "Todo")}
            color="#B4FF9F"
            heading="TODOS"
          />
        </GridItem2>
        <GridItem3>
          <TaskContainer
            tasks={todos.filter((item) => item.status === "InProgress")}
            color="#F9FFA4"
            heading="IN PROGRESS"
          />
        </GridItem3>
        <GridItem4>
          <TaskContainer
            tasks={todos.filter((item) => item.status === "Done")}
            color="#FFD59E"
            heading="DONE"
          />
        </GridItem4>
      </Container>
    </div>
  );
};

export default Home;
