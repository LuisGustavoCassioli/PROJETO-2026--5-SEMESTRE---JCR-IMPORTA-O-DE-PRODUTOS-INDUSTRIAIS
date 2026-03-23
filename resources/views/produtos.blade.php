@extends('layouts.app')

@section('title', 'JCR Importação - Produtos')

@section('content')
    {{-- Page Header --}}
    <div class="page-header">
        <div class="container page-header-content">
            <h1>Nossos Produtos</h1>
            <p>Instrumentação industrial de precisão para os mais diversos setores e aplicações.</p>
            <nav class="breadcrumb" style="display: flex; align-items: center; gap: 0.4rem; font-size: 0.8rem; color: rgba(255,255,255,0.45);">
                <a href="/" style="color: rgba(255,255,255,0.75);">Início</a>
                <i data-lucide="chevron-right" size="14"></i>
                <span>Produtos</span>
            </nav>
        </div>
    </div>

    <section class="section">
        <div class="container" style="display: grid; grid-template-columns: 260px 1fr; gap: 2.5rem; align-items: start;">
            {{-- Sidebar --}}
            <aside>
                <div class="card" style="padding: 1.5rem;">
                    <h4 style="font-family:'Oswald'; font-size:0.72rem; text-transform:uppercase; letter-spacing:0.14em; color:var(--text-muted); margin-bottom:1rem;">Linhas de Produtos</h4>
                    <div style="display: flex; flex-direction: column; gap: 0.2rem;">
                        <a href="/produtos" class="btn {{ !request('categoria') ? 'active' : '' }}" style="justify-content: flex-start; background: transparent; color: var(--text-mid); border: 1px solid transparent;">
                            <i data-lucide="sliders-horizontal" size="15"></i> Todos
                        </a>
                        <a href="/produtos?categoria=pressao" class="btn {{ request('categoria') == 'pressao' ? 'active' : '' }}" style="justify-content: flex-start; background: transparent; color: var(--text-mid); border: 1px solid transparent;">
                            <i data-lucide="gauge" size="15"></i> Pressão
                        </a>
                        <a href="/produtos?categoria=vacuo" class="btn {{ request('categoria') == 'vacuo' ? 'active' : '' }}" style="justify-content: flex-start; background: transparent; color: var(--text-mid); border: 1px solid transparent;">
                            <i data-lucide="wind" size="15"></i> Vácuo
                        </a>
                        <a href="/produtos?categoria=temperatura" class="btn {{ request('categoria') == 'temperatura' ? 'active' : '' }}" style="justify-content: flex-start; background: transparent; color: var(--text-mid); border: 1px solid transparent;">
                            <i data-lucide="thermometer" size="15"></i> Temperatura
                        </a>
                        <a href="/produtos?categoria=acessorios" class="btn {{ request('categoria') == 'acessorios' ? 'active' : '' }}" style="justify-content: flex-start; background: transparent; color: var(--text-mid); border: 1px solid transparent;">
                            <i data-lucide="package" size="15"></i> Acessórios
                        </a>
                    </div>
                </div>

                <div class="card" style="margin-top: 1.25rem; padding: 1.5rem;">
                    <h4 style="font-family:'Oswald'; font-size:0.95rem; color:var(--navy); margin-bottom:0.5rem;">Precisa de algo específico?</h4>
                    <p style="font-size:0.82rem; color:var(--text-muted); line-height:1.6; margin-bottom:1rem;">Nossa equipe encontra a solução ideal para sua necessidade.</p>
                    <a href="https://api.whatsapp.com/send?phone=5511987599931" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp" style="width: 100%; font-size: 0.85rem;">
                        Solicitar Cotação
                    </a>
                </div>
            </aside>

            {{-- Results --}}
            <div>
                <div style="margin-bottom: 1.25rem; padding-bottom: 0.75rem; border-bottom: 1px solid var(--mid);">
                    <p style="font-size: 0.82rem; color: var(--text-muted);">Conheça nossa linha completa de instrumentos</p>
                </div>
                
                <div class="grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem;">
                    @php
                        $products = [
                            ['id'=>1,'name'=>'Manômetro Industrial','cat'=>'Pressão','desc'=>'Manômetro de alta precisão para medição de pressão em ambientes industriais agressivos.','tags'=>['Medição', 'Pressão']],
                            ['id'=>2,'name'=>'Manômetro de Glicerina','cat'=>'Pressão','desc'=>'Manômetro preenchido com glicerina para redução de oscilações.','tags'=>['Vibração', 'Glicerina']],
                            ['id'=>3,'name'=>'Vacuômetro','cat'=>'Vácuo','desc'=>'Equipamento para medição de pressão negativa (vácuo).','tags'=>['Vácuo']],
                            ['id'=>4,'name'=>'Manovacuômetro','cat'=>'Vácuo','desc'=>'Combina medição de pressão positiva e negativa em um único instrumento.','tags'=>['Versátil']],
                            ['id'=>5,'name'=>'Termômetro Bimetálico','cat'=>'Temperatura','desc'=>'Termômetros bimetálicos com hastes de diversas medidas.','tags'=>['Temperatura']],
                            ['id'=>6,'name'=>'Sifão Tipo U','cat'=>'Acessórios','desc'=>'Sifão para proteção de manômetros contra vapor térmico.','tags'=>['Proteção', 'Sifão']],
                        ];
                    @endphp

                    @foreach($products as $p)
                        <div class="card" style="display: flex; flex-direction: column; padding: 1.5rem;">
                            <div style="width:46px; height:46px; border-radius:10px; background:rgba(196,21,32,0.08); border:1px solid rgba(196,21,32,0.15); color:var(--red); display:flex; align-items:center; justify-content:center; margin-bottom:0.75rem;">
                                @if($p['cat'] == 'Pressão') @include('partials.svg.manometer', ['size'=>24])
                                @elseif($p['cat'] == 'Vácuo') @include('partials.svg.vacuometer', ['size'=>24])
                                @elseif($p['cat'] == 'Temperatura') @include('partials.svg.thermometer', ['size'=>24])
                                @else @include('partials.svg.accessory', ['size'=>12])
                                @endif
                            </div>
                            <div style="font-size:0.67rem; font-weight:700; text-transform:uppercase; letter-spacing:0.1em; color:var(--red); margin-bottom:0.35rem;">{{ $p['cat'] }}</div>
                            <h3 style="font-size:1.05rem; margin-bottom:0.5rem;">{{ $p['name'] }}</h3>
                            <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.6; flex:1;">{{ $p['desc'] }}</p>
                            <div style="display:flex; flex-wrap:wrap; gap:0.35rem; margin-top:0.75rem;">
                                @foreach($p['tags'] as $tag)
                                    <span style="font-size:0.7rem; padding:0.2rem 0.55rem; border-radius:100px; background:var(--bg); color:var(--text-muted); border:1px solid var(--mid);">{{ $tag }}</span>
                                @endforeach
                            </div>
                            <a href="https://api.whatsapp.com/send?phone=5511987599931" target="_blank" rel="noopener noreferrer" class="btn btn-primary" style="font-size:0.82rem; padding:0.6rem 1.1rem; margin-top:1rem;">
                                Solicitar Cotação
                            </a>
                        </div>
                    @endforeach
                </div>
            </div>
        </div>
    </section>
@endsection
