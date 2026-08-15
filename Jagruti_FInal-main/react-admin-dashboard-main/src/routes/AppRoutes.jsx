import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Topbar from "../components/Topbar";
import Dashboard from "../pages/Dashboard";
import Blog from "../pages/Blog";
import Donation from "../pages/Donation";
import Gallery from "../pages/Gallery";
import Contact from "../pages/Contact";
import Settings from "../pages/Settings";
import Programs from "../pages/Program";
import ProfileCard from "../pages/Profile";
import Login from "../pages/Login";

// Protected Route Guard
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("adminToken");
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// Admin Wrapper layout with Topbar
const AuthenticatedLayout = ({ children }) => {
  return (
    <>
      <Topbar />
      {children}
    </>
  );
};

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Dashboard Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Dashboard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/program"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Programs />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/blog"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Blog />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Donation />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/gallery"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Gallery />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Contact />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/settings"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <Settings />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <AuthenticatedLayout>
                <ProfileCard />
              </AuthenticatedLayout>
            </ProtectedRoute>
          }
        />

        {/* Catch-all redirect to /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;