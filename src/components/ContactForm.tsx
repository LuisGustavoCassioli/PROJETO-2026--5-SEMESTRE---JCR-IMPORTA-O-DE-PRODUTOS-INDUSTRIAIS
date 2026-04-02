import React, { useState } from 'react';
import { Send, CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './ContactForm.css';

export default function ContactForm() {
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        message: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            const { error: submitError } = await supabase
                .from('leads')
                .insert([formData]);

            if (submitError) throw submitError;

            setSubmitted(true);
            setFormData({ name: '', email: '', phone: '', company: '', message: '' });
        } catch (err) {
            console.error('Error submitting form:', err);
            setError('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="contact-success card">
                <CheckCircle2 size={48} color="var(--accent)" />
                <h3>Mensagem Enviada!</h3>
                <p>Obrigado pelo contato. Nossa equipe retornará em breve.</p>
                <button onClick={() => setSubmitted(false)} className="btn btn-outline">Enviar nova mensagem</button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="contact-form-component card">
            <h3 className="section-title" style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Solicitar Orçamento</h3>

            <div className="form-grid">
                <div className="form-group">
                    <label>Nome Completo *</label>
                    <input
                        type="text"
                        required
                        className="form-input"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>E-mail Corporativo *</label>
                    <input
                        type="email"
                        required
                        className="form-input"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Telefone / WhatsApp</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    />
                </div>
                <div className="form-group">
                    <label>Empresa</label>
                    <input
                        type="text"
                        className="form-input"
                        value={formData.company}
                        onChange={e => setFormData({ ...formData, company: e.target.value })}
                    />
                </div>
            </div>

            <div className="form-group" style={{ marginTop: '1rem' }}>
                <label>Mensagem / Itens de Interesse</label>
                <textarea
                    className="form-input"
                    rows={4}
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                ></textarea>
            </div>

            {error && <p className="error-message" style={{ marginTop: '1rem' }}>{error}</p>}

            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1.5rem' }} disabled={loading}>
                {loading ? 'Enviando...' : <><Send size={18} /> Enviar Mensagem</>}
            </button>
        </form>
    );
}
