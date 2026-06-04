import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";

import Dashboard from "../pages/dashboard/Dashboard";

import Criteria from "../pages/admin/Criteria";
import Alternatives from "../pages/admin/Alternatives";

import Questionnaire from "../pages/questionnaire/Questionnaire";
import Result from "../pages/result/Result";

import StudentQuestionnaire from "../pages/student/StudentQuestionnaire";
import StudentResult from "../pages/student/StudentResult";
import StudentResultDetail from "../pages/student/StudentResultDetail";

import ProtectedRoute from "../components/ProtectedRoute";
import Profile from "../pages/profile/Profile";
import Waspas from "../pages/waspas/Waspas";
import History from "../pages/history/History";
import Students from "../pages/admin/Students";
import HistoryAdmin from "../pages/admin/HistoryAdmin";
import AlternativeCriteria from "../pages/admin/AlternativeCriteria";
import AdminProfile from "../pages/admin/AdminProfile";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/waspas" element={<Waspas />} />
        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* ADMIN */}
        <Route
          path="/admin/criteria"
          element={
            <ProtectedRoute>
              <Criteria />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/profile"
          element={
            <ProtectedRoute>
              <AdminProfile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/alternative-criteria"
          element={
            <ProtectedRoute>
              <AlternativeCriteria />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/students"
          element={
            <ProtectedRoute>
              <Students />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/HistoryAdmin"
          element={
            <ProtectedRoute>
              <HistoryAdmin />
            </ProtectedRoute>
          }
        />
        <Route path="/history" element={<History />} />
        <Route
          path="/admin/alternatives"
          element={
            <ProtectedRoute>
              <Alternatives />
            </ProtectedRoute>
          }
        />

        <Route
          path="/questionnaire"
          element={
            <ProtectedRoute>
              <Questionnaire />
            </ProtectedRoute>
          }
        />

        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* STUDENT */}
        <Route
          path="/student/questionnaire"
          element={<StudentQuestionnaire />}
        />
        <Route path="/student/result" element={<StudentResult />} />
        {/* RESULT DETAIL */}
        <Route
          path="/student/result/detail"
          element={<StudentResultDetail />}
        />
        {/* HISTORY DETAIL */}
        <Route
          path="/student/result/history/:id"
          element={<StudentResultDetail />}
        />
      </Routes>
    </BrowserRouter>
  );
}
