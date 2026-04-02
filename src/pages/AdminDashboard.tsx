import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import {
    Plus, Search, Edit2, Trash2, Package, LogOut,
    X, Loader2, UploadCloud, Users, Mail, Image as ImageIcon
} from "lucide-react";
import './AdminDashboard.css';

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    tags: string[];
    image_url: string;
    images: string[];
    created_at: string;
}

interface Profile {
    id: string;
    email: string;
    role: string;
    created_at: string;
}

interface WhitelistEntry {
    email: string;
    role: string;
    created_at: string;
}

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    message: string;
    status: string;
    created_at: string;
}

export default function AdminDashboard() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [currentUserProfile, setCurrentUserProfile] = useState<Profile | null>(null);
    const [activeTab, setActiveTab] = useState<'products' | 'users' | 'leads'>('products');
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [whitelist, setWhitelist] = useState<WhitelistEntry[]>([]);
    const [leads, setLeads] = useState<Lead[]>([]);
    const [inviteEmail, setInviteEmail] = useState('');
    const [inviteRole, setInviteRole] = useState<'admin' | 'staff'>('staff');

    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Pressão');
    const [tags, setTags] = useState('');
    const [imageFiles, setImageFiles] = useState<File[]>([]);
    const [existingImages, setExistingImages] = useState<string[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        fetchCurrentUser();
        if (activeTab === 'products') {
            fetchProducts();
        } else if (activeTab === 'users') {
            fetchProfiles();
            fetchWhitelist();
        } else if (activeTab === 'leads') {
            fetchLeads();
        }
    }, [activeTab]);

    const fetchCurrentUser = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
            const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
            if (data) setCurrentUserProfile(data);
        }
    };

    const fetchProducts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error && data) setProducts(data);
        setLoading(false);
    };

    const fetchProfiles = async () => {
        const { data } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
        if (data) setProfiles(data);
    };

    const fetchWhitelist = async () => {
        const { data } = await supabase.from('whitelist').select('*').order('created_at', { ascending: false });
        if (data) setWhitelist(data);
    };

    const fetchLeads = async () => {
        setLoading(true);
        const { data, error } = await supabase.from('leads').select('*').order('created_at', { ascending: false });
        if (!error && data) setLeads(data);
        setLoading(false);
    };

    const handleDeleteLead = async (id: string) => {
        if (!confirm('Excluir este contato permanentemente?')) return;
        const { error } = await supabase.from('leads').delete().eq('id', id);
        if (!error) fetchLeads();
    };

    const handleUpdateLeadStatus = async (id: string, status: string) => {
        const { error } = await supabase.from('leads').update({ status }).eq('id', id);
        if (!error) fetchLeads();
    };

    const handleInvite = async (e: React.FormEvent) => {
        e.preventDefault();
        const cleanInput = inviteEmail.trim().toLowerCase();
        const mappedEmail = cleanInput.includes('@') ? cleanInput : `${cleanInput}@jcr.com.br`;
        const { error } = await supabase.from('whitelist').insert([{
            email: mappedEmail,
            role: inviteRole
        }]);
        if (error) {
            alert('Este usuário já está autorizado ou erro na permissão.');
        } else {
            setInviteEmail('');
            setInviteRole('staff');
            fetchWhitelist();
        }
    };

    const removeWhitelist = async (email: string) => {
        await supabase.from('whitelist').delete().eq('email', email);
        fetchWhitelist();
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        window.location.href = '/login';
    };

    const formatUser = (email: string) => {
        return email.endsWith('@jcr.com.br') ? email.split('@')[0] : email;
    };

    const openModal = (product?: Product) => {
        if (product) {
            setEditingProduct(product);
            setName(product.name);
            setDescription(product.description || '');
            setCategory(product.category);
            setTags(product.tags?.join(', ') || '');
            setExistingImages(product.images || (product.image_url ? [product.image_url] : []));
        } else {
            setEditingProduct(null);
            setName('');
            setDescription('');
            setCategory('Pressão');
            setTags('');
            setExistingImages([]);
        }
        setImageFiles([]);
        setImagePreviews([]);
        setIsModalOpen(true);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length > 0) {
            setImageFiles(prev => [...prev, ...files]);

            files.forEach(file => {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setImagePreviews(prev => [...prev, reader.result as string]);
                };
                reader.readAsDataURL(file);
            });
        }
    };

    const removeNewImage = (index: number) => {
        setImageFiles(prev => prev.filter((_, i) => i !== index));
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const removeExistingImage = (index: number) => {
        setExistingImages(prev => prev.filter((_, i) => i !== index));
    };

    const uploadImage = async (file: File): Promise<string> => {
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
        const filePath = `product-images/${fileName}`;

        const { error: uploadError } = await supabase.storage
            .from('products')
            .upload(filePath, file);

        if (uploadError) {
            throw uploadError;
        }

        const { data } = supabase.storage
            .from('products')
            .getPublicUrl(filePath);

        return data.publicUrl;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUploading(true);

        try {
            // Upload all new images
            const newImageUrls = await Promise.all(
                imageFiles.map(file => uploadImage(file))
            );

            const allImages = [...existingImages, ...newImageUrls];

            const productData = {
                name,
                description,
                category,
                tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag !== ''),
                image_url: allImages[0] || '', // First image as main
                images: allImages
            };

            if (editingProduct) {
                const { error } = await supabase
                    .from('products')
                    .update(productData)
                    .eq('id', editingProduct.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('products')
                    .insert([productData]);
                if (error) throw error;
            }

            setIsModalOpen(false);
            setEditingProduct(null);
            fetchProducts();
        } catch (error) {
            console.error('Erro ao salvar produto:', error);
            alert('Falha ao salvar produto. Verifique as configurações de Storage no Supabase.');
        } finally {
            setUploading(false);
        }
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
                    {/* Tabs */}
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                        <button
                            onClick={() => setActiveTab('products')}
                            className="btn"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                background: activeTab === 'products' ? 'var(--navy)' : 'white',
                                color: activeTab === 'products' ? 'white' : 'var(--text-main)',
                                border: activeTab === 'products' ? 'none' : '1px solid var(--border)'
                            }}
                        >
                            <Package size={18} /> Produtos
                        </button>
                        {currentUserProfile?.role === 'admin' && (
                            <button
                                onClick={() => setActiveTab('users')}
                                className="btn"
                                style={{
                                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                                    background: activeTab === 'users' ? 'var(--navy)' : 'white',
                                    color: activeTab === 'users' ? 'white' : 'var(--text-main)',
                                    border: activeTab === 'users' ? 'none' : '1px solid var(--border)'
                                }}
                            >
                                <Users size={18} /> Gestão de Equipe
                            </button>
                        )}
                        <button
                            onClick={() => setActiveTab('leads')}
                            className="btn"
                            style={{
                                display: 'flex', alignItems: 'center', gap: '0.5rem',
                                background: activeTab === 'leads' ? 'var(--navy)' : 'white',
                                color: activeTab === 'leads' ? 'white' : 'var(--text-main)',
                                border: activeTab === 'leads' ? 'none' : '1px solid var(--border)'
                            }}
                        >
                            <Mail size={18} /> Clientes/Leads
                        </button>
                    </div>

                    {activeTab === 'products' ? (
                        <>
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
                        </>
                    ) : (
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '2rem' }}>
                            {/* Invite and Whitelist */}
                            <div className="card" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Mail size={20} /> Autorizar Acesso Industrial</h3>
                                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginBottom: '1.5rem' }}>
                                    Adicione o <strong>Usuário / Código</strong> dos patrões (ex: nome+JCR). Isso permitirá que eles acessem o sistema sem precisar de e-mail real.
                                </p>
                                <form onSubmit={handleInvite} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                                    <div style={{ display: 'flex', gap: '1rem' }}>
                                        <input
                                            type="text"
                                            className="form-input"
                                            required
                                            placeholder="usuário+JCR"
                                            value={inviteEmail}
                                            onChange={e => setInviteEmail(e.target.value)}
                                            style={{ flex: 1 }}
                                        />
                                        <select
                                            className="form-input"
                                            value={inviteRole}
                                            onChange={e => setInviteRole(e.target.value as 'admin' | 'staff')}
                                            style={{ width: '150px' }}
                                        >
                                            <option value="staff">Staff (Equipe)</option>
                                            <option value="admin">Mestre (Patrão)</option>
                                        </select>
                                    </div>
                                    <button type="submit" className="btn btn-primary">Autorizar Acesso</button>
                                </form>

                                <h4 style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Acesso Autorizado (Aguardando primeiro acesso)</h4>
                                <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                    {whitelist.length === 0 ? (
                                        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Nenhuma autorização pendente.</p>
                                    ) : whitelist.map(entry => (
                                        <div key={entry.email} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>{formatUser(entry.email)}</span>
                                            <button onClick={() => removeWhitelist(entry.email)} className="btn" style={{ color: 'var(--red)', padding: '0.2rem' }} title="Remover autorização"><Trash2 size={14} /></button>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Active Profiles */}
                            <div className="card" style={{ padding: '2rem' }}>
                                <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Users size={20} /> Já Cadastrados</h3>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {profiles.map(profile => (
                                        <div key={profile.id} style={{ padding: '1rem', background: '#f8f9fa', borderRadius: '8px' }}>
                                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatUser(profile.email)}</div>
                                            <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 'bold', textTransform: 'uppercase', marginTop: '2px' }}>{profile.role}</div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* List */}
                    {activeTab === 'products' && (
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
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                    <div style={{ width: '48px', height: '48px', borderRadius: '4px', background: '#eee', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                                        {p.image_url ? (
                                                            <img src={p.image_url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                                        ) : (
                                                            <ImageIcon size={20} style={{ color: 'var(--text-muted)' }} />
                                                        )}
                                                    </div>
                                                    <div>
                                                        <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{p.name}</div>
                                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.description}</div>
                                                    </div>
                                                </div>
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
                    )}
                    {activeTab === 'leads' && (
                        <div className="admin-card">
                            <div className="admin-card-header">
                                <h3>Mensagens de Clientes (Leads)</h3>
                                <p>Gerencie as solicitações de orçamento recebidas pelo site.</p>
                            </div>

                            <div className="table-responsive">
                                <table className="admin-table">
                                    <thead>
                                        <tr>
                                            <th>Data</th>
                                            <th>Cliente</th>
                                            <th>Empresa</th>
                                            <th>Mensagem</th>
                                            <th>Status</th>
                                            <th className="text-right">Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leads.map(lead => (
                                            <tr key={lead.id}>
                                                <td style={{ fontSize: '0.8rem' }}>{new Date(lead.created_at).toLocaleDateString()}</td>
                                                <td>
                                                    <div style={{ fontWeight: 600 }}>{lead.name}</div>
                                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.email}</div>
                                                    {lead.phone && <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.phone}</div>}
                                                </td>
                                                <td>{lead.company || '-'}</td>
                                                <td>
                                                    <div style={{
                                                        maxWidth: '300px',
                                                        fontSize: '0.85rem',
                                                        display: '-webkit-box',
                                                        WebkitLineClamp: 3,
                                                        WebkitBoxOrient: 'vertical',
                                                        overflow: 'hidden'
                                                    }}>
                                                        {lead.message}
                                                    </div>
                                                </td>
                                                <td>
                                                    <select
                                                        value={lead.status}
                                                        onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value)}
                                                        className="form-input"
                                                        style={{ padding: '0.2rem', fontSize: '0.8rem', width: 'auto' }}
                                                    >
                                                        <option value="new">Novo</option>
                                                        <option value="contactado">Contactado</option>
                                                        <option value="concluido">Concluído</option>
                                                    </select>
                                                </td>
                                                <td className="text-right">
                                                    <button
                                                        className="action-btn delete"
                                                        onClick={() => handleDeleteLead(lead.id)}
                                                        title="Excluir Lead"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        {leads.length === 0 && (
                                            <tr>
                                                <td colSpan={6} style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                                                    Nenhuma mensagem recebida ainda.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
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
                                <label className="form-label">Galeria de Imagens (Selecione várias)</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '0.75rem', marginBottom: '1rem' }}>
                                    {/* Existing Images */}
                                    {existingImages.map((src, idx) => (
                                        <div key={`existing-${idx}`} style={{ position: 'relative', aspectRatio: '1', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--border)' }}>
                                            <img src={src} alt="Produto" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button type="button" onClick={() => removeExistingImage(idx)} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(255,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={12} /></button>
                                        </div>
                                    ))}

                                    {/* New Image Previews */}
                                    {imagePreviews.map((src, idx) => (
                                        <div key={`new-${idx}`} style={{ position: 'relative', aspectRatio: '1', borderRadius: '6px', overflow: 'hidden', border: '2px solid var(--primary)', opacity: 0.8 }}>
                                            <img src={src} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                            <button type="button" onClick={() => removeNewImage(idx)} style={{ position: 'absolute', top: '4px', right: '4px', background: 'rgba(0,0,0,0.7)', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}><X size={12} /></button>
                                        </div>
                                    ))}

                                    {/* Add Button */}
                                    <label style={{
                                        aspectRatio: '1',
                                        border: '2px dashed var(--border)',
                                        borderRadius: '6px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        cursor: 'pointer',
                                        transition: 'var(--transition)',
                                        color: 'var(--text-muted)'
                                    }} className="image-upload-container">
                                        <UploadCloud size={24} />
                                        <span style={{ fontSize: '0.65rem', marginTop: '4px' }}>Adicionar</span>
                                        <input type="file" multiple accept="image/*" onChange={handleFileChange} style={{ display: 'none' }} />
                                    </label>
                                </div>
                            </div>

                            <div>
                                <label className="form-label">Descrição</label>
                                <textarea className="form-input" rows={4} style={{ resize: 'none' }} value={description} onChange={e => setDescription(e.target.value)} />
                            </div>

                            <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                <button type="button" onClick={() => setIsModalOpen(false)} className="btn" style={{ flex: 1, border: '1px solid var(--border)' }} disabled={uploading}>Cancelar</button>
                                <button type="submit" className="btn btn-primary" style={{ flex: 2 }} disabled={uploading}>
                                    {uploading ? (
                                        <><Loader2 className="animate-spin" size={18} style={{ marginRight: '0.5rem' }} /> Salvando...</>
                                    ) : 'Salvar Produto'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
