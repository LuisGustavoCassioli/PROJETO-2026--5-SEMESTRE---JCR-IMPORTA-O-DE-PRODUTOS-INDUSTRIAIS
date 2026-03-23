@extends('layouts.app')

@section('title', 'JCR Importação - Início')

@section('content')
    {{-- HERO --}}
    <section class="hero">
        <div class="hero-left">
            <div class="hero-eyebrow">
                <span class="eyebrow-dash"></span><span class="eyebrow-dash"></span>
                <span>Instrumentação Industrial</span>
            </div>
            <h1>
                Soluções em<br>
                <span>Instrumentação</span>
            </h1>
            <p class="hero-accent-text">Qualidade e confiabilidade em cada medição</p>
            <p class="hero-desc">
                Da medição de pressão à temperatura e vácuo, conte com nossa expertise em instrumentação industrial.
                Oferecemos produtos de alta qualidade e atendimento especializado.
            </p>

            <div class="hero-contacts">
                <a href="tel:+551120841083" class="hero-contact-item">
                    <div class="hero-contact-icon"><i data-lucide="phone" size="16"></i></div>
                    <span>(11) 2084-1083</span>
                </a>
                <a href="mailto:contato@jcrprodutosindustriais.com.br" class="hero-contact-item">
                    <div class="hero-contact-icon mail"><span style="font-size:0.7rem; font-weight:700">@</span></div>
                    <span>contato@jcrprodutosindustriais.com.br</span>
                </a>
            </div>

            <div class="hero-actions">
                <a href="https://api.whatsapp.com/send?phone=5511987599931" target="_blank" rel="noopener noreferrer"
                    class="btn btn-whatsapp">
                    <i data-lucide="message-circle" size="18"></i>
                    Fale Conosco
                </a>
                <a href="/produtos" class="btn btn-navy">
                    Ver Produtos <i data-lucide="chevron-right" size="16"></i>
                </a>
            </div>
        </div>

        <div class="hero-right">
            <div class="hero-diagonal"></div>
            <div class="hero-image-collage">
                <div class="hero-img-main">
                    <img src="{{ asset('hero_industrial.png') }}" alt="Industrial instrumentation gauges">
                </div>
                <div class="hero-badge-overlay">
                    <div class="hero-badge-jcr"
                        style="font-family: 'Oswald', sans-serif; font-weight: 700; font-size: 1.3rem; color: #fff;">J<span
                            style="color: #e01c2a">.</span>C<span style="color: #e01c2a">.</span>R</div>
                    <div class="hero-badge-sub" style="font-size: 0.52rem; font-weight: 700; color: rgba(255,255,255,0.5);">
                        IMPORTAÇÃO</div>
                </div>
            </div>
        </div>
    </section>

    {{-- PRODUCT LINE --}}
    <section class="section section-bg">
        <div class="container">
            <h2 class="section-title text-center">Linha de Produtos</h2>
            <div class="divider divider-center"></div>

            <div class="grid-4" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 1.25rem;">
                <a href="/produtos" class="product-tile card">
                    <div class="product-tile-visual">@include('partials.svg.manometer')</div>
                    <div style="color: var(--red); font-weight:600; font-family:'Oswald'; margin-bottom:0.4rem;">Pressão
                    </div>
                    <p class="product-tile-desc">Manômetros e transmissores</p>
                    <span class="product-tile-link" style="color: var(--red);">Ver produtos <i data-lucide="arrow-right"
                            size="13"></i></span>
                </a>
                <a href="/produtos" class="product-tile card">
                    <div class="product-tile-visual">@include('partials.svg.vacuometer')</div>
                    <div style="color: var(--navy); font-weight:600; font-family:'Oswald'; margin-bottom:0.4rem;">Vácuo
                    </div>
                    <p class="product-tile-desc">Vacuômetros e manovacuômetros</p>
                    <span class="product-tile-link" style="color: var(--navy);">Ver produtos <i data-lucide="arrow-right"
                            size="13"></i></span>
                </a>
                <a href="/produtos" class="product-tile card">
                    <div class="product-tile-visual">@include('partials.svg.thermometer')</div>
                    <div style="color: var(--red); font-weight:600; font-family:'Oswald'; margin-bottom:0.4rem;">Temperatura
                    </div>
                    <p class="product-tile-desc">Termômetros e termopares</p>
                    <span class="product-tile-link" style="color: var(--red);">Ver produtos <i data-lucide="arrow-right"
                            size="13"></i></span>
                </a>
                <a href="/produtos" class="product-tile card">
                    <div class="product-tile-visual">@include('partials.svg.accessory')</div>
                    <div style="color: var(--navy); font-weight:600; font-family:'Oswald'; margin-bottom:0.4rem;">Acessórios
                    </div>
                    <p class="product-tile-desc">Sifões, válvulas e conexões</p>
                    <span class="product-tile-link" style="color: var(--navy);">Ver produtos <i data-lucide="arrow-right"
                            size="13"></i></span>
                </a>
            </div>

            <div class="text-center" style="margin-top: 2.5rem;">
                <a href="/produtos" class="btn btn-navy">
                    Ver Todos os Produtos <i data-lucide="chevron-right" size="16"></i>
                </a>
            </div>
        </div>
    </section>

    {{-- ABOUT --}}
    <section class="section">
        <div class="container" style="display: grid; grid-template-columns: 1fr 1fr; gap: 5rem; align-items: center;">
            <div class="about-home-text">
                <div class="badge">Nossa História</div>
                <h2 class="section-title">Sobre Nós</h2>
                <div class="divider"></div>
                <p style="color: var(--text-muted); line-height: 1.75; margin-bottom: 0.75rem;">
                    Com mais de <strong>15 anos de experiência</strong> no setor de instrumentação industrial, a J.C.R
                    IMPORTAÇÃO DE PRODUTOS INDUSTRIAIS é uma empresa familiar que alia tradição, conhecimento técnico e
                    compromisso com a qualidade.
                </p>
                <div class="about-home-items"
                    style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 1.25rem;">
                    @foreach(['Cumprimento rigoroso de prazos', 'Agilidade em responder cotações', 'Suporte técnico especializado', 'Parceria e transparência'] as $item)
                        <div class="about-home-item"
                            style="display: flex; align-items: center; gap: 0.6rem; font-size: 0.875rem; color: var(--text-mid);">
                            <i data-lucide="check-circle" size="15" style="color: var(--red);"></i>
                            <span>{{ $item }}</span>
                        </div>
                    @endforeach
                </div>
                <a href="/sobre-nos" class="btn btn-outline" style="margin-top: 2rem;">
                    Saiba mais sobre nós <i data-lucide="arrow-right" size="15"></i>
                </a>
            </div>

            <div class="stat-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                <div class="stat-card">
                    <div class="stat-num"
                        style="color: var(--red); font-family:'Oswald'; font-size:2.4rem; font-weight:700;">+15</div>
                    <div class="stat-label">Anos de Experiência</div>
                </div>
                <div class="stat-card">
                    <div class="stat-num"
                        style="color: var(--navy); font-family:'Oswald'; font-size:2.4rem; font-weight:700;">100%</div>
                    <div class="stat-label">Qualidade</div>
                </div>
                <div class="stat-card">
                    <div class="stat-num"
                        style="color: var(--red); font-family:'Oswald'; font-size:2.4rem; font-weight:700;">B2B</div>
                    <div class="stat-label">Foco Industrial</div>
                </div>
                <div class="stat-card">
                    <div class="stat-num"
                        style="color: var(--navy); font-family:'Oswald'; font-size:2.4rem; font-weight:700;">24h</div>
                    <div class="stat-label">Cotações</div>
                </div>
            </div>
        </div>
    </section>

    {{-- APPLICATIONS --}}
    <section class="section section-bg">
        <div class="container">
            <div class="text-center" style="margin-bottom: 2.5rem;">
                <div class="badge">Onde Atuamos</div>
                <h2 class="section-title">Aplicações Industrias</h2>
                <div class="divider divider-center"></div>
            </div>
            <div class="applications-grid" style="display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.75rem;">
                @foreach(['Indústrias de Bebidas', 'Indústrias Petroquímicas', 'Indústrias Farmacêuticas', 'Indústrias Siderúrgicas', 'Indústrias de Mineração', 'Indústrias Automotivas', 'Indústrias de Maquinarias', 'Área Hospitalar', 'Caldeiraria', 'Construtoras'] as $app)
                    <div class="app-item"
                        style="display: flex; align-items: center; gap: 0.6rem; background: #fff; border: 1px solid var(--border); border-radius: 8px; padding: 0.8rem 1rem; font-size: 0.84rem; color: var(--text-mid);">
                        <div class="app-dot" style="width: 8px; height: 8px; border-radius: 50%; background: var(--red);"></div>
                        <span>{{ $app }}</span>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- CTA --}}
    <section class="cta-banner">
        <div class="container"
            style="display: flex; align-items: center; justify-content: space-between; gap: 2rem; flex-wrap: wrap;">
            <div>
                <h2 style="color: #fff;">Precisa de um orçamento rápido?</h2>
                <p style="color: rgba(255,255,255,0.72); margin-top: 0.5rem;">Nossa equipe responde em até 24h. Entre em
                    contato agora.</p>
            </div>
            <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <a href="tel:+551120841083" class="btn btn-outline-white">
                    <i data-lucide="phone" size="16"></i> (11) 2084-1083
                </a>
                <a href="https://api.whatsapp.com/send?phone=5511987599931" target="_blank" rel="noopener noreferrer"
                    class="btn btn-whatsapp">
                    <i data-lucide="message-circle" size="16"></i> WhatsApp
                </a>
            </div>
        </div>
    </section>
@endsection