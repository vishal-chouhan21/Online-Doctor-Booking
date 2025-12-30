import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthProvider, { AuthContext } from "./context/AuthContext";
import { DoctorProvider } from "./context/DoctorContext";

import ProtectedRoute from "./components/ProtectedRoute";
import PrivateLayout from "./layout/PrivateLayout";

import { AdminAppointmentProvider } from "../src/context/AdminAppointmentContext.jsx";
import AdminAppointmentList from "../src/pages/AdminAppointmentList.jsx";
import ActiveAppointmentList from "./pages/ActivAppointment.jsx";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Logout from "./pages/Logout";
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import AddDoctor from "./pages/AddDoctor";
import EditDoctor from "./pages/EditDoctor";

/* =======================
   Public Route
======================= */
const PublicRoute = ({ children }) => {
  const { admin, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        Checking authentication…
      </div>
    );
  }

  if (admin) return <Navigate to="/dashboard" replace />;
  return children;
};

/* =======================
   App Routes
======================= */
const AppContent = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

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

      {/* 🔐 Protected Admin Routes */}
      <Route
        element={
          <ProtectedRoute>
            <PrivateLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/appointment" element={<AdminAppointmentList />} />
        <Route path="/my-profile" element={<MyProfile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/support" element={<Support />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/add-doctor" element={<AddDoctor />} />
        <Route path="/edit-doctor/:id" element={<EditDoctor />} />
        <Route path="/active-appointment" element={<ActiveAppointmentList/>} />
      </Route>
    </Routes>
  );
};

/* =======================
   App Root
======================= */
export default function App() {
  return (
    <AuthProvider>
      <DoctorProvider>
        <AdminAppointmentProvider>
          <AppContent />
        </AdminAppointmentProvider>
      </DoctorProvider>
    </AuthProvider>
  );
}
