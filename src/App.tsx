import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import ProdutosPage from './pages/ProdutosPage';
import SobreNosPage from './pages/SobreNosPage';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

function AppContent() {
  const location = useLocation();
  const isAdminPage = ['/gestao-operacional', '/acesso-interno'].includes(location.pathname);

  return (
    <>
      {!isAdminPage && <TopBar />}
      {!isAdminPage && <Navbar />}
      <main>
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
          {/* Redirecionamentos para rotas antigas ou inexistentes para esconder a admin */}
          <Route path="/admin" element={<Navigate to="/" replace />} />
          <Route path="/login" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
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
