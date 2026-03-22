import { Link } from 'react-router-dom';
import { ChevronRight, MapPin, Phone, MessageCircle, Mail, CheckCircle, Users, Target, Zap } from 'lucide-react';
import './SobreNosPage.css';

export default function SobreNosPage() {
    return (
        <>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-bg" aria-hidden="true" />
                <div className="container page-header-content">
                    <h1>Sobre Nós</h1>
                    <p>Conheça a história e os valores que movem a JCR Importação de Produtos Industriais.</p>
                    <nav className="breadcrumb" aria-label="Navegação">
                        <Link to="/">Início</Link>
                        <ChevronRight size={14} />
                        <span>Sobre Nós</span>
                    </nav>
                </div>
            </div>

            {/* ── About Story ── */}
            <section className="section">
                <div className="container about-story">
                    <div className="story-text">
                        <div className="badge"><Users size={12} /> Nossa História</div>
                        <h2 className="section-title">J.C.R Importação de<br /><span className="text-accent">Produtos Industriais</span></h2>
                        <div className="divider" />
                        <p>
                            A <strong>J.C.R IMPORTAÇÃO DE PRODUTOS INDUSTRIAIS</strong> está atuando no campo de instrumentação industrial há mais de 15 anos, com conhecimentos que vem passando de geração em geração.
                        </p>
                        <p>
                            Nós trabalhamos com eficiência não só na qualidade do material, como também no cumprimento de prazos de entrega, na agilidade em responder cotações, dúvidas, follow up, financeiro ou em qualquer esclarecimento que precisar.
                        </p>
                        <p>
                            Somos uma empresa que preza pela <strong>parceria</strong>, valorizando a cada dia que passa os integrantes da nossa empresa e os nossos clientes.
                        </p>
                    </div>
                    <div className="story-visual">
                        <div className="visual-card">
                            <div className="visual-number">15<span>+</span></div>
                            <p>Anos de experiência em instrumentação industrial</p>
                        </div>
                        <div className="visual-card accent">
                            <div className="visual-number">100<span>%</span></div>
                            <p>Comprometimento com qualidade e pontualidade</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── Values ── */}
            <section className="section" style={{ background: 'var(--bg)' }}>
                <div className="container">
                    <div className="text-center section-header">
                        <div className="badge">Nosso Diferencial</div>
                        <h2 className="section-title">O que nos define</h2>
                        <div className="divider divider-center" />
                    </div>

                    <div className="values-grid">
                        <div className="value-card card">
                            <div className="value-icon"><Users size={24} /></div>
                            <h3>Nosso Diferencial</h3>
                            <p>
                                Nossos vendedores, técnicos, engenheiros e diretores são preparados para atender da melhor forma, com <strong>transparência e igualdade</strong> no tratamento com todos — tanto no início da venda quanto no pós-venda.
                            </p>
                        </div>
                        <div className="value-card card">
                            <div className="value-icon"><Target size={24} /></div>
                            <h3>Nosso Objetivo</h3>
                            <p>
                                Temos como missão atuar no mercado trabalhando o crescimento, as modernizações, ética, qualidade, conhecimento, ter um bom relacionamento com nossos clientes e alcançar a confiança e expectativa depositada em nós.
                            </p>
                        </div>
                        <div className="value-card card">
                            <div className="value-icon"><Zap size={24} /></div>
                            <h3>Agilidade Total</h3>
                            <p>
                                Da solicitação de cotação ao pós-venda, nossa equipe responde com rapidez e eficiência. Cada cliente recebe atenção personalizada e soluções que realmente atendem às suas necessidades operacionais.
                            </p>
                        </div>
                    </div>

                    <div className="commitments">
                        {[
                            'Pontualidade na entrega',
                            'Agilidade nas cotações',
                            'Follow up e suporte',
                            'Transparência nos negócios',
                            'Parceria de longo prazo',
                            'Qualidade garantida',
                        ].map(item => (
                            <div key={item} className="commitment-item">
                                <CheckCircle size={16} style={{ color: 'var(--accent)', flexShrink: 0 }} />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Contact ── */}
            <section className="section">
                <div className="container contact-layout">
                    <div>
                        <div className="badge">Contato</div>
                        <h2 className="section-title">Fale Conosco</h2>
                        <div className="divider" />
                        <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                            Estamos prontos para atender sua empresa. Entre em contato pelos canais abaixo.
                        </p>

                        <div className="contact-cards">
                            <a href="tel:+551120841083" className="contact-card card">
                                <div className="contact-card-icon"><Phone size={20} /></div>
                                <div>
                                    <strong>Telefone</strong>
                                    <span>(11) 2084-1083</span>
                                </div>
                            </a>
                            <a
                                href="https://api.whatsapp.com/send?phone=5511987599931"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="contact-card card"
                            >
                                <div className="contact-card-icon green"><MessageCircle size={20} /></div>
                                <div>
                                    <strong>WhatsApp</strong>
                                    <span>(11) 98759-9931</span>
                                </div>
                            </a>
                            <a href="mailto:contato@jcrprodutosindustriais.com.br" className="contact-card card">
                                <div className="contact-card-icon"><Mail size={20} /></div>
                                <div>
                                    <strong>E-mail</strong>
                                    <span>contato@jcrprodutosindustriais.com.br</span>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="address-card card">
                        <div className="address-icon"><MapPin size={28} /></div>
                        <h3>Endereço</h3>
                        <address>
                            Av. Sapopemba, 667<br />
                            Vila Regente Feijó<br />
                            São Paulo - SP<br />
                            CEP: 03346-100
                        </address>
                        <a
                            href="https://www.google.com/maps/search/Av.+Sapopemba,+667+Vila+Regente+Feijó+São+Paulo"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-outline"
                            style={{ marginTop: '1.5rem', fontSize: '0.85rem' }}
                        >
                            <MapPin size={15} />
                            Ver no Mapa
                        </a>
                    </div>
                </div>
            </section>

            {/* ── CTA ── */}
            <section className="cta-strip">
                <div className="container cta-strip-inner">
                    <h2>Pronto para fazer negócios?</h2>
                    <p>Entre em contato agora e receba uma cotação personalizada para o seu projeto.</p>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                        <a
                            href="https://api.whatsapp.com/send?phone=5511987599931"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-whatsapp"
                        >
                            Solicitar Cotação via WhatsApp
                        </a>
                        <Link to="/produtos" className="btn btn-outline">
                            Ver Produtos
                            <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
