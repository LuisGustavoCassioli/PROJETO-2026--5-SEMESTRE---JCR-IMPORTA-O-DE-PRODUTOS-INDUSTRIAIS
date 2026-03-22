import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal } from 'lucide-react';
import './ProdutosPage.css';

type Category = 'Todos' | 'Pressão' | 'Vácuo' | 'Temperatura' | 'Acessórios';

const categories: Category[] = ['Todos', 'Pressão', 'Vácuo', 'Temperatura', 'Acessórios'];

/* SVG instrument illustrations */
const ManometerSVG = ({ size = 24 }: { size?: number }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
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
    </svg>
);

const ThermometerSVG = ({ size = 24 }: { size?: number }) => (
    <svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width={(size * 80) / 120} height={size}>
        <circle cx="40" cy="95" r="18" fill="#c41520" opacity="0.1" stroke="#c41520" strokeWidth="1.5" />
        <circle cx="40" cy="95" r="11" fill="#c41520" />
        <rect x="36" y="20" width="8" height="80" rx="4" fill="#f8f9fa" stroke="#d1dae6" strokeWidth="1" />
        <rect x="38" y="50" width="4" height="50" rx="2" fill="#c41520" />
        {[30, 45, 60, 75].map(y => (
            <line key={y} x1="44" y1={y} x2="50" y2={y} stroke="#3d5166" strokeWidth="1" />
        ))}
    </svg>
);

const VacuometerSVG = ({ size = 24 }: { size?: number }) => (
    <svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width={size} height={size}>
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
    </svg>
);

const AccessorySVG = ({ size = 24 }: { size?: number }) => (
    <svg viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg" width={size * 2} height={size}>
        <path d="M5 30 Q30 10 60 30 Q90 50 115 30" stroke="#3d5166" strokeWidth="3" fill="none" strokeLinecap="round" />
        <circle cx="5" cy="30" r="5" fill="#c41520" />
        <circle cx="115" cy="30" r="5" fill="#c41520" />
        <rect x="54" y="24" width="12" height="12" rx="2" fill="#d1dae6" stroke="#3d5166" strokeWidth="1" />
    </svg>
);

const categoryIcons: Record<Category, React.ComponentType<{ size?: number }>> = {
    Todos: SlidersHorizontal,
    Pressão: ManometerSVG,
    Vácuo: VacuometerSVG,
    Temperatura: ThermometerSVG,
    Acessórios: AccessorySVG,
};


const products = [
    {
        id: 1,
        name: 'Manômetro Industrial',
        category: 'Pressão' as Category,
        desc: 'Manômetro de alta precisão para medição de pressão em ambientes industriais agressivos. Caixas em aço inox, bronze ou plástico.',
        tags: ['Medição', 'Pressão', 'Aço Inox'],
    },
    {
        id: 2,
        name: 'Manômetro de Glicerina',
        category: 'Pressão' as Category,
        desc: 'Manômetro preenchido com glicerina para redução de oscilações em sistemas de alta vibração e pulsação.',
        tags: ['Alta Vibração', 'Glicerina', 'Precisão'],
    },
    {
        id: 3,
        name: 'Vacuômetro',
        category: 'Vácuo' as Category,
        desc: 'Equipamento para medição de pressão negativa (vácuo). Ideal para sistemas de bombeamento e processos a vácuo.',
        tags: ['Vácuo', 'Bombeamento'],
    },
    {
        id: 4,
        name: 'Manovacuômetro',
        category: 'Vácuo' as Category,
        desc: 'Combina medição de pressão positiva e negativa em um único instrumento. Solução versátil e econômica.',
        tags: ['Versátil', 'Pressão e Vácuo'],
    },
    {
        id: 5,
        name: 'Termômetro Bimetálico',
        category: 'Temperatura' as Category,
        desc: 'Termômetros bimetálicos com hastes de diversas medidas e conexões, para processos industriais e comerciais.',
        tags: ['Temperatura', 'Bimetálico'],
    },
    {
        id: 6,
        name: 'Termômetro de Vidro',
        category: 'Temperatura' as Category,
        desc: 'Termômetros de imersão com proteção metálica, para aplicações em laboratórios e processos industriais gerais.',
        tags: ['Laboratório', 'Imersão'],
    },
    {
        id: 7,
        name: 'Sifão Tipo U',
        category: 'Acessórios' as Category,
        desc: 'Sifão tipo U para proteção de manômetros contra vapor. Evita danos ao instrumento por temperaturas elevadas.',
        tags: ['Proteção', 'Vapor', 'Sifão'],
    },
    {
        id: 8,
        name: 'Snubber / Amortecedor',
        category: 'Acessórios' as Category,
        desc: 'Amortecedor de pressão para proteger instrumentos contra choques e pulsações em sistemas hidráulicos e pneumáticos.',
        tags: ['Proteção', 'Hidráulico', 'Pneumático'],
    },
    {
        id: 9,
        name: 'Válvula de Bloqueio',
        category: 'Acessórios' as Category,
        desc: 'Válvula de bloqueio para isolar o instrumento do processo, permitindo manutenção sem interrupção da linha.',
        tags: ['Válvula', 'Manutenção'],
    },
];

export default function ProdutosPage() {
    const [active, setActive] = useState<Category>('Todos');

    const filtered = active === 'Todos' ? products : products.filter(p => p.category === active);

    return (
        <>
            {/* Page Header */}
            <div className="page-header">
                <div className="page-header-bg" aria-hidden="true" />
                <div className="container page-header-content">
                    <h1>Nossos Produtos</h1>
                    <p>Instrumentação industrial de precisão para os mais diversos setores e aplicações.</p>
                    <nav className="breadcrumb" aria-label="Navegação">
                        <Link to="/">Início</Link>
                        <ChevronRight size={14} />
                        <span>Produtos</span>
                    </nav>
                </div>
            </div>

            <section className="section">
                <div className="container products-layout">
                    {/* Sidebar filter */}
                    <aside className="filters-sidebar">
                        <div className="filters-card card">
                            <h4>Filtrar por Linha</h4>
                            <div className="filter-list">
                                {categories.map(cat => {
                                    const Icon = categoryIcons[cat];
                                    return (
                                        <button
                                            key={cat}
                                            className={`filter-btn ${active === cat ? 'active' : ''}`}
                                            onClick={() => setActive(cat)}
                                        >
                                            <Icon size={15} />
                                            {cat}
                                            {active === cat && <span className="filter-dot" />}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className="sidebar-cta card">
                            <h4>Precisa de um produto específico?</h4>
                            <p>Entre em contato. Nossa equipe encontra a solução ideal para sua necessidade.</p>
                            <a
                                href="https://api.whatsapp.com/send?phone=5511987599931"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-whatsapp"
                                style={{ fontSize: '0.85rem', padding: '0.7rem 1.2rem' }}
                            >
                                Solicitar Cotação
                            </a>
                        </div>
                    </aside>

                    {/* Product Grid */}
                    <div className="products-results">
                        <div className="results-header">
                            <p>{filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}</p>
                        </div>
                        <div className="product-grid">
                            {filtered.map(product => (
                                <div key={product.id} className="card product-result-card">
                                    <div className="product-result-icon">
                                        {(() => { const Icon = categoryIcons[product.category]; return <Icon size={24} />; })()}
                                    </div>
                                    <div className="product-result-cat">{product.category}</div>
                                    <h3>{product.name}</h3>
                                    <p>{product.desc}</p>
                                    <div className="product-tags">
                                        {product.tags.map(tag => (
                                            <span key={tag} className="product-tag">{tag}</span>
                                        ))}
                                    </div>
                                    <a
                                        href="https://api.whatsapp.com/send?phone=5511987599931"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ fontSize: '0.82rem', padding: '0.6rem 1.1rem', marginTop: '1rem' }}
                                    >
                                        Solicitar Cotação
                                    </a>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
