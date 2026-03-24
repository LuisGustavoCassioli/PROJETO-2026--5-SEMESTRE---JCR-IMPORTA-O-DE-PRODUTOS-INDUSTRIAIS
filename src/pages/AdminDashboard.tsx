import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
    Plus, Search, Edit2, Trash2, Package, LogOut,
    X, Loader2
} from 'lucide-react';
import './AdminDashboard.css';

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    created_at: string;
}

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Pressão');
    const [tags, setTags] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setProducts(data);
        setLoading(false);
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    const openModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setName(product.name);
            setDescription(product.description);
            setCategory(product.category);
            setTags(product.tags.join(', '));
        } else {
            setEditingProduct(null);
            setName('');
            setDescription('');
            setCategory('Pressão');
            setTags('');
        }
        setIsModalOpen(true);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const tagArray = tags.split(',').map(t => t.trim()).filter(Boolean);

        const payload = {
            name,
            description,
            category,
            tags: tagArray
        };

        if (editingProduct) {
            const { error } = await supabase
                .from('products')
                .update(payload)
                .eq('id', editingProduct.id);
            if (!error) setIsModalOpen(false);
        } else {
            const { error } = await supabase
                .from('products')
                .insert([payload]);
            if (!error) setIsModalOpen(false);
        }
        fetchProducts();
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Tem certeza que deseja excluir este produto?')) return;
        const { error } = await supabase.from('products').delete().eq('id', id);
        if (!error) fetchProducts();
    };

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ minHeight: '100vh', background: '#f0f2f5' }}>
            {/* Top Header */}
            <header style={{ background: 'var(--navy)', color: '#fff', padding: '1rem 0', position: 'sticky', top: 0, zIndex: 10 }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <Package size={24} />
                        <h1 style={{ fontFamily: 'Oswald, sans-serif', fontSize: '1.25rem', margin: 0 }}>Painel Admin JCR</h1>
                    </div>
                    <button onClick={handleLogout} className="btn" style={{ color: '#fff', display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(255,255,255,0.1)' }}>
                        <LogOut size={18} /> Sair
                    </button>
                </div>
            </header>

            <main className="section">
                <div className="container">
                    {/* Actions Bar */}
                    <div className="card" style={{ padding: '1.5rem', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div style={{ position: 'relative', flex: 1, maxWidth: '400px' }}>
                            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                            <input
                                type="text"
                                placeholder="Buscar produtos..."
                                className="form-input"
                                style={{ paddingLeft: '40px' }}
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button onClick={() => openModal()} className="btn btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <Plus size={20} /> Novo Produto
                        </button>
                    </div>

                    {/* List */}
                    <div className="card" style={{ overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                            <thead style={{ background: '#f8f9fa', borderBottom: '1px solid var(--border)' }}>
                                <tr>
                                    <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>PRODUTO</th>
                                    <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>CATEGORIA</th>
                                    <th style={{ textAlign: 'left', padding: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>TAGS</th>
                                    <th style={{ textAlign: 'right', padding: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>AÇÕES</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: 'center', padding: '3rem' }}>
                                            <Loader2 className="animate-spin" size={32} style={{ color: 'var(--navy)', margin: '0 auto' }} />
                                            <p style={{ marginTop: '1rem', color: 'var(--text-muted)' }}>Carregando catálogo...</p>
                                        </td>
                                    </tr>
                                ) : filteredProducts.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ textAlign: 'center', padding: '3rem' }}>
                                            <Package size={48} style={{ color: '#d1dae6', margin: '0 auto 1rem' }} />
                                            <p style={{ color: 'var(--text-muted)' }}>Nenhum produto cadastrado.</p>
                                        </td>
                                    </tr>
                                ) : filteredProducts.map(p => (
                                    <tr key={p.id} style={{ borderBottom: '1px solid var(--border)' }}>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{p.name}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</div>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <span className="badge" style={{ margin: 0, textTransform: 'capitalize' }}>{p.category}</span>
                                        </td>
                                        <td style={{ padding: '1rem' }}>
                                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap' }}>
                                                {p.tags.map(t => <span key={t} style={{ fontSize: '0.65rem', background: '#eee', padding: '2px 6px', borderRadius: '4px' }}>{t}</span>)}
                                            </div>
                                        </td>
                                        <td style={{ padding: '1rem', textAlign: 'right' }}>
                                            <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                                                <button onClick={() => openModal(p)} className="btn" style={{ padding: '0.4rem', color: 'var(--navy)' }} title="Editar"><Edit2 size={16} /></button>
                                                <button onClick={() => handleDelete(p.id)} className="btn" style={{ padding: '0.4rem', color: 'var(--red)' }} title="Excluir"><Trash2 size={16} /></button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Modal CRUD */}
            {isModalOpen && (
                <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100, padding: '1rem' }}>
                    <div className="card" style={{ width: '100%', maxWidth: '600px', padding: '2rem', position: 'relative' }}>
                        <button onClick={() => setIsModalOpen(false)} style={{ position: 'absolute', right: '1rem', top: '1rem', padding: '0.5rem', background: 'none', border: 'none', cursor: 'pointer' }}><X size={20} /></button>
                        <h2 style={{ fontFamily: 'Oswald, sans-serif', marginBottom: '1.5rem' }}>{editingProduct ? 'Editar Produto' : 'Novo Produto'}</h2>

                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                            <div>
                                <label className="form-label">Nome do Produto</label>
                                <input type="text" className="form-input" required value={name} onChange={e => setName(e.target.value)} />
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div>
                                    <label className="form-label">Categoria</label>
                                    <select className="form-input" value={category} onChange={e => setCategory(e.target.value)}>
                                        <option value="Pressão">Pressão</option>
                                        <option value="Vácuo">Vácuo</option>
                                        <option value="Temperatura">Temperatura</option>
                                        <option value="Acessórios">Acessórios</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="form-label">Tags (separadas por vírgula)</label>
                                    <input type="text" className="form-input" placeholder="Inox, Precisão..." value={tags} onChange={e => setTags(e.target.value)} />
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Descrição</label>
                                <textarea className="form-input" rows={4} style={{ resize: 'none' }} value={description} onChange={e => setDescription(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ flex: 1, border: '1px solid var(--border)' }}>Cancelar</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 2 }}>Salvar Produto</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
