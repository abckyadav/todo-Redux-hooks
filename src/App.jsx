import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import TodoCreate from "./Components/TodoCreate";
import { useSelector } from "react-redux";
import TodosEdit from "./Components/TodosEdit";
import Summary from "./Components/Summary";
import { Navbar } from "./Components/Navbar";
import SignUp from "./Components/SignUp";

const PrivateRoute = ({ isAuthenticated, children }) => {
  return isAuthenticated ? children : <Navigate to="/login" />;
};

function App() {
  const { isAuthenticated } = useSelector((state) => state.login);

  return (
    <div>
      <Navbar />
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />}></Route>

          <Route path="/register" element={<SignUp />}></Route>

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
    </div>
  );
}

export default App;
