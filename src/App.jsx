import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ProtectedRoute from "./config/ProtectedRoute";
import PageNotFound from "./pages/PageNotFound";
import Index from "./pages/Index";
import EditProfile from "./pages/EditProfile";
import GuestRoute from "./config/GuestRoute";

export default function App() {
  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-800 flex flex-col items-center">
      <Routes>
        <Route
          path="login"
          element={
            <GuestRoute>
              <Login />
            </GuestRoute>
          }
        />
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Index />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}
