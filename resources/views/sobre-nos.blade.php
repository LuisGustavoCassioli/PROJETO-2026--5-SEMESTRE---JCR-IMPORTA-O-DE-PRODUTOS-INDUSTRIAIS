@extends('layouts.app')

@section('title', 'JCR Importação - Sobre Nós')

@section('content')
    {{-- Page Header --}}
    <div class="page-header">
        <div class="container page-header-content">
            <h1>Sobre a Empresa</h1>
            <p>Conheça nossa trajetória, nossos valores e o compromisso que temos com a indústria brasileira.</p>
            <nav class="breadcrumb"
                style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: rgba(255,255,255,0.45);">
                <a href="/" style="color: rgba(255,255,255,0.75);">Início</a>
                <i data-lucide="chevron-right" size="14"></i>
                <span>Sobre Nós</span>
            </nav>
        </div>
    </div>

    {{-- Story --}}
    <section class="section">
        <div class="container" style="display: grid; grid-template-columns: 1.2fr 1fr; gap: 4rem; align-items: center;">
            <div>
                <div class="badge">Nossa História</div>
                <h2 class="section-title">Tradição e Modernidade em Instrumentação</h2>
                <div class="divider"></div>
                <div style="display: flex; flex-direction: column; gap: 1.25rem; color: var(--text-mid); line-height: 1.8;">
                    <p>
                        A <strong>J.C.R IMPORTAÇÃO DE PRODUTOS INDUSTRIAIS</strong> nasceu com a missão de fornecer soluções
                        precisas e confiáveis para o mercado de instrumentação. Com mais de 15 anos de atuação, consolidamos
                        nossa marca como sinônimo de qualidade e respeito ao cliente.
                    </p>
                    <p>
                        Somos uma empresa familiar que valoriza o relacionamento próximo com cada parceiro. Entendemos que
                        na indústria, cada medição importa e cada minuto de produção é valioso. Por isso, trabalhamos com os
                        melhores fabricantes e mantemos um processo logístico ágil.
                    </p>
                    <p>
                        Localizados estrategicamente para atender todo o território nacional, oferecemos um portfólio
                        completo que abrange desde processos simples até as demandas mais complexas da indústria moderna.
                    </p>
                </div>
            </div>
            <div style="position: relative;">
                <div style="background: var(--bg); border: 1px solid var(--border); border-radius: 20px; padding: 2.5rem;">
                    <div style="margin-bottom: 2rem;">
                        <h4
                            style="font-family:'Oswald'; color:var(--navy); margin-bottom:1rem; display:flex; align-items:center; gap:0.75rem;">
                            <i data-lucide="target" style="color:var(--red);"></i> Nossa Missão
                        </h4>
                        <p style="font-size:0.9rem; color:var(--text-muted);">Prover produtos de instrumentação com
                            excelência técnica, garantindo a satisfação plena de nossos clientes através de parcerias
                            sólidas.</p>
                    </div>
                    <div>
                        <h4
                            style="font-family:'Oswald'; color:var(--navy); margin-bottom:1rem; display:flex; align-items:center; gap:0.75rem;">
                            <i data-lucide="eye" style="color:var(--red);"></i> Nossa Visão
                        </h4>
                        <p style="font-size:0.9rem; color:var(--text-muted);">Ser referência nacional em distribuição de
                            instrumentos industriais, reconhecida pela agilidade e confiabilidade técnica.</p>
                    </div>
                </div>
                <div
                    style="position: absolute; bottom: -1.5rem; right: -1.5rem; background: var(--red); color:#fff; padding: 1.5rem; border-radius: 12px; box-shadow: var(--shadow-lg); font-family: 'Oswald';">
                    <div style="font-size: 2.5rem; font-weight:700; line-height:1;">+15</div>
                    <div style="font-size: 0.75rem; text-transform:uppercase; letter-spacing:0.1em; margin-top:0.25rem;">
                        Anos de Mercado</div>
                </div>
            </div>
        </div>
    </section>

    {{-- Values --}}
    <section class="section" style="background: var(--bg);">
        <div class="container">
            <div class="text-center" style="margin-bottom: 3.5rem;">
                <div class="badge">Nosso Diferencial</div>
                <h2 class="section-title">Valores que nos Movem</h2>
                <div class="divider divider-center"></div>
            </div>

            <div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">
                @php
                    $values = [
                        ['icon' => 'shield-check', 'title' => 'Qualidade Garantida', 'desc' => 'Trabalhamos apenas com produtos certificados que atendem às normas técnicas nacionais e internacionais.'],
                        ['icon' => 'clock', 'title' => 'Agilidade Real', 'desc' => 'Respondemos cotações em tempo recorde e mantemos uma logística eficiente para cumprir prazos rigorosos.'],
                        ['icon' => 'users', 'title' => 'Atendimento Humano', 'desc' => 'Suporte técnico realizado por especialistas que buscam entender a aplicação real para indicar o melhor produto.'],
                    ];
                @endphp

                @foreach($values as $v)
                    <div class="card" style="padding: 2.5rem; text-align: center;">
                        <div
                            style="width:60px; height:60px; background:var(--white); border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 1.5rem; box-shadow:var(--shadow-sm); color:var(--red);">
                            <i data-lucide="{{ $v['icon'] }}" size="28"></i>
                        </div>
                        <h3 style="font-size:1.25rem; margin-bottom:1rem;">{{ $v['title'] }}</h3>
                        <p style="font-size:0.9rem; color:var(--text-muted); line-height:1.7;">{{ $v['desc'] }}</p>
                    </div>
                @endforeach
            </div>
        </div>
    </section>

    {{-- Contact Section --}}
    <section id="contato" class="section">
        <div class="container">
            <div
                style="background: var(--white); border: 1px solid var(--border); border-radius: 24px; overflow: hidden; display: grid; grid-template-columns: 1fr 1.2fr; box-shadow: var(--shadow-lg);">
                <div style="background: var(--navy); color: #fff; padding: 4rem;">
                    <h2 style="color: #fff; margin-bottom: 2rem;">Fale Conosco</h2>
                    <div style="display: flex; flex-direction: column; gap: 2.5rem;">
                        <div style="display: flex; gap: 1rem;">
                            <div style="color: var(--red-light);"><i data-lucide="map-pin"></i></div>
                            <div>
                                <h4
                                    style="color: #fff; margin-bottom: 0.5rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">
                                    Endereço</h4>
                                <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">Rua Manoel Maria de Aguiar,
                                    203<br>Casa Verde, São Paulo - SP<br>CEP 02525-050</p>
                            </div>
                        </div>
                        <div style="display: flex; gap: 1rem;">
                            <div style="color: var(--red-light);"><i data-lucide="phone"></i></div>
                            <div>
                                <h4
                                    style="color: #fff; margin-bottom: 0.5rem; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em;">
                                    Telefones</h4>
                                <p style="color: rgba(255,255,255,0.7); font-size: 0.95rem;">(11) 2084-1083<br>(11)
                                    98759-9931 (WhatsApp)</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style="padding: 4rem;">
                    <h3 style="margin-bottom: 1.5rem;">Estamos Prontos para Atender</h3>
                    <p style="color: var(--text-muted); margin-bottom: 2.5rem;">Preencha o formulário abaixo ou utilize
                        nossos canais diretos para solicitar uma cotação.</p>

                    <form style="display: grid; gap: 1.25rem;">
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem;">
                            <input type="text" placeholder="Seu Nome"
                                style="width: 100%; padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid var(--border); background: var(--bg);">
                            <input type="email" placeholder="E-mail"
                                style="width: 100%; padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid var(--border); background: var(--bg);">
                        </div>
                        <input type="text" placeholder="Assunto"
                            style="width: 100%; padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid var(--border); background: var(--bg);">
                        <textarea placeholder="Sua Mensagem" rows="5"
                            style="width: 100%; padding: 0.8rem 1rem; border-radius: 8px; border: 1px solid var(--border); background: var(--bg); resize: none;"></textarea>
                        <button type="submit" class="btn btn-primary" style="justify-content: center; padding: 1rem;">Enviar
                            Mensagem</button>
                    </form>
                </div>
            </div>
        </div>
    </section>
@endsection