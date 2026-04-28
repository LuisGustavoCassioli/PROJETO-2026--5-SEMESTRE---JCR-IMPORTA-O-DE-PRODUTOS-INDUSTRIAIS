import { useEffect } from 'react';
import './LegalPage.css';

export default function PoliticaPrivacidadePage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="section legal-section">
            <div className="container">
                <div className="legal-card">
                    <div className="legal-header">
                        <h1>Política de Privacidade</h1>
                        <p>Última atualização: 28 de Abril de 2026</p>
                    </div>
                    <div className="legal-content">
                        <h2>1. O nosso compromisso com a base LGPD (Lei Geral de Proteção de Dados - Lei 13.709/18)</h2>
                        <p>
                            A <strong>JCR Produtos Industriais</strong> tem orgulho do respeito corporativo prestado junto aos seus clientes
                            em mais de 15 anos. Com a introdução da LGPD, oficializamos a nossa total transparência para com o tratamento de
                            dados que preenchemos na nossa plataforma digital e catálogos.
                            Nós não vendemos e nem comercializamos as suas informações corporativas ou atreladas a pessoa física para terceiros.
                        </p>

                        <h2>2. Quais dados são coletados?</h2>
                        <p>
                            O nosso site prioriza a coleta estritamente necessária ao andamento da jornada de compras corporativa (B2B):
                        </p>
                        <ul>
                            <li><strong>Formulários de Cotação:</strong> Coletamos Nome, Empresa, E-mail e Telefone (WhatsApp) enviados passivamente por você.</li>
                            <li><strong>Histórico Técnico:</strong> Guardamos as mensagens de dúvidas e descultivos de instrumentos para manter a qualidade de vendas da nossa engenharia.</li>
                            <li><strong>Navegação:</strong> Retemos, de forma anonimizada, suas preferências de acesso e histórico de páginas lidas para estatísticas de UX (via Cookies).</li>
                        </ul>

                        <h2>3. Como a JCR utiliza os seus dados</h2>
                        <p>
                            O objetivo absoluto na retenção das informações de contato visa unicamente o processamento das <b>Solitações de Cotações</b> e <b>Orçamentos</b>.
                            Empregamos sua aba preenchida para entrar em contato com os responsáveis alinhando prazos de fabricação, documentações técnicas, orçamentos propostos
                            e entrega de mercadorias. Os logs preenchidos ficam armazenados criptografados em nosso banco de nuvem (Supabase).
                        </p>

                        <h2>4. Armazenamento e Exclusão</h2>
                        <p>
                            Mantemos os orçamentos no tempo ativo até prescrever seu uso na cadeia tributária, contábil, jurídica e fiscal da JCR.
                            No mais, as lógicas de captura em base de "Leads" possuem total permissão de cancelamento rápido.
                            Sinta-se à vontade para enviar um e-mail para <a href="mailto:contato@jcrprodutosindustriais.com.br" style={{ color: "var(--red)" }}>contato@jcrprodutosindustriais.com.br</a> exigindo
                            qualquer erradicação completa do seu cadastro pessoal das nossas matrizes operacionais na nuvem e cumpriremos à risca mediante confirmação formal.
                        </p>

                        <h2>5. Segurança dos Orçamentos</h2>
                        <p>
                            Aplicamos políticas sofisticadas de acesso. Suas informações de catálogo e pedidos possuem restrição granular, visíveis
                            somente ao núcleo da nossa gerência administrativa autorizada na Plataforma (via whitelists organizadas),
                            asseguradas por protocolos robustos no servidor Backend (PostgreSQL protegido por Role Level Security).
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
