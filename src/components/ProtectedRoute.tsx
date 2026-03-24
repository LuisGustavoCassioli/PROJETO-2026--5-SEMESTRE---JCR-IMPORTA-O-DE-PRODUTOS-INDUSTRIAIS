import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession();

            // Verifica se o usuário está logado e se tem o papel de administrador no user_metadata
            const isAdmin = session?.user?.user_metadata?.role === 'admin';

            setAuthenticated(!!session && isAdmin);
            setLoading(false);
        };
        checkAuth();
    }, []);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Loader2 className="animate-spin" size={40} color="var(--navy)" />
            </div>
        );
    }

    if (!authenticated) {
        // Redireciona para Home em vez de Login para esconder a existência da página admin
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
}
