import React, { useReducer, useState } from "react";
import { v4 as uuid } from "uuid";
import { getTodosData } from "../Redux/Todos/action.js";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Sidebar from "./Sidebar.jsx";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Button from "@mui/material/Button";

/*
{
  title: "",
  description: "",
  status: "Todo" || "in-progress" || "done",
  tags: { official: false, personal: false, others: false },
  date: date,
  subtasks: [
    {
      id: "",
      subTaskTile: "",
      subTaskStatus: boolean
    },
  ]
}
*/

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

const initState = {
  title: "",
  description: "",
  subtasks: [],
  status: "",
  tags: { official: false, personal: false, others: false },
  date: "",
};

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_TITLE":
      return { ...state, title: payload };
    case "UPDATE_DESCRIPTION":
      return { ...state, description: payload };
    case "UPDATE_STATUS":
      return { ...state, status: payload };
    case "UPDATE_TAGS":
      return { ...state, tags: { ...state.tags, ...payload } };
    case "CHANGE_DATE":
      return { ...state, date: payload };
    case "UPDATE_SUBTASK":
      return { ...state, subtasks: [...state.subtasks, payload] };
    case "TOGGLE_SUBTASK":
      const subtaskAfterToggle = state.subtasks.map((el) =>
        el.id === payload.id ? { ...el, subtaskStatus: payload.status } : el
      );
      return { ...state, subtasks: subtaskAfterToggle };

    case "DELETE_SUBTASK":
      const subtaskAfterDeletion = state.subtasks.filter(
        (el) => el.id !== payload
      );
      return { ...state, subtasks: subtaskAfterDeletion };
    case "RESET":
      return { ...initState };
    default:
      throw new Error("Please give proper action object");
  }
};

const TodoCreate = () => {
  const [state, dispatch] = useReducer(reducer, initState);

  const reduxDispatch = useDispatch();

  const [subTaskInput, setSubTaskInput] = useState("");

  const { token, username } = useSelector((state) => state.login);

  const { todos } = useSelector((state) => state.todos);

  const { title, description, subtasks, status, tags, date } = state;

  const { official, personal, others } = tags;

  const createNewTask = () => {
    const payload = { ...state };

    fetch(`https://tododnjson.herokuapp.com/todos`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-Type": "application/json" },
    })
      .then(() => reduxDispatch(getTodosData()))
      .then(() => dispatch({ type: "RESET" }));
  };

  return (
    <Container>
      <GridItem1>
        <Sidebar token={token} username={username} todos={todos} />
      </GridItem1>
      <GridItem2>
        <h1>Create Todos</h1>

        <Box
          component="form"
          sx={{
            "& > :not(style)": { m: 1, width: "25ch" },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            type="text"
            id="outlined-basic"
            label="Title"
            value={title}
            onChange={(e) =>
              dispatch({ type: "UPDATE_TITLE", payload: e.target.value })
            }
          />
          <br />
          <TextField
            id="outlined-basic"
            type="text"
            label="Description"
            value={description}
            onChange={(e) =>
              dispatch({ type: "UPDATE_DESCRIPTION", payload: e.target.value })
            }
          />
        </Box>

        <FormControl style={{ marginTop: "10px", marginBottom: "10px" }}>
          <FormLabel id="demo-radio-buttons-group-label">
            Choose One Type
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            name="radio-buttons-group"
          >
            <FormControlLabel
              checked={status === "Todo"}
              onChange={(e) =>
                dispatch({ type: "UPDATE_STATUS", payload: "Todo" })
              }
              control={<Radio />}
              label="Todo"
            />
            <FormControlLabel
              checked={status === "InProgress"}
              onChange={(e) =>
                dispatch({ type: "UPDATE_STATUS", payload: "InProgress" })
              }
              control={<Radio />}
              label="InProgress"
            />
            <FormControlLabel
              checked={status === "Done"}
              onChange={(e) =>
                dispatch({ type: "UPDATE_STATUS", payload: "Done" })
              }
              control={<Radio />}
              label="Done"
            />
          </RadioGroup>
        </FormControl>

        <br />

        <div style={{ margin: "10px" }}>
          <label>
            <input
              type="checkbox"
              checked={official}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_TAGS",
                  payload: { official: e.target.checked },
                });
              }}
            />
            OFFICIAL
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={personal}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_TAGS",
                  payload: { personal: e.target.checked },
                });
              }}
            />
            PERSONAL
          </label>
          <br />

          <label>
            <input
              type="checkbox"
              checked={others}
              onChange={(e) => {
                dispatch({
                  type: "UPDATE_TAGS",
                  payload: { others: e.target.checked },
                });
              }}
            />
            OTHERS
          </label>
          <br />
          <br />
          <p>Select date</p>
          <input
            type="date"
            value={date}
            onChange={(e) =>
              dispatch({ type: "CHANGE_DATE", payload: e.target.value })
            }
          />
          <br />

          <h3>Create Sub-Tasks</h3>
          <TextField
            size="small"
            id="outlined-basic"
            type="text"
            label="Enter Subtasks"
            value={subTaskInput}
            onChange={(e) => setSubTaskInput(e.target.value)}
          />
          <Button
            style={{ marginLeft: "10px" }}
            variant="contained"
            size="medium"
            onClick={() => {
              const payload = {
                id: uuid(),
                subtaskTitle: subTaskInput,
                subtaskStatus: false,
              };
              dispatch({ type: "UPDATE_SUBTASK", payload });
              setSubTaskInput("");
            }}
          >
            ADD SUBTASK
          </Button>

          <div>
            {subtasks.map((elem) => (
              <div key={elem.id} style={{ display: "flex" }}>
                <label>
                  <input
                    type="checkbox"
                    checked={elem.subtaskStatus}
                    onChange={(e) =>
                      dispatch({
                        type: "TOGGLE_SUBTASK",
                        payload: { id: elem.id, status: e.target.checked },
                      })
                    }
                  />
                  {elem.subtaskTitle}
                </label>

                <Button
                  variant="contained"
                  onClick={() =>
                    dispatch({ type: "DELETE_SUBTASK", payload: elem.id })
                  }
                >
                  Delete Sub-Task
                </Button>
              </div>
            ))}
          </div>
        </div>

        <Button variant="contained" color="success" onClick={createNewTask}>
          Create Task
        </Button>
      </GridItem2>
    </Container>
  );
};

export default TodoCreate;
