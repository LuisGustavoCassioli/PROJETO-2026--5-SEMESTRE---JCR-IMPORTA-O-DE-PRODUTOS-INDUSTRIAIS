import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Loader2, PackageSearch, Search, ArrowRight, SlidersHorizontal, MessageCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './ProdutosPage.css';

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    image_url?: string;
    images?: string[];
}

type Category = 'Todos' | 'Pressão' | 'Vácuo' | 'Temperatura' | 'Acessórios';

const categories: Category[] = ['Todos', 'Pressão', 'Vácuo', 'Temperatura', 'Acessórios'];

const categoryClasses: Record<Category, string> = {
    'Todos': 'cat-todos',
    'Pressão': 'cat-pressao',
    'Vácuo': 'cat-vacuo',
    'Temperatura': 'cat-temperatura',
    'Acessórios': 'cat-acessorios'
};

export default function ProdutosPage() {
    const [active, setActive] = useState<Category>('Todos');
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

    useEffect(() => {
        // ... (fetch logic remains same)
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

    const filtered = products.filter(p => {
        const matchesCategory = active === 'Todos' || p.category === active;
        const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.tags?.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
        return matchesCategory && matchesSearch;
    });

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
            {/* Page Header */}
            <div className="page-header" style={{ marginBottom: '0' }}>
                <div className="page-header-bg" aria-hidden="true" />
                <div className="container page-header-content">
                    <h1 style={{ fontSize: '2.5rem' }}>Catálogo Técnico</h1>
                    <p style={{ maxWidth: '600px', fontSize: '1.1rem', opacity: 0.9 }}>
                        Encontre a instrumentação ideal para o seu projeto com busca inteligente e filtros por linha.
                    </p>
                    <nav className="breadcrumb" aria-label="Navegação">
                        <Link to="/">Início</Link>
                        <ChevronRight size={14} />
                        <span style={{ color: 'white', fontWeight: 600 }}>Produtos</span>
                    </nav>
                </div>
            </div>

            <section className="section" style={{ paddingTop: '3rem' }}>
                <div className="container products-layout">
                    {/* Sidebar filter */}
                    <aside className="filters-sidebar">
                        <div className="filters-card card">
                            <h4 style={{ color: 'var(--navy)', fontWeight: 700 }}>Categorias</h4>
                            <div className="filter-list">
                                {categories.map(cat => (
                                    <button
                                        key={cat}
                                        className={`filter-btn ${categoryClasses[cat]} ${active === cat ? 'active' : ''}`}
                                        onClick={() => {
                                            setActive(cat);
                                            window.scrollTo({ top: 300, behavior: 'smooth' });
                                        }}
                                    >
                                        <ChevronRight size={16} />
                                        {cat}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Imporved Customization Block */}
                        <div className="sidebar-cta-improved">
                            <div className="cta-icon-wrapper">
                                <SlidersHorizontal size={20} />
                            </div>
                            <h5>Projetos Especiais</h5>
                            <p>
                                Desenvolvemos instrumentos sob medida para aplicações industriais complexas e alta performance.
                            </p>
                            <a
                                href="https://api.whatsapp.com/send?phone=5511987599931&text=Olá! Gostaria de falar sobre um projeto de instrumentação sob medida."
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-cta-sidebar"
                            >
                                <MessageCircle size={18} /> Consulting Tech
                            </a>
                        </div>
                    </aside>

                    {/* Product Grid Area */}
                    <div className="products-results">
                        <div className="results-header">
                            {/* Functional Search Bar */}
                            <div className="search-container">
                                <Search size={20} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                                <input
                                    type="text"
                                    className="search-input"
                                    placeholder="O que você está procurando? (Ex: Manômetro Inox, 10 bar...)"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>

                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                <p style={{ fontWeight: 600, color: 'var(--text-main)' }}>
                                    {loading ? 'Sincronizando catálogo...' : (
                                        <>Exibindo <span style={{ color: 'var(--red)' }}>{filtered.length}</span> instrumentos encontrados</>
                                    )}
                                </p>
                                {searchTerm && (
                                    <button
                                        onClick={() => setSearchTerm('')}
                                        style={{ background: 'none', border: 'none', color: 'var(--red)', fontSize: '0.85rem', cursor: 'pointer', fontWeight: 600 }}
                                    >
                                        Limpar Busca
                                    </button>
                                )}
                            </div>
                        </div>

                        {loading ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '10rem 0', color: '#94a3b8' }}>
                                <Loader2 className="animate-spin" size={48} style={{ color: 'var(--navy)', marginBottom: '1.5rem' }} />
                                <p style={{ fontWeight: 500 }}>Carregando dados técnicos...</p>
                            </div>
                        ) : filtered.length === 0 ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '8rem 0', color: '#94a3b8', textAlign: 'center' }}>
                                <div style={{ background: '#f1f5f9', padding: '2rem', borderRadius: '50%', marginBottom: '2rem' }}>
                                    <PackageSearch size={80} strokeWidth={1} style={{ opacity: 0.5 }} />
                                </div>
                                <h3 style={{ color: 'var(--navy)', marginBottom: '1rem' }}>Sua busca não retornou resultados</h3>
                                <p style={{ maxWidth: '400px' }}>Tente outros termos ou entre em contato com nossa central de atendimento.</p>
                                <button
                                    onClick={() => { setSearchTerm(''); setActive('Todos'); }}
                                    className="btn btn-outline"
                                    style={{ marginTop: '2rem' }}
                                >
                                    Ver todos os produtos
                                </button>
                            </div>
                        ) : (
                            <div className="product-grid">
                                {filtered.map(product => (
                                    <div key={product.id} className="product-result-card shadow-sm">
                                        <div className="card-img-wrapper">
                                            {product.images?.[0] ? (
                                                <img src={product.images[0]} alt={product.name} />
                                            ) : product.image_url ? (
                                                <img src={product.image_url} alt={product.name} />
                                            ) : (
                                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f1f5f9' }}>
                                                    <PackageSearch size={40} color="#cbd5e1" />
                                                </div>
                                            )}
                                            <div className="card-cat-badge">{product.category}</div>
                                            {product.images && product.images.length > 1 && (
                                                <span style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.7)', color: 'white', fontSize: '11px', padding: '4px 8px', borderRadius: '6px', fontWeight: 600 }}>
                                                    +{product.images.length - 1} fotos
                                                </span>
                                            )}
                                        </div>

                                        <div className="card-content">
                                            <h3>{product.name}</h3>
                                            <div className="card-summary">{product.description}</div>

                                            <div className="card-tags">
                                                {product.tags?.slice(0, 3).map(tag => (
                                                    <span key={tag} className="card-tag">{tag}</span>
                                                ))}
                                                {product.tags?.length > 3 && <span className="card-tag" style={{ background: 'none' }}>...</span>}
                                            </div>

                                            <div className="card-actions">
                                                <a
                                                    href={`https://api.whatsapp.com/send?phone=5511987599931&text=Olá! Gostaria de um orçamento para o produto: ${product.name}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary"
                                                    style={{ width: '100%', justifyContent: 'center' }}
                                                >
                                                    Solicitar orçamento
                                                </a>
                                                <button
                                                    onClick={() => setSelectedProduct(product)}
                                                    className="btn btn-secondary-link"
                                                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                                                >
                                                    Ver detalhes técnicos <ArrowRight size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* Product Details Modal */}
            {selectedProduct && (
                <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
                    <div className="modal-container" onClick={e => e.stopPropagation()}>
                        <button className="modal-close" onClick={() => setSelectedProduct(null)}>&times;</button>
                        <div className="modal-body">
                            <div className="modal-gallery">
                                {selectedProduct.images?.[0] ? (
                                    <img src={selectedProduct.images[0]} alt={selectedProduct.name} className="modal-main-img" />
                                ) : (
                                    <img src={selectedProduct.image_url} alt={selectedProduct.name} className="modal-main-img" />
                                )}
                                <div className="modal-thumbnails">
                                    {selectedProduct.images?.map((img, idx) => (
                                        <img key={idx} src={img} alt={`Vista ${idx + 1}`} onClick={(e) => {
                                            const main = e.currentTarget.closest('.modal-gallery')?.querySelector('.modal-main-img') as HTMLImageElement;
                                            if (main) main.src = img;
                                        }} />
                                    ))}
                                </div>
                            </div>
                            <div className="modal-info">
                                <div className="modal-cat-tag">{selectedProduct.category}</div>
                                <h2>{selectedProduct.name}</h2>
                                <div className="modal-desc">
                                    <h4>Descrição Técnica</h4>
                                    <p>{selectedProduct.description}</p>
                                </div>
                                <div className="modal-specs">
                                    {selectedProduct.tags?.map(tag => (
                                        <span key={tag} className="modal-spec-tag">{tag}</span>
                                    ))}
                                </div>
                                <div className="modal-cta">
                                    <a
                                        href={`https://api.whatsapp.com/send?phone=5511987599931&text=Gostaria de detalhes técnicos e orçamento para: ${selectedProduct.name}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn btn-primary"
                                        style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
                                    >
                                        <MessageCircle size={18} style={{ marginRight: '8px' }} /> Solicitar Orçamento via WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

