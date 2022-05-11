import React from "react";
import styled from "styled-components";
import TaskItem from "./TaskItem";

const Wrapper = styled.div``;

const HeadingWrapper = styled.div`
  text-align: center;
  background: ${(props) => props.color};
  padding: 20px;
  font-size: 22px;
`;

const TaskContainer = ({ tasks, color, heading }) => {
  console.log("tasks:", tasks);
  return (
    <Wrapper>
      <HeadingWrapper color={color}>{heading}</HeadingWrapper>
      {tasks.map((task) => (
        <TaskItem key={task.id} {...task} />
      ))}
    </Wrapper>
  );
};

export default TaskContainer;
