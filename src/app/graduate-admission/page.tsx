"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";

const NAVY = "#1a1aad";

/* ── 네비게이션 바 ── */
function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className="fixed inset-x-0 top-0 z-50"
      style={{
        background: isScrolled ? "#FFFFFF" : "transparent",
        borderBottom: isScrolled ? "1px solid rgba(0,0,0,0.08)" : "none",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
        <Link href="/" className="text-lg font-bold" style={{ color: isScrolled ? "#000000" : "#FFFFFF", transition: "color 0.3s" }}>
          서플라이에듀케이션
        </Link>
        <Link
          href="/apply"
          className="rounded-full px-5 py-2 text-sm font-bold transition-all"
          style={isScrolled ? { background: NAVY, color: "#FFFFFF" } : { background: "transparent", color: "#FFFFFF", border: "1.5px solid #FFFFFF" }}
        >
          상담 신청
        </Link>
      </div>
    </header>
  );
}

/* ── 합격 인증 배너 ── */
const PASS_IMAGES = [1, 2, 3, 4, 9, 6, 7, 8, 10].map((n) => `/images/배너${n}.png`);
const CARD_W = 280;
const CARD_H = 400;
const CARD_W_MB = 220;
const CARD_H_MB = 320;
const BANNER_GAP = 24;
const BANNER_SET_W = (CARD_W + BANNER_GAP) * 8;

function PassBanner() {
  const [paused, setPaused] = useState(false);
  const items = [...PASS_IMAGES, ...PASS_IMAGES];

  return (
    <section className="bg-[#F8F9FA] py-14" style={{ overflow: "hidden" }}>
      <style>{`
        @keyframes pass-rtl {
          from { transform: translateX(0); }
          to   { transform: translateX(-${BANNER_SET_W}px); }
        }
      `}</style>
      <div className="text-center mb-10">
        <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">합격 인증</span>
        <h2 className="text-2xl font-bold tracking-tight text-black md:text-3xl">서플라이에듀 대졸자전형 합격 인증</h2>
      </div>
      <div
        style={{ overflow: "hidden" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          style={{
            display: "flex",
            gap: BANNER_GAP,
            width: "max-content",
            willChange: "transform",
            animation: `pass-rtl 35s linear infinite`,
            animationPlayState: paused ? "paused" : "running",
          }}
        >
          {items.map((src, i) => (
            <div
              key={i}
              className="pass-card shadow-md"
              style={{
                width: CARD_W,
                height: CARD_H,
                borderRadius: 12,
                overflow: "hidden",
                background: "#ffffff",
                flexShrink: 0,
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt={`합격 인증 ${(i % 8) + 1}`}
                loading="lazy"
                decoding="async"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .pass-card { width: ${CARD_W_MB}px !important; height: ${CARD_H_MB}px !important; }
        }
      `}</style>

      {/* 학생 인용 */}
      <div style={{ paddingTop: 48, paddingBottom: 8, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
        {[
          "20대1이였는데 저ㅠ됬어요ㅜㅜㅜ",
          "1명뽑는데 제가 됐네요?",
          "하 진짜 눈물나요..",
        ].map((text) => (
          <p key={text} style={{ fontStyle: "italic", fontSize: 18, fontWeight: 600, color: NAVY, lineHeight: 1 }}>
            "
            <span style={{ background: "#EEF2FF", borderRadius: 4, padding: "2px 6px" }}>
              {text}
            </span>
            "
          </p>
        ))}
      </div>
    </section>
  );
}

/* ── 불릿 헬퍼 ── */
function Bullets({ items, color = NAVY }: { items: string[]; color?: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {items.map((t) => (
        <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 6 }} />
          <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
        </div>
      ))}
    </div>
  );
}

/* ── FAQ ── */
const faqs = [
  {
    q: "고졸인데 대졸자전형 지원이 가능한가요?",
    a: "직접 지원은 불가능하지만, 학점은행제로 전문학사를 취득하면 지원 자격이 생깁니다. 경영학 전문학사 기준 약 8개월~1년이면 졸업장 취득이 가능합니다.",
  },
  {
    q: "수시 1차와 정시 중 어디가 유리한가요?",
    a: "수시 1차가 선발 인원이 가장 많고 경쟁률이 가장 낮아 합격 가능성이 높습니다. 단, 수시 1차는 졸업자만 지원 가능한 대학이 많으므로 학위 취득 시기를 반드시 맞춰야 합니다.",
  },
  {
    q: "학점은행제 성적으로도 합격할 수 있나요?",
    a: "네, 학점은행제 성적도 일반 대학 성적과 동일하게 인정됩니다. 오히려 학점은행제는 온라인 수업 특성상 높은 성적을 받기가 더 수월해 GPA 관리에 유리합니다.",
  },
  {
    q: "지금 시작하면 언제 지원할 수 있나요?",
    a: "시작 시기와 학위 취득 일정에 따라 달라집니다. 2026년 수시 1차(9월)를 목표로 한다면 8월 학위 취득이 필요하며, 이를 위해선 지금 바로 시작해야 합니다. 정확한 일정은 상담 시 안내해드립니다.",
  },
  {
    q: "간호학과 말고 다른 학과도 가능한가요?",
    a: "물론입니다. 물리치료, 방사선, 임상병리, 치위생, 응급구조, 안경광학 등 보건계열 전반이 가능하며, 일부 비보건계열 학과에서도 대졸자전형을 실시합니다.",
  },
  {
    q: "졸업자와 졸업예정자 차이가 뭔가요?",
    a: "일부 대학은 수시 1차 지원 시 '졸업자'만 가능하고 '졸업예정자'는 불가합니다. 학점은행제 학위는 2월·8월에만 수여되므로, 지원 시기와 학위 수여 시기를 반드시 맞춰야 합니다. 이 부분이 가장 중요한 타이밍 포인트입니다.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="w-full bg-[#F8F9FA] py-20 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">자주 묻는 질문</span>
        <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-2">궁금한 점이 있으신가요?</h2>
        <p className="text-sm text-gray-500 mb-10">대졸자전형에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
        <div className="text-left space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderRadius: 12,
                overflow: "hidden",
                ...(openIndex === i
                  ? { border: "1.5px solid #1a1aad", background: "#ffffff", padding: "0 20px" }
                  : { border: "0.5px solid #e5e7eb", background: "transparent", padding: "0 4px" }),
              }}
            >
              <button
                className="flex w-full items-center justify-between px-5 py-4 text-sm font-semibold text-gray-800 hover:bg-gray-50"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span className="text-left">{faq.q}</span>
                <ChevronDown size={18} color="#1a1aad" style={{ flexShrink: 0, marginLeft: 8, transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }} />
              </button>
              {openIndex === i && <div className="px-5 pb-4 text-sm leading-relaxed text-gray-500">{faq.a}</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 메인 페이지 ── */
export default function GraduateAdmissionPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      <Navbar />

      {/* ── 히어로 섹션 ── */}
      <section
        className="relative flex min-h-screen flex-col justify-center"
        style={{
          backgroundImage: "url('/images/9.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ position: "absolute", inset: 0, background: "rgba(10, 15, 40, 0.65)" }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 220, height: 80, background: "linear-gradient(to top left, rgba(10,15,40,1) 0%, transparent 100%)", zIndex: 1 }} />
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6" style={{ zIndex: 2 }}>
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            <span className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest" style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}>
              대졸자전형 합격 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">간호학과·물리치료학과,</span>
              <span className="block mt-2">수능 없이 입학하는 방법</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              대졸자전형은 수시·정시보다 난이도가 낮고,<br />
              학점은행제로 지원 자격을 만들 수 있습니다
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[{ value: "내신 없음", label: "대학 성적+면접으로 선발" }, { value: "보건계열", label: "간호·물리치료 등 진학 가능" }, { value: "8개월~", label: "지원 자격 취득 기간" }].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-white md:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>
            <Link href="/apply" className="mt-10 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95" style={{ background: "#FFFFFF", color: NAVY }}>
              합격 플랜 무료 상담 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 합격 인증 배너 ── */}
      <PassBanner />

      {/* ── 대졸자전형이 뭔가요? 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">제도 안내</span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">대졸자전형, 한마디로 이겁니다</h2>
            <p className="text-sm text-gray-500 max-w-xl mx-auto">
              정식 명칭은 <strong>'전문대 졸업자 특별전형'</strong>. 전문대 이상 졸업자가 전문대 1학년으로 입학하는 제도입니다.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              { emoji: "📝", title: "수능 불필요", desc: "대학 성적(GPA)과 면접으로만 선발합니다. 수능 점수는 전혀 반영되지 않습니다.", color: NAVY, bg: "#EEF2FF" },
              { emoji: "🏥", title: "보건계열 진학 가능", desc: "간호학과, 물리치료학과, 방사선학과, 임상병리학과, 치위생학과 등 보건계열 전반이 가능합니다.", color: "#15803D", bg: "#F0FDF4" },
              { emoji: "📊", title: "수시·정시보다 수월", desc: "일반 전형 대비 경쟁률이 낮은 편입니다. 준비를 제대로 하면 충분히 합격 가능합니다.", color: "#C2410C", bg: "#FFF7ED" },
            ].map((card) => (
              <div key={card.title} style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ background: card.bg, padding: "28px 24px 20px" }}>
                  <span style={{ fontSize: 32 }}>{card.emoji}</span>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: card.color, marginTop: 12, marginBottom: 4 }}>{card.title}</h3>
                </div>
                <div style={{ padding: "18px 24px 24px" }}>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: "#EEF2FF", borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 20 }}>💡</span>
            <p style={{ fontSize: 14, color: NAVY, fontWeight: 600, lineHeight: 1.6, wordBreak: "keep-all" }}>
              고졸이거나 대학을 다닌 적 없어도, 학점은행제로 지원 자격을 만들 수 있습니다
            </p>
          </div>
        </div>
      </section>

      {/* ── 지원 자격 문제 제기 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">지원 자격</span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">그런데, 지원하려면 졸업장이 필요합니다</h2>
            <p className="text-sm text-gray-500">전문대 이상 졸업자만 지원할 수 있습니다</p>
          </div>

          {/* 불가 케이스 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
            {[
              "고졸이거나 대학 중퇴 → 지원 불가",
              "대학을 다닌 적 없음 → 지원 불가",
            ].map((t) => (
              <div key={t} style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 14, padding: "18px 22px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>❌</span>
                <span style={{ fontSize: 14, color: "#B91C1C", fontWeight: 600 }}>{t}</span>
              </div>
            ))}
          </div>

          {/* 전환 */}
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ fontSize: 20, fontWeight: 700, color: "#111", marginBottom: 8 }}>포기해야 할까요?</p>
            <p style={{ fontSize: 24, fontWeight: 800, color: NAVY }}>아닙니다.</p>
            <p style={{ fontSize: 15, color: "#555", marginTop: 10, lineHeight: 1.7 }}>
              학점은행제로 전문학사(졸업장)를 취득하면<br />지원 자격이 생깁니다
            </p>
          </div>

          {/* 학점은행제 장점 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {[
              { emoji: "💻", title: "온라인으로 졸업장 취득", desc: "100% 온라인 수업으로 직장·육아 중에도 가능합니다" },
              { emoji: "⚡", title: "단기간 취득 가능", desc: "자격증·독학사로 학점을 인정받아 기간을 획기적으로 단축합니다" },
              { emoji: "🎓", title: "고졸 이상 누구나 가능", desc: "학력 제한 없이 누구나 시작할 수 있습니다" },
            ].map((item) => (
              <div key={item.title} style={{ background: "#ffffff", borderRadius: 16, padding: "22px 20px", border: "1px solid #e5e7eb", textAlign: "center" }}>
                <span style={{ fontSize: 28 }}>{item.emoji}</span>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginTop: 10, marginBottom: 6 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ background: "#ffffff", border: "1.5px solid " + NAVY, borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "center", gap: 12, justifyContent: "center", textAlign: "center" }}>
            <span style={{ fontSize: 20 }}>📅</span>
            <p style={{ fontSize: 14, color: NAVY, fontWeight: 600, lineHeight: 1.6 }}>
              경영학 전문학사 기준, 약 <strong>8개월~1년</strong>이면 졸업장 취득 가능
            </p>
          </div>
        </div>
      </section>

      {/* ── 타이밍이 핵심입니다 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">타이밍</span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              대졸자전형, 언제 시작하느냐가<br />합격을 결정합니다
            </h2>
            <p className="text-base font-bold" style={{ color: "#B91C1C" }}>이걸 모르면 1년을 통째로 날립니다</p>
          </div>

          {/* 지원 시기 타임라인 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { month: "9월", label: "수시 1차", tag: "합격 확률 최고", tagColor: "#15803D", tagBg: "#F0FDF4", border: "1.5px solid #15803D", desc: "선발 인원 최대\n경쟁률 최저\n졸업자만 지원 가능(대학 多)" },
              { month: "11월", label: "수시 2차", tag: "차선책", tagColor: "#C2410C", tagBg: "#FFF7ED", border: "1px solid #e5e7eb", desc: "수시 1차 불합격 시\n재도전 가능\n경쟁률 소폭 상승" },
              { month: "1월", label: "정시", tag: "마지막 기회", tagColor: "#6B7280", tagBg: "#F8F9FA", border: "1px solid #e5e7eb", desc: "선발 인원 감소\n경쟁률 높음\n졸업예정자 지원 가능" },
            ].map((item) => (
              <div key={item.label} style={{ borderRadius: 16, border: item.border, background: "#ffffff", padding: "24px 22px", textAlign: "center" }}>
                <p style={{ fontSize: 32, fontWeight: 800, color: NAVY, marginBottom: 4 }}>{item.month}</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 10 }}>{item.label}</p>
                <span style={{ display: "inline-block", fontSize: 12, fontWeight: 600, color: item.tagColor, background: item.tagBg, padding: "3px 12px", borderRadius: 20, marginBottom: 12 }}>{item.tag}</span>
                <p style={{ fontSize: 12, color: "#666", lineHeight: 1.8, whiteSpace: "pre-line" }}>{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 핵심 강조 박스 */}
          <div style={{ background: "#EEF2FF", border: "1.5px solid #C7D2FE", borderRadius: 16, padding: "24px 28px", marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 14 }}>🔑 핵심 포인트</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "수시 1차는 졸업자만 지원 가능 (졸업예정자 불가인 대학 많음)",
                "학점은행제 학위는 2월, 8월에만 수여됩니다",
                "9월 수시 1차에 지원하려면 → 늦어도 8월에 학위 취득 필수",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 13, color: "#333", lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 경고 박스 */}
          <div style={{ background: "#FEF2F2", border: "1.5px solid #FECACA", borderRadius: 16, padding: "24px 28px", marginBottom: 16 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#B91C1C", marginBottom: 14 }}>⚠️ 반드시 확인하세요</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "1월에 시작하면 8월 학위 취득이 불가능합니다!",
                "학점은행제 1학기(11월 중순~5월 중순 개강) 수업을 들어야 8월 학위 가능",
                "일주일 차이로 1학기·2학기 구분이 달라짐 — 반드시 확인 필요",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#B91C1C", flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 13, color: "#B91C1C", fontWeight: 500, lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 결론 */}
          <div style={{ background: NAVY, borderRadius: 16, padding: "22px 28px", textAlign: "center" }}>
            <p style={{ fontSize: 15, fontWeight: 700, color: "#ffffff", lineHeight: 1.7 }}>
              2026년 수시 1차 합격을 목표로 한다면,<br />
              <span style={{ color: "#FFD700" }}>지금 바로 시작해야 합니다</span>
            </p>
          </div>
        </div>
      </section>

      {/* ── 합격 전략 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">합격 전략</span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">대졸자전형, 이렇게 준비해야 합격합니다</h2>
            <p className="text-sm text-gray-500">평가 요소를 이해하고 전략적으로 준비하세요</p>
          </div>

          {/* 평가 요소 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[
              {
                rank: "1순위",
                emoji: "📋",
                title: "성적 (GPA)",
                desc: "가장 비중이 높습니다. 기본 4.0 이상은 되어야 하고, 4.5 만점에 가까울수록 유리합니다. 백분율 기준으로는 99점대에 가깝게 받아야 경쟁력이 생깁니다.",
                color: NAVY,
                bg: NAVY,
                highlight: true,
              },
              {
                rank: "2순위",
                emoji: "🎤",
                title: "면접",
                desc: "지원 동기, 기본 소양, 인성 위주로 평가합니다. 확실한 스토리가 있어야 합니다.",
                color: "#C2410C",
                bg: "#FFF7ED",
                highlight: false,
              },
              {
                rank: "3순위",
                emoji: "📖",
                title: "토익 (일부 대학)",
                desc: "동남보건대 등 일부 대학이 반영합니다. 평균 800 중반대가 기준입니다.",
                color: "#15803D",
                bg: "#F0FDF4",
                highlight: false,
              },
            ].map((item) => (
              <div key={item.title} style={{ borderRadius: 20, overflow: "hidden", border: item.highlight ? `1.5px solid ${NAVY}` : "1px solid #e5e7eb" }}>
                <div style={{ background: item.highlight ? NAVY : item.bg, padding: "24px 22px 18px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 28 }}>{item.emoji}</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: item.highlight ? "rgba(255,255,255,0.7)" : item.color, background: item.highlight ? "rgba(255,255,255,0.15)" : "rgba(0,0,0,0.07)", padding: "2px 10px", borderRadius: 20 }}>{item.rank}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, color: item.highlight ? "#ffffff" : item.color, marginBottom: 0 }}>{item.title}</h3>
                </div>
                <div style={{ padding: "18px 22px 22px", background: "#ffffff" }}>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 강조 */}
          <div style={{ background: "#EEF2FF", border: "1.5px solid #C7D2FE", borderRadius: 14, padding: "16px 22px", marginBottom: 16, display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontSize: 18 }}>⭐</span>
            <p style={{ fontSize: 14, color: NAVY, fontWeight: 600 }}>
              학점은행제는 성적 관리가 일반 대학보다 수월 → 높은 GPA 확보에 유리
            </p>
          </div>

          {/* 꿀팁 박스 */}
          <div style={{ background: "#ffffff", border: "1px solid #e5e7eb", borderRadius: 16, padding: "24px 26px" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 14 }}>🍯 합격 꿀팁</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                "10과목 A+보다 20과목 A+이 더 유리할 수 있음 (입학처별 확인 필요)",
                "GPA 4.5 만점에 가깝게, 백분율 99점대를 목표로 — 성적이 1순위",
                "자격증은 미루지 말고 빨리 취득 — 직전까지 못 따면 학위 자체를 못 받음",
                "독학사는 1단계가 압도적으로 쉬움 — 1~2주 준비로 합격 가능",
              ].map((t) => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#F59E0B", flexShrink: 0, marginTop: 6 }} />
                  <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 지원 가능 대학·학과 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">대학·학과 안내</span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">대졸자전형으로 갈 수 있는 대학과 학과</h2>
            <p className="text-sm text-gray-500">보건계열 중심으로 다양한 학과에 지원 가능합니다</p>
          </div>

          {/* 학과 태그 */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10, justifyContent: "center", marginBottom: 36 }}>
            {["간호학과", "물리치료학과", "방사선학과", "임상병리학과", "치위생학과", "응급구조학과", "안경광학과"].map((tag) => (
              <span
                key={tag}
                style={{
                  padding: "8px 18px",
                  borderRadius: 30,
                  background: "#EEF2FF",
                  color: NAVY,
                  fontSize: 14,
                  fontWeight: 600,
                  border: "1.5px solid #C7D2FE",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* 주요 대학 카드 */}
          <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 16, textAlign: "center" }}>주요 대학 (3대천왕)</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {[
              { name: "서울여자간호대학교", tag: "보건 특화", emoji: "🏥", points: ["간호학과 단일 특화 대학", "높은 취업률·현장 실습 중심", "성적 비중 높음"] },
              { name: "삼육보건대학교", tag: "보건 특화", emoji: "💊", points: ["보건계열 다양한 학과 운영", "대졸자전형 선발 인원 많음", "면접 비중 비교적 높음"] },
              { name: "동남보건대학교", tag: "성적+토익 반영", emoji: "📚", points: ["성적 + 토익 동시 반영", "토익 800 중반대 권장", "보건계열 다수 학과 운영"] },
            ].map((univ) => (
              <div key={univ.name} style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                <div style={{ background: "#EEF2FF", padding: "20px 22px" }}>
                  <span style={{ fontSize: 24 }}>{univ.emoji}</span>
                  <p style={{ fontSize: 15, fontWeight: 700, color: NAVY, marginTop: 8, marginBottom: 4 }}>{univ.name}</p>
                  <span style={{ fontSize: 11, fontWeight: 600, color: NAVY, background: "rgba(26,26,173,0.1)", padding: "2px 10px", borderRadius: 20 }}>{univ.tag}</span>
                </div>
                <div style={{ padding: "16px 22px 20px" }}>
                  <Bullets items={univ.points} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 16 }}>ℹ️</span>
              <p style={{ fontSize: 13, color: "#555" }}>이 외에도 전국 수십 개 전문대학에서 대졸자전형을 실시합니다.</p>
            </div>
            <div style={{ background: "#F8F9FA", borderRadius: 12, padding: "14px 20px", display: "flex", alignItems: "flex-start", gap: 10 }}>
              <span style={{ fontSize: 16 }}>🔗</span>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                <strong>전문대학 포털(jpti.or.kr)</strong>에서 대학별 전형 방법을 한눈에 비교할 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 서플라이에듀가 도와드리는 것 섹션 ── */}
      <section style={{ background: NAVY, padding: "80px 24px" }}>
        <div className="mx-auto max-w-5xl">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <span style={{ display: "inline-block", fontSize: 11, fontWeight: 600, letterSpacing: "0.1em", color: "rgba(255,255,255,0.7)", background: "rgba(255,255,255,0.1)", padding: "3px 14px", borderRadius: 20, marginBottom: 16 }}>
              서플라이에듀
            </span>
            <h2 style={{ fontSize: 28, fontWeight: 800, color: "#ffffff", lineHeight: 1.4, marginBottom: 12 }}>
              서플라이에듀는 합격까지 함께합니다
            </h2>
            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.7)", lineHeight: 1.7 }}>
              시작 시기부터 합격까지, 타이밍을 놓치지 않도록<br />전담 컨설턴트가 1:1로 관리합니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
            {[
              { step: "STEP 1", title: "목표 대학·학과 선정 + 지원 시기 역산", desc: "목표 대학과 전형 일정에 맞춰 학위 취득 시기를 역산하고 전략을 수립합니다." },
              { step: "STEP 2", title: "학점은행제 최적 플랜 설계", desc: "수업·자격증·독학사 최적 조합으로 가장 빠르게 전문학사를 취득하는 플랜을 설계합니다." },
              { step: "STEP 3", title: "전문학사 취득 + 고GPA 확보 관리", desc: "학위 취득과 동시에 합격에 필요한 높은 GPA를 유지할 수 있도록 관리해드립니다." },
              { step: "STEP 4", title: "면접 준비 + 원서 접수 지원", desc: "지원 동기, 인성 면접까지 함께 준비하고 원서 접수부터 합격까지 끝까지 함께합니다." },
            ].map((item) => (
              <div key={item.step} style={{ background: "rgba(255,255,255,0.08)", borderRadius: 16, padding: "24px 22px", border: "1px solid rgba(255,255,255,0.12)" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.5)", letterSpacing: "0.1em" }}>{item.step}</span>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#ffffff", marginTop: 6, marginBottom: 8 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center" }}>
            <Link href="/apply" className="inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95" style={{ background: "#FFFFFF", color: NAVY }}>
              합격 플랜 무료 상담 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── FAQ 섹션 ── */}
      <FAQSection />

      {/* ── 하단 CTA 섹션 ── */}
      <section className="py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            대졸자전형, 타이밍을 놓치면 1년을 기다려야 합니다
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            지금 시작하면 2026년 수시 1차 지원이 가능합니다
          </p>
          <Link href="/apply" className="mt-8 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95" style={{ background: "#FFFFFF", color: NAVY }}>
            합격 플랜 무료 상담받기
          </Link>
        </div>
      </section>

      {/* ── 푸터 ── */}
      <footer className="border-t bg-white py-8" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center text-xs" style={{ color: "rgba(0,0,0,0.4)" }}>
          <p className="font-semibold" style={{ color: "rgba(0,0,0,0.6)" }}>서플라이에듀케이션</p>
          <p className="mt-1">© {new Date().getFullYear()} Supply Education. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
