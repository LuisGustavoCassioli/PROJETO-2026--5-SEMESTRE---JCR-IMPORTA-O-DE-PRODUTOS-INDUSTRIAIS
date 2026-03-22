import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import TopBar from './components/TopBar';
import HomePage from './pages/HomePage';
import ProdutosPage from './pages/ProdutosPage';
import SobreNosPage from './pages/SobreNosPage';
import './index.css';

function App() {
  return (
    <Router>
      <TopBar />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/produtos" element={<ProdutosPage />} />
          <Route path="/sobre-nos" element={<SobreNosPage />} />
        </Routes>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
