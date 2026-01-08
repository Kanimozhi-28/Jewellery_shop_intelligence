import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, ProtectedRoute, useAuth } from './context/AuthContext';
import { Sidebar } from './components/Sidebar';

// Admin Pages
const AdminDashboard = React.lazy(() => import('./pages/Dashboard'));
const JewelleryAnalytics = React.lazy(() => import('./pages/JewelleryAnalytics'));
const SalesPerformance = React.lazy(() => import('./pages/SalesPerformance'));
const ZoneAnalytics = React.lazy(() => import('./pages/ZoneAnalytics'));
const LostOpportunities = React.lazy(() => import('./pages/LostOpportunities'));
const AdminSettings = React.lazy(() => import('./pages/Settings'));
const Login = React.lazy(() => import('./pages/Login'));

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 ml-64 p-8" style={{ backgroundColor: 'var(--bg-dark)', minHeight: '100vh' }}>
        {children}
      </main>
    </div>
  );
};

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<Login portal="admin" />} />

      <Route path="/*" element={
        <ProtectedRoute allowedRoles={['admin']}>
          <Layout>
            <Routes>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="jewellery" element={<JewelleryAnalytics />} />
              <Route path="sales-team" element={<SalesPerformance />} />
              <Route path="zones" element={<ZoneAnalytics />} />
              <Route path="lost-opps" element={<LostOpportunities />} />
              <Route path="reports" element={<AdminSettings />} />
              <Route path="settings" element={<AdminSettings />} />
              <Route path="*" element={<Navigate to="dashboard" />} />
            </Routes>
          </Layout>
        </ProtectedRoute>
      } />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <React.Suspense fallback={<div className="h-screen w-full flex items-center justify-center bg-black text-gold font-bold">ADMIN PORTAL LOADING...</div>}>
          <AppRoutes />
        </React.Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
