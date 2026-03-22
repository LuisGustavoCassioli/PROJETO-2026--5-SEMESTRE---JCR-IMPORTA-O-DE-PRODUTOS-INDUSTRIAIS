import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ChevronRight } from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => { const t = setTimeout(() => setOpen(false), 0); return () => clearTimeout(t); }, [location]);

    const links = [
        { to: '/', label: 'Início' },
        { to: '/produtos', label: 'Produtos' },
        { to: '/sobre-nos', label: 'Sobre Nós' },
    ];

    return (
        <header className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="container navbar-inner">
                {/* Logo */}
                <Link to="/" className="logo">
                    <img src="/logo.png" alt="JCR Importação de Produtos Industriais" className="navbar-logo-img" />
                </Link>

                {/* Desktop links */}
                <nav className="nav-links">
                    {links.map(l => (
                        <Link key={l.to} to={l.to} className={`nav-link ${location.pathname === l.to ? 'active' : ''}`}>
                            {l.label}
                        </Link>
                    ))}
                </nav>

                {/* CTA */}
                <a
                    href="https://api.whatsapp.com/send?phone=5511987599931"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-whatsapp navbar-cta"
                >
                    Solicitar Cotação
                    <ChevronRight size={15} />
                </a>

                {/* Mobile toggle */}
                <button className="menu-toggle" onClick={() => setOpen(!open)}>
                    {open ? <X size={22} /> : <Menu size={22} />}
                </button>
            </div>

            {/* Mobile menu */}
            <div className={`mobile-menu ${open ? 'open' : ''}`}>
                {links.map(l => (
                    <Link key={l.to} to={l.to} className={`mobile-link ${location.pathname === l.to ? 'active' : ''}`}>
                        {l.label}
                    </Link>
                ))}
                <div style={{ padding: '1rem 1.5rem' }}>
                    <a
                        href="https://api.whatsapp.com/send?phone=5511987599931"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-whatsapp"
                        style={{ width: '100%', justifyContent: 'center' }}
                    >
                        Solicitar Cotação
                    </a>
                </div>
            </div>
        </header>
    );
}
