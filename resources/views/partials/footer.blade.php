<footer class="footer">
    <div class="container">
        <div class="footer-grid">
            {{-- Brand --}}
            <div className="footer-brand">
                <div className="footer-logo">
                    <img src="{{ asset('logo.png') }}" alt="JCR Importação de Produtos Industriais"
                        class="footer-logo-img">
                </div>
                <p>Mais de 15 anos de experiência em instrumentação industrial. Qualidade, pontualidade e atendimento
                    diferenciado.</p>
                <div class="footer-contact-inline">
                    <i data-lucide="phone" size={14}></i> (11) 2084-1083
                </div>
            </div>

            {{-- Products --}}
            <div className="footer-col">
                <h4 className="footer-h">Linhas de Produtos</h4>
                <div className="footer-links">
                    <a href="/produtos" class="footer-link">Manômetros (Pressão)</a>
                    <a href="/produtos" class="footer-link">Vacuômetros (Vácuo)</a>
                    <a href="/produtos" class="footer-link">Termômetros (Temperatura)</a>
                    <a href="/produtos" class="footer-link">Acessórios Industriais</a>
                </div>
            </div>

            {{-- Company --}}
            <div className="footer-col">
                <h4 className="footer-h">Empresa</h4>
                <div className="footer-links">
                    <a href="/sobre-nos" class="footer-link">Quem Somos</a>
                    <a href="/sobre-nos" class="footer-link">Nossos Valores</a>
                    <a href="/sobre-nos" class="footer-link">Localização</a>
                    <a href="/sobre-nos" class="footer-link">Contato</a>
                </div>
            </div>

            {{-- Legal --}}
            <div className="footer-col">
                <h4 className="footer-h">Informações</h4>
                <div className="footer-links">
                    <span class="footer-link" style="cursor:default">Segunda à Sexta</span>
                    <span class="footer-link" style="cursor:default">08:00 às 18:00</span>
                    <a href="mailto:contato@jcrprodutosindustriais.com.br" class="footer-link">Trabalhe Conosco</a>
                </div>
            </div>
        </div>

        <div className="footer-bottom"
            style="border-top: 1px solid rgba(255,255,255,0.05); padding-top: 2rem; display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem;">
            <p style="font-size: 0.8rem; color: rgba(255,255,255,0.4)">
                &copy; {{ date('Y') }} J.C.R Importação de Produtos Industriais. Todos os direitos reservados.
            </p>
            <div style="font-size: 0.8rem; color: rgba(255,255,255,0.4)">
                Desenvolvido com excelência industrial
            </div>
        </div>
    </div>
</footer>