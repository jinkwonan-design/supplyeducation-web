interface Props {
  variant: "social-worker" | "childcare";
}

const BADGE = {
  "social-worker": "사회복지현장실습 100% 연계",
  childcare: "보육실습 100% 연계",
};

const ACCENT = "#3878C8";
const MINT = "#2DD4BF";

// [uni, practice] in SVG coords (viewBox 1200x720)
// Map transform: translate(570, 20) scale(1.55)
const CITIES: { name: string; uni: [number, number]; practice: [number, number] }[] = [
  { name: "서울", uni: [690, 132], practice: [720, 112] },
  { name: "인천", uni: [658, 147], practice: [685, 128] },
  { name: "대전", uni: [698, 249], practice: [728, 230] },
  { name: "대구", uni: [790, 271], practice: [820, 252] },
  { name: "광주", uni: [683, 330], practice: [712, 311] },
  { name: "부산", uni: [825, 373], practice: [854, 353] },
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
          <stop offset="0%" stopColor="#3878C8" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#1a1aad" stopOpacity="0.07" />
        </linearGradient>
        <linearGradient id="pmLeftFade" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#0F1A30" stopOpacity="1" />
          <stop offset="48%" stopColor="#0F1A30" stopOpacity="0.88" />
          <stop offset="100%" stopColor="#0F1A30" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="pmAmbient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#3878C8" stopOpacity="0.28" />
          <stop offset="100%" stopColor="#3878C8" stopOpacity="0" />
        </radialGradient>
        <pattern id="pmDots" x="0" y="0" width="64" height="64" patternUnits="userSpaceOnUse">
          <circle cx="32" cy="32" r="1" fill="#3878C8" opacity="0.07" />
        </pattern>
      </defs>

      <style>{`
        @keyframes pmPulseUni {
          0%  { r: 11; opacity: 0.7; }
          100%{ r: 30; opacity: 0; }
        }
        @keyframes pmPulsePrac {
          0%  { r: 9; opacity: 0.6; }
          100%{ r: 26; opacity: 0; }
        }
        @keyframes pmFlow {
          0%  { stroke-dashoffset: 0; }
          100%{ stroke-dashoffset: -44; }
        }
        @keyframes pmBadge {
          0%,100%{ opacity:1; }
          50%    { opacity:0.82; }
        }
        @keyframes pmMapBreath {
          0%,100%{ opacity:1; }
          50%    { opacity:0.75; }
        }
        .pm-pu  { animation: pmPulseUni  2.6s ease-out infinite; }
        .pm-pp  { animation: pmPulsePrac 2.6s ease-out 1.3s infinite; }
        .pm-fl  { animation: pmFlow      3.2s linear infinite; }
        .pm-badge{ animation: pmBadge    3.5s ease-in-out infinite; }
        .pm-map { animation: pmMapBreath 5s   ease-in-out infinite; }
      `}</style>

      {/* Background */}
      <rect width="1200" height="720" fill="url(#pmBg)" />
      <rect width="1200" height="720" fill="url(#pmDots)" />

      {/* Ambient glow behind map */}
      <ellipse cx="760" cy="290" rx="270" ry="340" fill="url(#pmAmbient)" />

      {/* ── South Korea silhouette ── */}
      <g transform="translate(570, 20) scale(1.55)" className="pm-map">
        {/* Main peninsula */}
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
          strokeOpacity="0.32"
        />
        {/* Jeju island */}
        <ellipse cx="78" cy="288" rx="22" ry="12" fill={ACCENT} fillOpacity="0.12" stroke={ACCENT} strokeWidth="0.6" strokeOpacity="0.25" />
      </g>

      {/* ── Connection arcs (uni → practice) ── */}
      {CITIES.map((city, i) => {
        const [ux, uy] = city.uni;
        const [px, py] = city.practice;
        const cx = (ux + px) / 2;
        const cy = Math.min(uy, py) - 20;
        return (
          <path
            key={`arc-${i}`}
            d={`M ${ux} ${uy} Q ${cx} ${cy} ${px} ${py}`}
            fill="none"
            stroke={MINT}
            strokeWidth="1.3"
            strokeDasharray="6 5"
            strokeOpacity="0.48"
            className="pm-fl"
            style={{ animationDelay: `${i * 0.45}s` }}
          />
        );
      })}

      {/* ── Markers ── */}
      {CITIES.map((city, i) => {
        const [ux, uy] = city.uni;
        const [px, py] = city.practice;
        return (
          <g key={`mk-${i}`}>
            {/* University: blue */}
            <circle cx={ux} cy={uy} r="11" fill={ACCENT} opacity="0.92" />
            <circle cx={ux} cy={uy} r="4.5" fill="#fff" opacity="0.95" />
            <circle className="pm-pu" cx={ux} cy={uy} r="11" fill="none" stroke={ACCENT} strokeWidth="1.5" style={{ animationDelay: `${i * 0.38}s` }} />

            {/* Practice site: mint */}
            <circle cx={px} cy={py} r="9" fill={MINT} opacity="0.88" />
            <circle cx={px} cy={py} r="3.5" fill="#fff" opacity="0.95" />
            <circle className="pm-pp" cx={px} cy={py} r="9" fill="none" stroke={MINT} strokeWidth="1.5" style={{ animationDelay: `${i * 0.38 + 0.2}s` }} />
          </g>
        );
      })}

      {/* ── City labels ── */}
      {CITIES.map((city, i) => (
        <text
          key={`lbl-${i}`}
          x={city.uni[0]}
          y={city.uni[1] + 24}
          textAnchor="middle"
          fontSize="11"
          fill="#fff"
          opacity="0.38"
          fontFamily="Pretendard, sans-serif"
        >
          {city.name}
        </text>
      ))}

      {/* ── Left-side text-area fade ── */}
      <rect width="750" height="720" fill="url(#pmLeftFade)" />

      {/* ── Badge ── */}
      <g className="pm-badge" transform="translate(878, 98)">
        <rect x="-110" y="-21" width="220" height="42" rx="21" fill={ACCENT} opacity="0.96" />
        <text
          textAnchor="middle"
          y="6"
          fontSize="13"
          fontWeight="700"
          fill="#fff"
          fontFamily="Pretendard, sans-serif"
          letterSpacing="0.4"
        >
          {badge}
        </text>
      </g>

      {/* ── Legend ── */}
      <g transform="translate(862, 545)" opacity="0.78">
        <rect x="-6" y="-18" width="128" height="64" rx="10" fill="rgba(255,255,255,0.05)" />
        <circle cx="10" cy="2" r="6" fill={ACCENT} />
        <circle cx="10" cy="2" r="2.5" fill="#fff" />
        <text x="24" y="7" fontSize="12" fill="#fff" fontFamily="Pretendard, sans-serif">실습대학</text>
        <circle cx="10" cy="30" r="6" fill={MINT} />
        <circle cx="10" cy="30" r="2.5" fill="#fff" />
        <text x="24" y="35" fontSize="12" fill="#fff" fontFamily="Pretendard, sans-serif">실습처</text>
      </g>
    </svg>
  );
}
