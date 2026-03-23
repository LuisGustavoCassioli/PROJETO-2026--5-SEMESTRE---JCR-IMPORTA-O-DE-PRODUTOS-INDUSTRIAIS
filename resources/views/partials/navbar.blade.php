<nav class="navbar">
    <div class="container navbar-inner">
        {{-- Logo --}}
        <a href="/" class="logo">
            <img src="{{ asset('logo.png') }}" alt="JCR Importação de Produtos Industriais" class="navbar-logo-img">
        </a>

        {{-- Desktop links --}}
        <div class="nav-links">
            <a href="/" class="nav-link {{ request()->is('/') ? 'active' : '' }}">Início</a>
            <a href="/produtos" class="nav-link {{ request()->is('produtos*') ? 'active' : '' }}">Produtos</a>
            <a href="/sobre-nos" class="nav-link {{ request()->is('sobre-nos*') ? 'active' : '' }}">Sobre Nós</a>
        </div>

        {{-- CTA --}}
        <div class="nav-cta">
            <a href="https://api.whatsapp.com/send?phone=5511987599931" target="_blank" rel="noopener noreferrer"
                class="btn btn-whatsapp">
                <i data-lucide="message-circle" size="16"></i>
                Cotação Rápida
            </a>
        </div>
    </div>
</nav>