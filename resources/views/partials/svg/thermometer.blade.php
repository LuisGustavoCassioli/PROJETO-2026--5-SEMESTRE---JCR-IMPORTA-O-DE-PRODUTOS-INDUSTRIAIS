<svg viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg" width="60" height="90">
    <circle cx="40" cy="95" r="18" fill="#c41520" opacity="0.1" stroke="#c41520" stroke-width="1.5" />
    <circle cx="40" cy="95" r="11" fill="#c41520" />
    <rect x="36" y="20" width="8" height="80" rx="4" fill="#f8f9fa" stroke="#d1dae6" stroke-width="1" />
    <rect x="38" y="50" width="4" height="50" rx="2" fill="#c41520" />
    @foreach([30, 45, 60, 75] as $y)
        <line x1="44" y1="{{ $y }}" x2="50" y2="{{ $y }}" stroke="#3d5166" stroke-width="1" />
    @endforeach
</svg>