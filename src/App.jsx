import "./App.css";
import { Link, Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import TodoCreate from "./Components/TodoCreate";
import { useSelector } from "react-redux";
import TodosEdit from "./Components/TodosEdit";
import Summary from "./Components/Summary";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.login);

  return (
    <div className="App">
      <div style={{ display: "flex" }}>
        <div style={{ marginLeft: "5px", marginRight: "5px" }}>
          <Link to="/">HOME</Link>
        </div>
        <div style={{ marginLeft: "5px", marginRight: "5px" }}>
          <Link to="/login">LOGIN</Link>
        </div>
        <div style={{ marginLeft: "5px", marginRight: "5px" }}>
          <Link to="/todos-create">CREATE TODOS</Link>
        </div>
        <div style={{ marginLeft: "5px", marginRight: "5px" }}>
          <Link to="/summary">Summary</Link>
        </div>
      </div>

      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route
          path="/"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/todos-create"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TodoCreate />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/todos/:id/edit"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <TodosEdit />
            </PrivateRoute>
          }
        ></Route>

        <Route
          path="/summary"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Summary />
            </PrivateRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
