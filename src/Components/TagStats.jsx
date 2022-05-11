import React from "react";
import styled from "styled-components";

const TagCard = styled.div`
  padding: 25px;
  & > * {
    text-align: center;
    padding: 5px 0 5px 0;
  }
`;

const TagStats = ({ todos }) => {
  return (
    <TagCard>
      <div>All -{todos.length} </div>

      <div>Personal - {todos.filter((item) => item.tags.personal).length}</div>

      <div>Official - {todos.filter((item) => item.tags.official).length}</div>

      <div>Others - {todos.filter((item) => item.tags.others).length}</div>
    </TagCard>
  );
};

export default TagStats;
