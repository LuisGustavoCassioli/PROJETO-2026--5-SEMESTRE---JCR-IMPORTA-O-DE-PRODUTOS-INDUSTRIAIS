<svg viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="90" height="90">
    <circle cx="60" cy="60" r="52" fill="#f8f9fa" stroke="#d1dae6" stroke-width="2" />
    <circle cx="60" cy="60" r="42" fill="white" stroke="#0d2240" stroke-width="1.5" />
    <text x="60" y="48" text-anchor="middle" font-size="7" fill="#3d5166" font-family="Inter">VÁCUO</text>
    @foreach([0, 45, 90, 135, 180, 225, 270, 315] as $i => $a)
        <line x1="{{ 60 + 32 * cos(($a - 180) * pi() / 180) }}" y1="{{ 60 + 32 * sin(($a - 180) * pi() / 180) }}"
            x2="{{ 60 + ($i % 2 === 0 ? 26 : 29) * cos(($a - 180) * pi() / 180) }}" y2="{{ 60 + ($i % 2 === 0 ? 26 : 29) * sin(($a - 180) * pi() / 180) }}"
            stroke="#0d2240" stroke-width="{{ $i % 2 === 0 ? 1.5 : 0.8 }}" />
    @endforeach
    <line x1="60" y1="60" x2="{{ 60 + 28 * cos(30 * pi() / 180) }}" y2="{{ 60 + 28 * sin(30 * pi() / 180) }}" stroke="#0d2240"
        stroke-width="2" stroke-linecap="round" />
    <circle cx="60" cy="60" r="4" fill="#c41520" />
    <rect x="53" y="108" width="14" height="8" rx="2" fill="#0d2240" />
</svg>