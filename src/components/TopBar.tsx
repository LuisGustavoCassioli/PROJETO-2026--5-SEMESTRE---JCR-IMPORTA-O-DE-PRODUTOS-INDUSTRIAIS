import { Phone, Mail } from 'lucide-react';
import './TopBar.css';

export default function TopBar() {
    return (
        <div className="topbar">
            <div className="container topbar-inner">
                <a href="tel:+551120841083" className="topbar-item">
                    <Phone size={13} />
                    <span>(11) 2084-1083</span>
                </a>
                <a href="mailto:contato@jcrprodutosindustriais.com.br" className="topbar-item">
                    <Mail size={13} />
                    <span>contato@jcrprodutosindustriais.com.br</span>
                </a>
                <a
                    href="https://api.whatsapp.com/send?phone=5511987599931"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="topbar-whatsapp"
                >
                    WhatsApp: (11) 98759-9931
                </a>
            </div>
        </div>
    );
}
