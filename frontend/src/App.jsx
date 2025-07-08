import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";

const App = () => {
  return (
    <Routes>
      {/* Public route outside layout */}
      <Route path="/login" element={<Login />} />

      {/* Routes using layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* Add other authenticated/layout-wrapped routes here */}
      </Route>
    </Routes>
  );
};

export default App;
