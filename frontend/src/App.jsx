import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthenticatedLayout from "./layouts/AuthenticatedLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import ChatDashboard from "./pages/ChatDashboard";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Private Pages WITHOUT MainLayout */}
      <Route
        path="/chat"
        element={
          <PrivateRoute>
            <AuthenticatedLayout>
              <ChatDashboard />
            </AuthenticatedLayout>
          </PrivateRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <AuthenticatedLayout>
              <Profile />
            </AuthenticatedLayout>
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
