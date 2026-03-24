import { Link } from 'react-router-dom';
import { Phone, MessageCircle, CheckCircle, ArrowRight, ChevronRight } from 'lucide-react';
import './HomePage.css';

/* SVG instrument illustrations */
const ManometerSVG = () => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="90">
        <circle cx="60" cy="60" r="52" fill="#f8f9fa" stroke="#d1dae6" strokeWidth="2" />
        <circle cx="60" cy="60" r="42" fill="white" stroke="#c41520" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="36" fill="white" stroke="#d1dae6" strokeWidth="0.5" />
        <text x="60" y="48" textAnchor="middle" fontSize="7" fill="#3d5166" fontFamily="Inter">kgf/cm²</text>
        {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
            <line key={i}
                x1={60 + 32 * Math.cos((a - 180) * Math.PI / 180)}
                y1={60 + 32 * Math.sin((a - 180) * Math.PI / 180)}
                x2={60 + (i % 3 === 0 ? 26 : 29) * Math.cos((a - 180) * Math.PI / 180)}
                y2={60 + (i % 3 === 0 ? 26 : 29) * Math.sin((a - 180) * Math.PI / 180)}
                stroke="#3d5166" strokeWidth={i % 3 === 0 ? 1.5 : 0.8}
            />
        ))}
        <line x1="60" y1="60" x2={60 + 28 * Math.cos(-140 * Math.PI / 180)} y2={60 + 28 * Math.sin(-140 * Math.PI / 180)} stroke="#c41520" strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="60" r="4" fill="#0d2240" />
        <rect x="53" y="108" width="14" height="8" rx="2" fill="#3d5166" />
    </svg>
);

const ThermometerSVG = () => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="90">
        <circle cx="40" cy="95" r="18" fill="#c41520" opacity="0.1" stroke="#c41520" strokeWidth="1.5" />
        <circle cx="40" cy="95" r="11" fill="#c41520" />
        <rect x="36" y="20" width="8" height="80" rx="4" fill="#f8f9fa" stroke="#d1dae6" strokeWidth="1" />
        <rect x="38" y="50" width="4" height="50" rx="2" fill="#c41520" />
        {[30, 45, 60, 75].map(y => (
            <line key={y} x1="44" y1={y} x2="50" y2={y} stroke="#3d5166" strokeWidth="1" />
        ))}
    </svg>
);

const VacuometerSVG = () => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="90">
        <circle cx="60" cy="60" r="52" fill="#f8f9fa" stroke="#d1dae6" strokeWidth="2" />
        <circle cx="60" cy="60" r="42" fill="white" stroke="#0d2240" strokeWidth="1.5" />
        <text x="60" y="48" textAnchor="middle" fontSize="7" fill="#3d5166" fontFamily="Inter">VÁCUO</text>
        {[0, 45, 90, 135, 180, 225, 270, 315].map((a, i) => (
            <line key={i}
                x1={60 + 32 * Math.cos((a - 180) * Math.PI / 180)}
                y1={60 + 32 * Math.sin((a - 180) * Math.PI / 180)}
                x2={60 + (i % 2 === 0 ? 26 : 29) * Math.cos((a - 180) * Math.PI / 180)}
                y2={60 + (i % 2 === 0 ? 26 : 29) * Math.sin((a - 180) * Math.PI / 180)}
                stroke="#0d2240" strokeWidth={i % 2 === 0 ? 1.5 : 0.8}
            />
        ))}
        <line x1="60" y1="60" x2={60 + 28 * Math.cos(30 * Math.PI / 180)} y2={60 + 28 * Math.sin(30 * Math.PI / 180)} stroke="#0d2240" strokeWidth="2" strokeLinecap="round" />
        <circle cx="60" cy="60" r="4" fill="#c41520" />
        <rect x="53" y="108" width="14" height="8" rx="2" fill="#0d2240" />
    </svg>
);

const AccessorySVG = () => (
    <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" width="120" height="60">
        <path d="M5 30 Q30 10 60 30 Q90 50 115 30" stroke="#3d5166" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="5" cy="30" r="5" fill="#c41520" />
        <circle cx="115" cy="30" r="5" fill="#c41520" />
        <rect x="54" y="24" width="12" height="12" rx="2" fill="#d1dae6" stroke="#3d5166" strokeWidth="1" />
    </svg>
);

const products = [
    { name: 'Pressão', desc: 'Manômetros e transmissores', Visual: ManometerSVG, color: '#c41520' },
    { name: 'Vácuo', desc: 'Vacuômetros e manovacuômetros', Visual: VacuometerSVG, color: '#0d2240' },
    { name: 'Temperatura', desc: 'Termômetros e termopares', Visual: ThermometerSVG, color: '#c41520' },
    { name: 'Acessórios', desc: 'Sifões, válvulas e conexões', Visual: AccessorySVG, color: '#0d2240' },
];

const applications = [
    'Indústrias de Bebidas', 'Indústrias Petroquímicas', 'Indústrias Farmacêuticas',
    'Indústrias Siderúrgicas', 'Indústrias de Mineração', 'Indústrias Automotivas',
    'Indústrias de Maquinarias', 'Área Hospitalar', 'Caldeiraria', 'Construtoras',
];

export default function HomePage() {
    return (
        <>
            {/* ── HERO ── */}
            <section className="hero">
                {/* Left: text */}
                <div className="hero-left">
                    <div className="hero-eyebrow">
                        <span className="eyebrow-dash" /><span className="eyebrow-dash" />
                        <span>Instrumentação Industrial</span>
                    </div>
                    <h1>
                        Soluções em<br />
                        <span>Instrumentação</span>
                    </h1>
                    <p className="hero-accent-text">Qualidade e confiabilidade em cada medição</p>
                    <p className="hero-desc">
                        Da medição de pressão à temperatura e vácuo, conte com nossa expertise em instrumentação industrial. Oferecemos produtos de alta qualidade e atendimento especializado.
                    </p>

                    {/* Contacts */}
                    <div className="hero-contacts">
                        <a href="tel:+551120841083" className="hero-contact-item">
                            <div className="hero-contact-icon"><Phone size={16} /></div>
                            <span>(11) 2084-1083</span>
                        </a>
                        <a href="mailto:contato@jcrprodutosindustriais.com.br" className="hero-contact-item">
                            <div className="hero-contact-icon mail"><span style={{ fontSize: '0.7rem', fontWeight: 700 }}>@</span></div>
                            <span>contato@jcrprodutosindustriais.com.br</span>
                        </a>
                    </div>

                    {/* CTA buttons */}
                    <div className="hero-actions">
                        <a
                            href="https://api.whatsapp.com/send?phone=5511987599931"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp"
                        >
                            <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                            </svg>
                            Fale Conosco
                        </a>
                        <Link to="/produtos" className="btn btn-navy">
                            Ver Produtos <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>

                {/* Right: visual panel */}
                <div className="hero-right">
                    <div className="hero-diagonal" />
                    <div className="hero-image-collage">
                        <div className="hero-img-main">
                            <img src="/hero_industrial.png" alt="Industrial instrumentation gauges" />
                        </div>
                    </div>
                </div>
            </section>

            {/* ── PRODUCT LINE ── */}
            <section className="section section-bg">
                <div className="container">
                    <h2 className="section-title text-center">Linha de Produtos</h2>
                    <div className="divider divider-center" />

                    <div className="products-carousel">
                        {products.map(({ name, desc, Visual, color }) => (
                            <Link to="/produtos" key={name} className="product-tile card">
                                <div className="product-tile-visual">
                                    <Visual />
                                </div>
                                <div className="product-tile-label" style={{ color }}>
                                    {name}
                                </div>
                                <p className="product-tile-desc">{desc}</p>
                                <span className="product-tile-link" style={{ color }}>
                                    Ver produtos <ArrowRight size={13} />
                                </span>
                            </Link>
                        ))}
                    </div>

                    <div className="text-center" style={{ marginTop: '2.5rem' }}>
                        <Link to="/produtos" className="btn btn-navy">
                            Ver Todos os Produtos <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>

            {/* ── ABOUT ── */}
            <section className="section">
                <div className="container about-home-grid">
                    <div className="about-home-text">
                        <div className="badge">Nossa História</div>
                        <h2 className="section-title">Sobre Nós</h2>
                        <div className="divider" />
                        <p>
                            Com mais de <strong>15 anos de experiência</strong> no setor de instrumentação industrial, a J.C.R IMPORTAÇÃO DE PRODUTOS INDUSTRIAIS é uma empresa familiar que alia tradição, conhecimento técnico e compromisso com a qualidade.
                        </p>
                        <p>
                            Prezamos pela pontualidade, agilidade no atendimento e um relacionamento transparente com nossos clientes.
                        </p>
                        <div className="about-home-items">
                            {[
                                'Cumprimento rigoroso de prazos',
                                'Agilidade em responder cotações',
                                'Suporte técnico especializado',
                                'Parceria e transparência',
                            ].map(i => (
                                <div key={i} className="about-home-item">
                                    <CheckCircle size={15} />
                                    <span>{i}</span>
                                </div>
                            ))}
                        </div>
                        <Link to="/sobre-nos" className="btn btn-outline" style={{ marginTop: '2rem' }}>
                            Saiba mais sobre nós <ArrowRight size={15} />
                        </Link>
                    </div>

                    <div className="about-home-visual">
                        {/* Industry stats cards */}
                        <div className="stat-grid">
                            {[
                                { n: '+15', label: 'Anos de Experiência', color: 'var(--red)' },
                                { n: '100%', label: 'Compromisso com Qualidade', color: 'var(--navy)' },
                                { n: 'B2B', label: 'Foco Industrial', color: 'var(--red)' },
                                { n: '24h', label: 'Resposta em Cotações', color: 'var(--navy)' },
                            ].map(s => (
                                <div key={s.label} className="stat-card">
                                    <div className="stat-num" style={{ color: s.color }}>{s.n}</div>
                                    <div className="stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* ── APPLICATIONS ── */}
            <section className="section section-bg">
                <div className="container">
                    <div className="text-center" style={{ marginBottom: '2.5rem' }}>
                        <div className="badge">Onde Atuamos</div>
                        <h2 className="section-title">Aplicações de um Manômetro</h2>
                        <div className="divider divider-center" />
                    </div>
                    <div className="applications-grid">
                        {applications.map(app => (
                            <div key={app} className="app-item">
                                <div className="app-dot" />
                                <span>{app}</span>
                            </div>
                        ))}
                    </div>
                    <div className="text-center" style={{ marginTop: '3rem' }}>
                        <a
                            href="https://api.whatsapp.com/send?phone=5511987599931"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary"
                        >
                            Solicitar Cotação <ChevronRight size={16} />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── CTA BANNER ── */}
            <section className="cta-banner">
                <div className="container cta-inner">
                    <div>
                        <h2 style={{ color: '#fff' }}>Precisa de um orçamento rápido?</h2>
                        <p style={{ color: 'rgba(255,255,255,0.72)', marginTop: '0.5rem' }}>
                            Nossa equipe responde em até 24h. Entre em contato agora.
                        </p>
                    </div>
                    <div className="cta-actions">
                        <a href="tel:+551120841083" className="btn btn-outline-white">
                            <Phone size={16} /> (11) 2084-1083
                        </a>
                        <a
                            href="https://api.whatsapp.com/send?phone=5511987599931"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp"
                        >
                            <MessageCircle size={16} /> WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </>
    );
}
