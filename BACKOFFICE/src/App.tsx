import { Route, Routes } from "react-router-dom";
import Sidebar from "./components/layout/Sidebar";
import ProtectedRoute from "./components/routing/ProtectedRoute";
import AdminsPage from "./pages/Admins/AdminsPage";
import CategoriesPage from "./pages/Category/CategoryPage";
import ExercisesPage from "./pages/Exercises/ExercisesPage";
import HistoriesPage from "./pages/Histories/HistoriesPage";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SessionsPage from "./pages/Sessions/SessionsPage";
import UsersPage from "./pages/Users/UsersPage";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="*"
        element={
          <ProtectedRoute>
            <div className="flex">
              <Sidebar />
              <div className="ml-64 flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/users" element={<UsersPage />} />
                  <Route path="/exercises" element={<ExercisesPage />} />
                  <Route path="/admins" element={<AdminsPage />} />
                  <Route path="/sessions" element={<SessionsPage />} />
                  <Route path="/histories" element={<HistoriesPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                </Routes>
              </div>
            </div>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
