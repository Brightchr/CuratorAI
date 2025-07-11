import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout.jsx";
import Chat from "./pages/Chat.jsx";
import Signup from "./pages/Signup";

const App = () => {
  return (
    <Routes>
      {/* Public route outside layout */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/chat" element={<Chat />} />

      {/* Routes using layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* Add other authenticated/layout-wrapped routes here */}
      </Route>

      <Route element={<AuthenticatedLayout />} />

    </Routes>
  );
};

export default App;
