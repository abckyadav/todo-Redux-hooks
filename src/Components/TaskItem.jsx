import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { getTodosData } from "../Redux/Todos/action";
import { useNavigate } from "react-router-dom";

const TaskItemWrapper = styled.div`
  margin: 5px;
  padding: 5px;
  border: 1px solid #cecece;
  font-size: 14px;
`;
const HeadSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SubTaskSection = styled.div``;

const TaskItem = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  console.log("props:", props);

  const { title, description, subtasks, status, tags, date, id } = props;
  const { personal, official, others } = tags;
  console.log("tags:", tags);
  console.log("subtasks:", subtasks);

  return (
    <TaskItemWrapper>
      <HeadSection>
        <div>
          <p>{title}</p>
          <p>
            {personal && "PERSONAL"} {official && "OFFFICIAL"}{" "}
            {others && "OTHERS"}
          </p>
          <p>{description}</p>
        </div>
        <div>{date}</div>
        <div></div>
      </HeadSection>
      <SubTaskSection>
        {subtasks.map((subtask) => (
          <div key={subtask.id}>
            <label>
              <input
                type="checkbox"
                checked={subtask.subtaskStatus}
                onChange={(e) => {
                  const subtasksAfterToggle = subtasks.map((item) =>
                    item.id === subtask.id
                      ? { ...subtask, subtaskStatus: e.target.checked }
                      : item
                  );

                  const payload = {
                    title,
                    description,
                    date,
                    tags,
                    subtasks: subtasksAfterToggle,
                    status,
                  };

                  fetch(`http://localhost:3001/todos/${id}`, {
                    method: "PUT",
                    body: JSON.stringify(payload),
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }).then(() => dispatch(getTodosData()));
                }}
              />
            </label>
            {subtask.subtaskTitle}
          </div>
        ))}
      </SubTaskSection>
      <button onClick={() => navigate(`/todos/${id}/edit`)}>EDIT</button>
    </TaskItemWrapper>
  );
};

export default TaskItem;
