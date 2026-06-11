interface Props {
  variant: "social-worker" | "childcare";
}

const BADGE = {
  "social-worker": "전국 현장실습 100% 안심 매칭",
  childcare: "전국 보육실습 100% 안심 매칭",
};

const ACCENT = "#3878C8";
const ACCENT_LIGHT = "#5B9BEF";

// Map transform: translate(570, 20) scale(1.55)
// Local (x,y) → SVG: (570 + x*1.55, 20 + y*1.55)
const CITIES = [
  { name: "서울·경기", x: 706, y: 121 },
  { name: "인천",      x: 660, y: 136 },
  { name: "강원",      x: 821, y: 105 },
  { name: "충남",      x: 666, y: 198 },
  { name: "대전·충북", x: 725, y: 237 },
  { name: "대구·경북", x: 815, y: 265 },
  { name: "전북",      x: 691, y: 307 },
  { name: "광주·전남", x: 682, y: 346 },
  { name: "경남",      x: 799, y: 349 },
  { name: "부산·울산", x: 841, y: 377 },
];

// Geographic adjacency connections
const EDGES: [number, number][] = [
  [0, 1], [0, 2], [0, 3], [0, 4],
  [1, 3], [3, 4], [4, 5], [4, 6],
  [6, 7], [5, 8], [8, 9], [5, 9],
];

export default function PracticumMapBg({ variant }: Props) {
  const badge = BADGE[variant];

  return (
    <svg
      viewBox="0 0 1200 720"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="pmBg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0F1A30" />
          <stop offset="100%" stopColor="#0d1e3a" />
        </linearGradient>
        <linearGradient id="pmMapFill" x1="20%" y1="0%" x2="80%" y2="100%">
          <stop offset="0%" stopColor="#3878C8" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#1a1aad" stopOpacity="0.06" />
        </linearGradient>
        <linearGradient id="pmLeftFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#0F1A30" stopOpacity="1" />
          <stop offset="45%"  stopColor="#0F1A30" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#0F1A30" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pmAmbient" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#3878C8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#3878C8" stopOpacity="0" />
        </radialGradient>
        <pattern id="pmDots" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <circle cx="32" cy="32" r="1" fill="#3878C8" opacity="0.06" />
        </pattern>
      </defs>

      <style>{`
        @keyframes pmPulse {
          0%  { r: 10; opacity: 0.65; }
          100%{ r: 30; opacity: 0; }
        }
        @keyframes pmBadge {
          0%,100%{ opacity: 1; }
          50%    { opacity: 0.8; }
        }
        @keyframes pmMapBreath {
          0%,100%{ opacity: 1; }
          50%    { opacity: 0.7; }
        }
        @keyframes pmEdgeFade {
          0%,100%{ opacity: 0.18; }
          50%    { opacity: 0.32; }
        }
        .pm-pulse  { animation: pmPulse     2.8s ease-out infinite; }
        .pm-badge  { animation: pmBadge     3.5s ease-in-out infinite; }
        .pm-map    { animation: pmMapBreath 5s   ease-in-out infinite; }
        .pm-edge   { animation: pmEdgeFade  4s   ease-in-out infinite; }
      `}</style>

      {/* Background */}
      <rect width="1200" height="720" fill="url(#pmBg)" />
      <rect width="1200" height="720" fill="url(#pmDots)" />

      {/* Ambient glow */}
      <ellipse cx="755" cy="270" rx="280" ry="340" fill="url(#pmAmbient)" />

      {/* ── Korea map silhouette ── */}
      <g transform="translate(570, 20) scale(1.55)" className="pm-map">
        <path
          d={`
            M 18,0
            L 215,0
            L 218,32
            L 213,66
            L 217,102
            L 211,138
            L 205,167
            L 196,196
            L 181,222
            L 163,250
            L 140,265
            L 115,258
            L 92,265
            L 65,252
            L 42,238
            L 18,220
            L 5,196
            L 17,170
            L 5,145
            L 10,120
            L 0,96
            L 13,71
            L 5,46
            L 18,22
            Z
          `}
          fill="url(#pmMapFill)"
          stroke={ACCENT}
          strokeWidth="0.7"
          strokeOpacity="0.3"
        />
        {/* Jeju */}
        <ellipse cx="78" cy="288" rx="22" ry="12"
          fill={ACCENT} fillOpacity="0.1"
          stroke={ACCENT} strokeWidth="0.6" strokeOpacity="0.22" />
      </g>

      {/* ── Network edges ── */}
      {EDGES.map(([a, b], i) => (
        <line
          key={`e-${i}`}
          x1={CITIES[a].x} y1={CITIES[a].y}
          x2={CITIES[b].x} y2={CITIES[b].y}
          stroke={ACCENT_LIGHT}
          strokeWidth="1"
          className="pm-edge"
          style={{ animationDelay: `${i * 0.22}s` }}
        />
      ))}

      {/* ── City markers ── */}
      {CITIES.map((city, i) => (
        <g key={`city-${i}`}>
          {/* Pulse ring */}
          <circle
            className="pm-pulse"
            cx={city.x} cy={city.y} r="10"
            fill="none"
            stroke={ACCENT}
            strokeWidth="1.5"
            style={{ animationDelay: `${i * 0.28}s` }}
          />
          {/* Main dot */}
          <circle cx={city.x} cy={city.y} r="7" fill={ACCENT} opacity="0.92" />
          <circle cx={city.x} cy={city.y} r="3" fill="#fff" opacity="0.95" />
          {/* Label */}
          <text
            x={city.x + (city.x > 780 ? 14 : -14)}
            y={city.y + 5}
            textAnchor={city.x > 780 ? "start" : "end"}
            fontSize="11"
            fill="#fff"
            opacity="0.5"
            fontFamily="Pretendard, sans-serif"
          >
            {city.name}
          </text>
        </g>
      ))}

      {/* ── Left fade (text readability) ── */}
      <rect width="750" height="720" fill="url(#pmLeftFade)" />

      {/* ── Badge ── */}
      <g className="pm-badge" transform="translate(878, 98)">
        <rect x="-118" y="-21" width="236" height="42" rx="21" fill={ACCENT} opacity="0.96" />
        <text
          textAnchor="middle"
          y="6"
          fontSize="13"
          fontWeight="700"
          fill="#fff"
          fontFamily="Pretendard, sans-serif"
          letterSpacing="0.3"
        >
          {badge}
        </text>
      </g>
    </svg>
  );
}
