interface Props {
  variant: "social-worker" | "childcare";
}

const BADGE = {
  "social-worker": "전국 현장실습 100% 안심 매칭",
  childcare: "전국 보육실습 100% 안심 매칭",
};

const ACCENT = "#3878C8";
const ACCENT_LIGHT = "#5B9BEF";

/*
  Map coordinate system (local):
    x: 0 = 125.8°E, scale 75px/°lon
    y: 0 = 38.7°N,  scale 74.5px/°lat  (y increases southward)
  Key references:
    서울  (37.57°N, 126.98°E) → (88,  84)
    인천  (37.46°N, 126.70°E) → (68,  93)
    강원  (37.88°N, 127.73°E) → (143, 61)
    충남  (36.52°N, 126.67°E) → (65,  163)
    대전  (36.35°N, 127.38°E) → (118, 176)
    대구  (35.87°N, 128.60°E) → (210, 212)
    전북  (35.82°N, 127.15°E) → (101, 216)
    광주  (35.16°N, 126.85°E) → (79,  265)
    경남  (35.18°N, 128.10°E) → (173, 263)
    부산  (35.10°N, 129.04°E) → (243, 268)

  SVG transform: translate(570, 30) scale(1.35)
    SVG = (570 + x*1.35,  30 + y*1.35)
*/

const CITIES: { name: string; x: number; y: number; right: boolean }[] = [
  { name: "서울·경기", x: 689, y: 143, right: true  },
  { name: "인천",      x: 662, y: 155, right: false },
  { name: "강원",      x: 763, y: 112, right: true  },
  { name: "충남",      x: 658, y: 250, right: false },
  { name: "대전·충북", x: 729, y: 268, right: true  },
  { name: "대구·경북", x: 854, y: 316, right: true  },
  { name: "전북",      x: 706, y: 322, right: false },
  { name: "광주·전남", x: 677, y: 388, right: false },
  { name: "경남",      x: 804, y: 385, right: true  },
  { name: "부산·울산", x: 898, y: 392, right: true  },
];

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
          <stop offset="0%" stopColor="#3878C8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1a1aad" stopOpacity="0.06" />
        </linearGradient>
        {/* Left text-area fade: fully dark on left, fades out mid-right */}
        <linearGradient id="pmLeftFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%"   stopColor="#0F1A30" stopOpacity="1"    />
          <stop offset="30%"  stopColor="#0F1A30" stopOpacity="1"    />
          <stop offset="52%"  stopColor="#0F1A30" stopOpacity="0.55" />
          <stop offset="70%"  stopColor="#0F1A30" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#0F1A30" stopOpacity="0"    />
        </linearGradient>
        <radialGradient id="pmAmbient" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#3878C8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#3878C8" stopOpacity="0"   />
        </radialGradient>
        <pattern id="pmDots" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <circle cx="32" cy="32" r="1" fill="#3878C8" opacity="0.055" />
        </pattern>
      </defs>

      <style>{`
        @keyframes pmPulse {
          0%  { r: 10; opacity: 0.62; }
          100%{ r: 30; opacity: 0;    }
        }
        @keyframes pmBadge {
          0%,100%{ opacity: 1;    }
          50%    { opacity: 0.78; }
        }
        @keyframes pmMapBreath {
          0%,100%{ opacity: 1;    }
          50%    { opacity: 0.68; }
        }
        @keyframes pmEdge {
          0%,100%{ opacity: 0.16; }
          50%    { opacity: 0.30; }
        }
        .pm-pulse { animation: pmPulse      2.8s ease-out infinite; }
        .pm-badge { animation: pmBadge      3.5s ease-in-out infinite; }
        .pm-map   { animation: pmMapBreath  5s   ease-in-out infinite; }
        .pm-edge  { animation: pmEdge       4s   ease-in-out infinite; }
      `}</style>

      {/* ── Background ── */}
      <rect width="1200" height="720" fill="url(#pmBg)" />
      <rect width="1200" height="720" fill="url(#pmDots)" />

      {/* Ambient glow centred on map */}
      <ellipse cx="760" cy="300" rx="300" ry="360" fill="url(#pmAmbient)" />

      {/*
        ── South Korea silhouette ──
        Path traced from real geographic coordinates.
        Local system: origin top-left, x = 75px/°lon, y = 74.5px/°lat
        SVG transform: translate(570, 30) scale(1.35)

        Clockwise from NW corner (west end of DMZ, ~38.0°N 126.1°E):
      */}
      <g transform="translate(570, 30) scale(1.35)" className="pm-map">
        <path
          d={`
            M 22,60
            L 55,38
            L 100,18
            L 155,5
            L 202,0
            L 210,25
            L 228,65
            L 248,108
            L 262,152
            L 272,195
            L 270,228
            L 262,255
            L 248,270
            L 232,280
            L 202,290
            L 175,296
            L 148,293
            L 120,298
            L 92,293
            L 65,308
            L 50,320
            L 30,308
            L 15,285
            L 25,265
            L 8,242
            L 20,218
            L 38,198
            L 12,162
            L 28,140
            L 10,118
            L 30,100
            L 18,80
            L 5,62
            Z
          `}
          fill="url(#pmMapFill)"
          stroke={ACCENT}
          strokeWidth="0.6"
          strokeOpacity="0.32"
        />
        {/* Jeju island — ~33.5°N 126.5°E → local (52, 385) */}
        <ellipse
          cx="52" cy="385"
          rx="26" ry="13"
          fill={ACCENT} fillOpacity="0.1"
          stroke={ACCENT} strokeWidth="0.5" strokeOpacity="0.22"
        />
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
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}

      {/* ── City markers ── */}
      {CITIES.map((city, i) => (
        <g key={`city-${i}`}>
          <circle
            className="pm-pulse"
            cx={city.x} cy={city.y} r="10"
            fill="none" stroke={ACCENT} strokeWidth="1.5"
            style={{ animationDelay: `${i * 0.27}s` }}
          />
          <circle cx={city.x} cy={city.y} r="7"  fill={ACCENT} opacity="0.92" />
          <circle cx={city.x} cy={city.y} r="3"  fill="#fff"   opacity="0.95" />
          <text
            x={city.right ? city.x + 14 : city.x - 14}
            y={city.y + 5}
            textAnchor={city.right ? "start" : "end"}
            fontSize="11"
            fill="#fff"
            opacity="0.48"
            fontFamily="Pretendard, sans-serif"
          >
            {city.name}
          </text>
        </g>
      ))}

      {/* ── Left-side fade (keeps hero text readable) ── */}
      <rect width="1200" height="720" fill="url(#pmLeftFade)" />

      {/*
        ── Badge ──
        Positioned upper-right, clear of Gangwon marker (763, 112).
        Badge y-bottom = 62 + 21 = 83 < Gangwon y = 112  ✓
      */}
      <g className="pm-badge" transform="translate(878, 62)">
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
