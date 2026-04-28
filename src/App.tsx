import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CookieConsent from "react-cookie-consent";
import TopBar from './components/TopBar';
import ProtectedRoute from './components/ProtectedRoute';
import './index.css';

const HomePage = lazy(() => import('./pages/HomePage'));
const ProdutosPage = lazy(() => import('./pages/ProdutosPage'));
const SobreNosPage = lazy(() => import('./pages/SobreNosPage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const TermosUsoPage = lazy(() => import('./pages/TermosUsoPage'));
const PoliticaPrivacidadePage = lazy(() => import('./pages/PoliticaPrivacidadePage'));
const PoliticaCookiesPage = lazy(() => import('./pages/PoliticaCookiesPage'));

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
            <Route path="/termos-de-uso" element={<TermosUsoPage />} />
            <Route path="/politica-de-privacidade" element={<PoliticaPrivacidadePage />} />
            <Route path="/politica-de-cookies" element={<PoliticaCookiesPage />} />
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
      <CookieConsent
        location="bottom"
        buttonText="Aceito e concordo"
        cookieName="jcr_lgpd_consent"
        style={{ background: "#0d2240", fontSize: "14px" }}
        buttonStyle={{ background: "#c41520", color: "white", fontSize: "13px", fontWeight: "bold", borderRadius: "4px" }}
        expires={150}
      >
        Nós utilizamos cookies essenciais e tecnologias semelhantes para aprimorar sua experiência corporativa em nosso catálogo B2B.
        Consulte as nossas <Link to="/politica-de-privacidade" style={{ color: "#c41520", textDecoration: "underline" }}>políticas de privacidade</Link> para mais detalhes.
      </CookieConsent>
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
