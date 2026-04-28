import { useEffect } from 'react';
import './LegalPage.css';

export default function TermosUsoPage() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="section legal-section">
            <div className="container">
                <div className="legal-card">
                    <div className="legal-header">
                        <h1>Termos de Uso</h1>
                        <p>Última atualização: 28 de Abril de 2026</p>
                    </div>
                    <div className="legal-content">
                        <h2>1. Aceitação dos Termos</h2>
                        <p>
                            Ao acessar e utilizar o site da <strong>JCR Importação de Produtos Industriais</strong>, você concorda em cumprir e
                            estar vinculado a este conjunto de Termos de Uso. Estes termos aplicam-se a todos os visitantes,
                            usuários e outros que acessam ou usam o nosso Serviço (catálogos B2B, portal e canais de atendimento).
                            Se você não concorda com qualquer parte destes termos, você não deve acessar nosso portal.
                        </p>

                        <h2>2. Uso do Serviço e Foco B2B</h2>
                        <p>
                            O serviço fornecido pela JCR destina-se principalmente a relações entre empresas (B2B). As informações de
                            catálogo, dimensionamento, fichas técnicas e descritivos aqui pautados são unicamente referenciais.
                            Garantimos o melhor esforço na acurácia técnica, mas é de inteira responsabilidade do comprador ou de seu
                            corpo de engenharia a verificação e adequação dos instrumentos (manômetros, vacuômetros e termômetros)
                            ao seu projeto final.
                        </p>

                        <h2>3. Propriedade Intelectual</h2>
                        <p>
                            Todos os conteúdos aqui apresentados, incluindo, sem limitação, identidade visual, marca, logotipos, imagens
                            de produtos, textos técnicos e descritivos, são de propriedade exclusiva da JCR Produtos Industriais ou de
                            seus respectivos fabricantes/fornecedores, sendo protegidos pelas leis brasileiras de direitos autorais.
                            Nenhuma parte de nosso site poderá ser reproduzida visando fins comerciais que concorram à nossa empresa sem autorização prévia.
                        </p>

                        <h2>4. Solicitação de Cotações (<span style={{ fontStyle: "italic" }}>Leads</span>)</h2>
                        <p>
                            Ao submeter suas informações nos formulários de "Solicitar Cotação" ou "Fale Conosco", o usuário se compromete a:
                        </p>
                        <ul>
                            <li>Fornecer informações corporativas precisas, completas e atuais.</li>
                            <li>Autorizar pacificamente o contato de nossos vendedores, engenheiros e representantes por e-mail ou WhatsApp.</li>
                            <li>Não abusar da plataforma submetendo solicitações falsas, bots ou envios que atrapalhem nossa rotina operacional.</li>
                        </ul>

                        <h2>5. Modificações do Serviço e dos Termos</h2>
                        <p>
                            A JCR Produtos Industriais reserva-se o direito de modificar, atualizar ou remover parcialmente o catálogo de
                            produtos ou os presentes termos a qualquer instante e sem prévio aviso, visando adequação no rol de importações
                            ou atualização da legislação brasileira vigente. Recomendamos a revisão periódica desta página.
                        </p>

                        <h2>6. Foro de Elegibilidade</h2>
                        <p>
                            Para dirimir quaisquer controvérsias decorrentes do uso da plataforma ou do relacionamento comercial construído neste
                            catálogo que as partes não consigam resolver de forma amigável, fica eleito o foro da Comarca do Estado de São Paulo,
                            capital.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
