import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProdutosPage = lazy(() => import('./pages/ProdutosPage'));
const SobreNosPage = lazy(() => import('./pages/SobreNosPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));

function AppContent() {
  const location = useLocation();
  const isAdminPage = ['/gestao-operacional', '/acesso-interno'].includes(location.pathname);

  return (
    <>
      {!isAdminPage && <TopBar />}
      {!isAdminPage && <Navbar />}
      <main>
        <Suspense fallback={<div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#f8fafc', color: '#0d2240', fontFamily: 'Inter, sans-serif' }}>Carregando...</div>}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/produtos" element={<ProdutosPage />} />
            <Route path="/sobre-nos" element={<SobreNosPage />} />
            <Route path="/acesso-interno" element={<LoginPage />} />
            <Route
              path="/gestao-operacional"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            {/* Redirecionamentos para rotas antigas ou para alinhar com a documentação acadêmica */}
            <Route path="/admin" element={<Navigate to="/acesso-interno" replace />} />
            <Route path="/login" element={<Navigate to="/acesso-interno" replace />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
