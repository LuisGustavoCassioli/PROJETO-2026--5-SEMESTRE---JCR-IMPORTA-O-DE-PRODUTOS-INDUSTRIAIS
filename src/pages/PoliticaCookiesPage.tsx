import { useEffect } from 'react';
import './LegalPage.css';

export default function PoliticaCookiesPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="section legal-section">
            <div className="container">
                <div className="legal-card">
                    <div className="legal-header">
                        <h1>Políticas de Cookies e Rastreadores</h1>
                        <p>Última atualização: 28 de Abril de 2026</p>
                    </div>
                    <div className="legal-content">
                        <h2>1. O que são e para que servem os Cookies?</h2>
                        <p>
                            Ao interagir na plataforma oficial da <strong>JCR Produtos Industriais</strong>, acionamos tecnologias comuns
                            chamadas "Cookies". São arquivinhos de texto de curtíssima bagagem digital enviados silenciosamente ao seu Desktop
                            ou aparelho de Smartphone. O foco único dessa tecnologia é melhorar e individualizar seu histórico e manter a memória
                            viva do layout, preferências, e estatísticas globais do uso.
                        </p>

                        <h2>2. Classificação dos Cookies JCR</h2>
                        <p>
                            Classificamos nossa carga de scripts em blocos focados na experiência do cliente B2B da nossa automação:
                        </p>
                        <ul>
                            <li><strong>Extritamente Essenciais:</strong> Gerenciam o esqueleto fundamental. Englobam tokens de Autenticação criptografada de Administradores, anti-fraud de formulários de Cotação, e proteção de firewalls. Nossa plataforma não sobrevive ou processa navegações profundas perfeitamente sem este cluster.</li>
                            <li><strong>Performance & Analytics:</strong> Rastreadores embutidos na nossa hospedagem em Edge (Vercel) e integrações analíticas. Mapeiam picos de horários das indústrias entrando, links quebrados e páginas menos vistas, nos ajudando continuamente a escalar e melhorar os dados contidos neste Catálogo.</li>
                            <li><strong>Customização de Visualizações:</strong> Preenche campos salvos na página, salvando inputs corriqueiros de WhatsApp e cache das miniaturas em altíssima resolução.</li>
                        </ul>

                        <h2>3. Bloqueando os Cookies nos Navegadores</h2>
                        <p>
                            Caso deseje se privar ou limpar o cache armazenado localmente pelo seu acesso na JCR, recomendamos que siga as
                            ferramentas orgânicas providas pelo menu central do navegador usado (Chrome, Safari, Firefox, Edge).
                            Lembramos, ressalvadas as restrições que aplicam travamentos na aba de Adminstradores logados e em funções do botão de solicitação dinâmica de orçamento de instrumentações.
                        </p>

                        <h2>4. Consentimento e Acordos Analíticos</h2>
                        <p>
                            Em comunhão com a <b>Política de Privacidade</b> central, você concorda ativamente com o arquivamento inteligente
                            ao aceitar as barras de conformidades ou no continuado consumo rotineiro das nossas estantes industriais dentro de
                            `jcrprodutosindustriais.com.br`.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
