import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Lock, Mail, AlertCircle, Loader2 } from 'lucide-react';

export default function LoginPage() {
    useEffect(() => {
        // Impede que buscadores indexem a página de login
        const meta = document.createElement('meta');
        meta.name = 'robots';
        meta.content = 'noindex, nofollow';
        document.head.appendChild(meta);
        return () => { document.head.removeChild(meta); };
    }, []);

    const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const cleanInput = email.trim().toLowerCase();
        const mappedEmail = cleanInput.includes('@') ? cleanInput : `${cleanInput}@jcr.com.br`;

        if (authMode === 'login') {
            const { error } = await supabase.auth.signInWithPassword({ email: mappedEmail, password });
            if (error) {
                setError('Acesso negado. Verifique o usuário e senha.');
                setLoading(false);
            } else {
                navigate('/gestao-operacional');
            }
        } else {
            // WHITE LIST CHECK VIA RPC (Secure)
            const { data: isAuthorized, error: rpcError } = await supabase
                .rpc('check_user_whitelist', { email_to_check: mappedEmail });

            if (rpcError || !isAuthorized) {
                setError('Este usuário não está autorizado no sistema.');
                setLoading(false);
                return;
            }

            // REGISTER
            const { error: signUpError } = await supabase.auth.signUp({
                email: mappedEmail,
                password,
                options: {
                    data: { role: 'admin' }
                }
            });

            if (signUpError) {
                setError('Erro ao cadastrar. Tente novamente.');
                setLoading(false);
            } else {
                alert('Cadastro realizado com sucesso! Você já pode entrar.');
                setAuthMode('login');
                setLoading(false);
            }
        }
    };

    return (
        <div className="section" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', background: 'var(--bg)' }}>
            <div className="container" style={{ maxWidth: '450px' }}>
                <div className="card" style={{ padding: '2.5rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'var(--navy)',
                            borderRadius: '12px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: '#fff',
                            margin: '0 auto 1rem'
                        }}>
                            <Lock size={30} />
                        </div>
                        <h2 style={{ fontFamily: 'Oswald, sans-serif', color: 'var(--navy)' }}>Acesso Administrativo</h2>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Squad JCR - Gestão de Catálogo</p>
                    </div>

                    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', marginBottom: '1.5rem' }}>
                        <button
                            onClick={() => setAuthMode('login')}
                            style={{
                                flex: 1, padding: '1rem', border: 'none', background: 'none', cursor: 'pointer',
                                borderBottom: authMode === 'login' ? '2px solid var(--navy)' : 'none',
                                fontWeight: authMode === 'login' ? 600 : 400,
                                color: authMode === 'login' ? 'var(--navy)' : 'var(--text-muted)'
                            }}
                        >
                            Entrar
                        </button>
                        <button
                            onClick={() => setAuthMode('register')}
                            style={{
                                flex: 1, padding: '1rem', border: 'none', background: 'none', cursor: 'pointer',
                                borderBottom: authMode === 'register' ? '2px solid var(--navy)' : 'none',
                                fontWeight: authMode === 'register' ? 600 : 400,
                                color: authMode === 'register' ? 'var(--navy)' : 'var(--text-muted)'
                            }}
                        >
                            Cadastrar
                        </button>
                    </div>

                    <form onSubmit={handleAuth} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        {error && (
                            <div style={{
                                background: '#fff1f0',
                                border: '1px solid #ffa39e',
                                padding: '0.75rem',
                                borderRadius: '6px',
                                color: '#cf1322',
                                fontSize: '0.85rem',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                <AlertCircle size={16} />
                                {error}
                            </div>
                        )}

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Usuário / Código</label>
                            <div style={{ position: 'relative' }}>
                                <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="text"
                                    className="form-input"
                                    placeholder="nomejcr"
                                    style={{ paddingLeft: '40px' }}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.85rem', fontWeight: 600 }}>Senha</label>
                            <div style={{ position: 'relative' }}>
                                <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                                <input
                                    type="password"
                                    className="form-input"
                                    placeholder="••••••••"
                                    style={{ paddingLeft: '40px' }}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary"
                            style={{ width: '100%', padding: '0.85rem', marginTop: '0.5rem' }}
                            disabled={loading}
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : authMode === 'login' ? 'Entrar no Sistema' : 'Criar minha conta'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
