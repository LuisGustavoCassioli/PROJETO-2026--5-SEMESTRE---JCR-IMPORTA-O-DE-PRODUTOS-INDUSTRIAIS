import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, SlidersHorizontal, Loader2, PackageSearch } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './ProdutosPage.css';

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
}

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


export default function ProdutosPage() {
    const [active, setActive] = useState<Category>('Todos');
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (!error && data) {
                setProducts(data);
            }
            setLoading(false);
        };
        fetchProducts();
    }, []);

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
                            <p>
                                {loading ? 'Carregando...' : `${filtered.length} produto${filtered.length !== 1 ? 's' : ''} encontrado${filtered.length !== 1 ? 's' : ''}`}
                            </p>
                        </div>

                        {loading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 0', color: 'var(--text-muted)' }}>
                                <Loader2 className="animate-spin" size={40} style={{ color: 'var(--navy)', marginBottom: '1rem' }} />
                                <p>Carregando nosso catálogo...</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '5rem 0', color: 'var(--text-muted)', textAlign: 'center' }}>
                                <PackageSearch size={64} strokeWidth={1} style={{ marginBottom: '1.5rem', opacity: 0.5 }} />
                                <h3>Nenhum produto encontrado</h3>
                                <p>Tente selecionar outra categoria ou entre em contato para pedidos especiais.</p>
                            </div>
                        ) : (
                            <div className="product-grid">
                                {filtered.map(product => (
                                    <div key={product.id} className="card product-result-card">
                                        <div className="product-result-icon">
                                            {(() => {
                                                const Icon = categoryIcons[product.category as Category] || categoryIcons['Todos'];
                                                return <Icon size={24} />;
                                            })()}
                                        </div>
                                        <div className="product-result-cat">{product.category}</div>
                                        <h3>{product.name}</h3>
                                        <p>{product.description}</p>
                                        <div className="product-tags">
                                            {product.tags?.map(tag => (
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
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

