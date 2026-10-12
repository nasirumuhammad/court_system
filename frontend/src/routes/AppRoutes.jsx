import { BrowserRouter, Routes, Route } from "react-router-dom";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import Landing from "../pages/public/Landing";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import NotFound from "../pages/auth/NotFound"
import DashboardHome from "../pages/dashboard/DashboardHome";
import Cases from "../pages/cases/Cases";
import Hearings from "../pages/dashboard/Hearings";
import Documents from "../pages/documents/Documents";
import Users from "../pages/users/Users";
import Reports from "../pages/reports/Reports";
import Profile from "../pages/profile/Profile";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
          </Route>
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardLayout />}>
              <Route index element={<DashboardHome />} />
              <Route path="cases" element={<Cases />} />
              <Route path="hearings" element={<Hearings />} />
              <Route path="documents" element={<Documents />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="profile" element={<Profile />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
}