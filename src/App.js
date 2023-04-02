import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import "./App.css";
import NotFound from "./components/notfound";

import Space from "./components/space";
import Logout from "./components/logout";
import LoginForm from "./components/loginform";
import RegisterForm from "./components/registerform ";
import auth from "./services/authService";
import TaskWarpper from "./components/task";

function App() {
  const navigate = useNavigate();

  const user = auth.getCurrentUser();
  return (
    <Routes>
      <Route path="/login" element={<LoginForm navigate={navigate} />} />
      <Route path="/logout" element={<Logout />} />

      <Route path="/register" element={<RegisterForm navigate={navigate} />} />

      <Route
        path="/space"
        element={user ? <Space /> : <Navigate to="/" replace />}
      />
      <Route path="/space/:id" element={<TaskWarpper navigate={navigate} />} />

      <Route path="/" element={<LoginForm />} />
      <Route path="/notfound" element={<NotFound />} />
      <Route path="*" element={<Navigate to="/notfound" replace />} />
    </Routes>
  );
}

export default App;
