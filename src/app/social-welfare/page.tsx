"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";

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
        <Link
          href="/"
          className="text-lg font-bold"
          style={{ color: isScrolled ? "#000000" : "#FFFFFF", transition: "color 0.3s" }}
        >
          서플라이에듀케이션
        </Link>
        <Link
          href="/apply"
          className="rounded-full px-5 py-2 text-sm font-bold transition-all"
          style={
            isScrolled
              ? { background: NAVY, color: "#FFFFFF" }
              : { background: "transparent", color: "#FFFFFF", border: "1.5px solid #FFFFFF" }
          }
        >
          상담 신청
        </Link>
      </div>
    </header>
  );
}

/* ── 후기 ticker ── */
const reviewData = Array.from({ length: 86 }, (_, i) => ({ src: `/reviews/review-${i + 1}.webp` }));
const ROW1 = reviewData.slice(0, 6);
const ROW2 = reviewData.slice(43, 49);
const IMG_W = 135;
const GAP   = 10;
const SET_W = (IMG_W + GAP) * 6;

function ReviewTicker() {
  const [lightbox, setLightbox] = useState<{ src: string } | null>(null);
  const [paused, setPaused]     = useState(false);
  const sectionRef              = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightbox]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setPaused(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const playState = paused ? "paused" : "running";
  const row1Items = [...ROW1, ...ROW1, ...ROW1, ...ROW1];
  const row2Items = [...ROW2, ...ROW2, ...ROW2, ...ROW2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#F8F9FA] pb-20 pt-10"
      style={{ contain: "layout style paint", overflow: "hidden" }}
    >
      <style>{`
        @keyframes ticker-ltr {
          from { transform: translateX(0); }
          to   { transform: translateX(-${SET_W}px); }
        }
        @keyframes ticker-rtl {
          from { transform: translateX(-${SET_W}px); }
          to   { transform: translateX(0); }
        }
      `}</style>

      <div style={{ position: "relative", overflow: "hidden" }}>
        <div
          style={{
            display: "flex",
            gap: GAP,
            width: "max-content",
            willChange: "transform",
            transform: "translateZ(0)",
            animation: `ticker-ltr 60s linear infinite`,
            animationPlayState: playState,
          }}
        >
          {row1Items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              onClick={() => setLightbox(item)}
              style={{ height: 180, width: "auto", borderRadius: 10, flexShrink: 0, cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      <div style={{ position: "relative", overflow: "hidden", marginTop: 10 }}>
        <div
          style={{
            display: "flex",
            gap: GAP,
            width: "max-content",
            willChange: "transform",
            transform: "translateZ(0)",
            animation: `ticker-rtl 60s linear infinite`,
            animationPlayState: playState,
          }}
        >
          {row2Items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={i}
              src={item.src}
              alt=""
              loading="lazy"
              decoding="async"
              onClick={() => setLightbox(item)}
              style={{ height: 180, width: "auto", borderRadius: 10, flexShrink: 0, cursor: "pointer" }}
            />
          ))}
        </div>
      </div>

      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.85)",
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            zIndex: 9999,
            overflowY: "auto",
            paddingTop: "40px",
            paddingBottom: "40px",
            paddingLeft: "20px",
            paddingRight: "20px",
          }}
        >
          <button
            onClick={() => setLightbox(null)}
            style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#FFFFFF", fontSize: 32, lineHeight: 1, cursor: "pointer" }}
            aria-label="닫기"
          >
            ×
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={lightbox.src}
            alt=""
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: "90vw", width: "auto", height: "auto", objectFit: "contain", borderRadius: "12px", display: "block" }}
          />
        </div>
      )}
    </section>
  );
}

/* ── FAQ ── */
const faqs = [
  {
    q: "직장 다니면서도 가능한가요?",
    a: "네, 가능합니다. 이론 과목은 100% 온라인으로 진행됩니다. 160시간 실습은 담당자가 직장 스케줄에 맞춰 인근 기관을 연계해드립니다. 직장인 수강생 비율이 높은 과정입니다.",
  },
  {
    q: "고졸인데 취득할 수 있나요?",
    a: "가능합니다. 고졸의 경우 전문학사 취득과 사회복지사 과목을 병행하는 방식으로 진행됩니다. 기간은 약 1년 반~2년 정도 소요되며, 담당자가 최적의 경로를 설계해드립니다.",
  },
  {
    q: "취득까지 얼마나 걸리나요?",
    a: "전문대졸 기준으로 약 1년 반입니다. 고졸의 경우 학점은행제 병행 시 약 1년 반~2년이 소요됩니다. 개인 상황에 따라 다를 수 있으니 무료 상담을 통해 정확한 기간을 확인해보세요.",
  },
  {
    q: "실습은 어떻게 진행되나요?",
    a: "160시간 현장 실습은 사회복지 기관에서 진행됩니다. 담당자가 거주 지역 인근의 적합한 기관을 연계해드리고, 실습 일정도 함께 조율해드립니다.",
  },
  {
    q: "비용이 중간에 추가로 드나요?",
    a: "아니요. 처음 상담 시 안내드린 비용 외에 추가 비용은 없습니다. 총 비용과 납부 일정을 명확하게 안내해드리므로 걱정하지 않으셔도 됩니다.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="w-full bg-white py-16 md:py-20 px-4 md:px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
          자주 묻는 질문
        </span>
        <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-2">나도 가능할까요?</h2>
        <p className="text-sm text-gray-500 mb-10">사회복지사 2급 취득에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
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
                <ChevronDown
                  size={18}
                  color="#1a1aad"
                  style={{
                    flexShrink: 0,
                    marginLeft: 8,
                    transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                    transition: "transform 0.2s",
                  }}
                />
              </button>
              {openIndex === i && (
                <div className="px-5 pb-4 text-sm leading-relaxed text-gray-500">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 메인 페이지 ── */
export default function SocialWelfarePage() {
  const [planName, setPlanName] = useState("");
  const [planPhone, setPlanPhone] = useState("");
  const [planEducation, setPlanEducation] = useState("");
  const [planMessage, setPlanMessage] = useState("");
  const [planAgree, setPlanAgree] = useState(false);
  const [planSubmitting, setPlanSubmitting] = useState(false);
  const [planSubmitDone, setPlanSubmitDone] = useState(false);

  async function handlePlanSubmit(e: { preventDefault(): void }) {
    e.preventDefault();
    if (!planName || !planPhone || !planAgree) return;
    setPlanSubmitting(true);
    try {
      const res = await fetch("/api/submit-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: planName,
          phone: planPhone,
          course: "사회복지사 2급 / 플랜 상담 신청",
          status: planEducation,
          calculatorData: JSON.stringify({ message: planMessage }),
        }),
      });
      const json = await res.json();
      if (json.success) setPlanSubmitDone(true);
    } catch {
      /* 네트워크 오류 무시 */
    } finally {
      setPlanSubmitting(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      <Navbar />

      {/* ── 1. 히어로 섹션 ── */}
      <section className="relative flex min-h-screen flex-col justify-center">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/social-welfare-hero.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "rgba(10,15,40,0.6)" }} />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6" style={{ zIndex: 2 }}>
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            >
              정부 지원금으로 매출 내는 소자본 창업
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              사회복지사 2급으로<br />
              <span style={{ background: "#1a1aad", color: "#ffffff", padding: "0 8px" }}>산후파견업 대표</span>가<br />
              될 수 있습니다
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.9 }}>
              시험 없이 취득 가능한 국가자격증<br />
              1:1 담당자가 자격증 취득까지 책임집니다
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "약 1년 반~", label: "취득 기간" },
                { value: "97.3%", label: "자격증 취득률" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-bold text-white md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-white/60">{stat.label}</p>
                </div>
              ))}
            </div>
            <Link
              href="/apply"
              className="mt-10 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
              style={{ background: "#FFFFFF", color: NAVY }}
            >
              무료 상담 신청하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 2. 왜 산후파견업인가 ── */}
      <section className="w-full bg-white py-16 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-12 md:mb-16">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">산후파견업 창업</span>
            <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-3" style={{ wordBreak: "keep-all" }}>왜 지금 산후파견업인가요?</h2>
            <p className="text-sm text-gray-500">자격증 하나로 만들 수 있는 가장 현실적인 사업</p>
          </div>

          <div className="flex flex-col">
            {/* 01 */}
            <div style={{ paddingBottom: 44, borderBottom: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: NAVY, letterSpacing: "0.18em", marginBottom: 14 }}>01</p>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.4, marginBottom: 20, wordBreak: "keep-all" }}>
                정부가 매출을 만들어줍니다
              </h3>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all", marginBottom: 16 }}>
                산후파견업은 <strong style={{ color: NAVY, fontWeight: 700 }}>정부 바우처 제도</strong> 위에서 운영됩니다.<br />
                서비스 비용의 대부분을 고객이 아닌 정부가 지급하는 구조입니다.
              </p>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all", marginBottom: 16 }}>
                그래서 <strong style={{ color: NAVY, fontWeight: 700 }}>광고 없이도 수요가 생깁니다.</strong><br />
                바우처 플랫폼에 등록만 하면 고객이 자연스럽게 연결됩니다.
              </p>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all" }}>
                출산 가정이 있는 한 수요는 지속되고,<br />
                <strong style={{ color: NAVY, fontWeight: 700 }}>경기 불황에도 정부 지원 규모는 유지</strong>됩니다.<br />
                일반 자영업과는 리스크 구조 자체가 다릅니다.
              </p>
            </div>

            {/* 02 */}
            <div style={{ paddingTop: 44, paddingBottom: 44, borderBottom: "1px solid #e5e7eb" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: NAVY, letterSpacing: "0.18em", marginBottom: 14 }}>02</p>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.4, marginBottom: 20, wordBreak: "keep-all" }}>
                자격증 하나, 사무실 3평이면 됩니다
              </h3>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all", marginBottom: 16 }}>
                창업 등록에 필요한 것은 딱 두 가지입니다.<br />
                <strong style={{ color: NAVY, fontWeight: 700 }}>사회복지사 2급 자격증</strong>과{" "}
                <strong style={{ color: NAVY, fontWeight: 700 }}>사무실 3평.</strong>
              </p>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all", marginBottom: 16 }}>
                화려한 인테리어도, 재고도, 초기 직원 채용도 필요 없습니다.<br />
                소자본으로 시작해 수익이 안정되면 규모를 키울 수 있습니다.
              </p>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all" }}>
                자격증 취득도 어렵지 않습니다.<br />
                <strong style={{ color: NAVY, fontWeight: 700 }}>별도 시험 없이</strong> 온라인 과목 이수만으로 취득되며,
                직장을 다니면서 병행할 수 있고{" "}
                전문대졸 기준 <strong style={{ color: NAVY, fontWeight: 700 }}>약 1년 반</strong>이면 충분합니다.
              </p>
            </div>

            {/* 03 */}
            <div style={{ paddingTop: 44 }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: NAVY, letterSpacing: "0.18em", marginBottom: 14 }}>03</p>
              <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111", lineHeight: 1.4, marginBottom: 20, wordBreak: "keep-all" }}>
                취득부터 창업까지,<br />혼자 하지 않아도 됩니다
              </h3>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all", marginBottom: 16 }}>
                처음 접하면 막히는 것들이 많습니다.
              </p>
              <p style={{ fontSize: 15, color: "#666", lineHeight: 2.1, wordBreak: "keep-all", marginBottom: 16, paddingLeft: 16, borderLeft: `3px solid #e5e7eb` }}>
                어느 교육원에서 어떤 과목을 들어야 하는지<br />
                160시간 실습은 어떻게 연계되는지<br />
                창업 등록은 어떤 순서로 진행되는지
              </p>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all", marginBottom: 16 }}>
                서플라이에듀의 <strong style={{ color: NAVY, fontWeight: 700 }}>1:1 전담 담당자</strong>가
                이 과정 전체를 함께합니다.
              </p>
              <p style={{ fontSize: 15, color: "#444", lineHeight: 2.1, wordBreak: "keep-all" }}>
                교육원 선별, 실습 연계, 자격증 취득, 창업 신청까지—<br />
                <strong style={{ color: NAVY, fontWeight: 700 }}>막히는 구간 없이 대표가 될 수 있도록</strong> 이끌어드립니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 이런 분들이 취득했어요 ── */}
      <section className="w-full bg-[#F8F9FA] pt-16 md:pt-20 pb-0 px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
            수강생 후기
          </span>
          <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-3" style={{ wordBreak: "keep-all" }}>
            이런 분들이 취득했어요
          </h2>
          <p className="text-sm text-gray-500 mb-10">실제 카카오톡으로 받은 수강생 후기입니다</p>
        </div>
      </section>
      <ReviewTicker />

      {/* ── 4. 이런 분들께 추천합니다 ── */}
      <section className="w-full py-16 md:py-20 px-4 md:px-6" style={{ background: NAVY }}>
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="inline-block text-xs font-semibold tracking-widest rounded-full px-4 py-1 mb-6"
            style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
          >
            이런 분께 추천합니다
          </span>
          <h2 className="text-[26px] font-bold text-white md:text-4xl mb-10" style={{ wordBreak: "keep-all" }}>
            혹시 이런 고민을 하고 계신가요?
          </h2>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {[
              "육아 경험을 살려 창업하고 싶은 분",
              "직장 다니면서 자격증 취득하고 싶은 분",
              "고졸인데 자격증 취득 가능한지 궁금한 분",
              "어떤 교육원이 좋은지 모르겠는 분",
            ].map((text) => (
              <span
                key={text}
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1.5px solid rgba(255,255,255,0.35)",
                  color: "#ffffff",
                  borderRadius: 100,
                  padding: "10px 20px",
                  fontSize: 14,
                  fontWeight: 600,
                  wordBreak: "keep-all",
                }}
              >
                ✓ {text}
              </span>
            ))}
          </div>
          <Link
            href="/apply"
            className="inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
            style={{ background: "#FFFFFF", color: NAVY }}
          >
            나도 가능한지 무료 상담받기 →
          </Link>
        </div>
      </section>

      {/* ── 5. 왜 서플라이에듀인가요 ── */}
      <section className="w-full bg-[#F8F9FA] py-16 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 md:mb-10">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              서플라이에듀를 선택하는 이유
            </span>
            <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-3" style={{ wordBreak: "keep-all" }}>
              학점은행제, 왜 서플라이에듀인가요?
            </h2>
            <p className="text-sm text-gray-500" style={{ wordBreak: "keep-all" }}>
              처음부터 자격증 취득까지, 혼자 하지 않아도 됩니다
            </p>
          </div>

          <div className="mb-10 text-center">
            <style>{`
              @keyframes marqueeSlide {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track {
                animation: marqueeSlide 20s linear infinite;
              }
              .marquee-track:hover {
                animation-play-state: paused;
              }
            `}</style>
            <p style={{ fontSize: 16, fontWeight: 600, color: NAVY, marginBottom: 16 }}>
              얼굴 없이 사라지는 플래너와는 다릅니다
            </p>
            <div style={{ overflow: "hidden" }}>
              <div className="marquee-track" style={{ display: "flex", width: "max-content" }}>
                {[...Array.from({ length: 11 }), ...Array.from({ length: 11 })].map((_, i) => {
                  const n = String((i % 11) + 1).padStart(2, "0");
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      src={`/team/team-${n}.webp`}
                      alt={`담당자 ${n}`}
                      style={{ width: 110, height: 110, borderRadius: "50%", objectFit: "cover", flexShrink: 0, marginRight: 16 }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              { emoji: "📚", title: "핵심 자료 제공", desc: "과목별 핵심 요약 자료를 제공해 최단 시간으로 최고 성적을 낼 수 있도록 도와드립니다" },
              { emoji: "📋", title: "이수 현황 점검", desc: "분기마다 학점 현황을 꼼꼼히 체크해 누락 없이 자격증 취득까지 정확하게 관리합니다" },
              { emoji: "🧑‍💼", title: "전담 담당자 1:1", desc: "처음 상담부터 자격증 취득, 창업까지 한 명의 전담 담당자가 끝까지 함께합니다" },
              { emoji: "📅", title: "시기별 맞춤 알림", desc: "수강신청·실습 신청·학점인정 시기마다 놓치지 않도록 사전에 안내해 드립니다" },
              { emoji: "📖", title: "상세 가이드 제공", desc: "복잡한 서류와 신청 절차를 누구나 쉽게 따라할 수 있도록 단계별로 안내합니다" },
              { emoji: "✅", title: "분기별 사후 점검", desc: "신청 내역에 누락된 부분이 없는지 분기별로 꼼꼼하게 재점검합니다" },
            ].map((card) => (
              <div
                key={card.title}
                className="p-3"
                style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 12, boxShadow: "0 1px 6px rgba(0,0,0,0.05)" }}
              >
                <div style={{ fontSize: 18, marginBottom: 6 }}>{card.emoji}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 3 }}>{card.title}</h3>
                <p style={{ fontSize: 12, color: "#555", lineHeight: 1.65, wordBreak: "keep-all" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. FAQ ── */}
      <FAQSection />

      {/* ── 7. 과정 상세 ── */}
      <section className="w-full bg-[#F8F9FA] py-16 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              과정별 상세
            </span>
            <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-3">
              필요한 과목과 비용을 확인하세요
            </h2>
            <p className="text-sm text-gray-500">사회복지사 2급 취득에 필요한 과목과 비용을 확인하세요</p>
          </div>

          <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14, minWidth: 540 }}>
                <thead>
                  <tr>
                    {["최종 학력", "이수 요건", "예상 소요 기간"].map((h) => (
                      <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, background: NAVY, color: "#fff", border: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {[
                    { edu: "4년제 대졸", req: "17과목(51학점) + 현장실습 160시간", period: "약 3학기" },
                    { edu: "전문대졸", req: "17과목(51학점) + 현장실습 160시간", period: "약 3학기" },
                    { edu: "고졸·대학 중퇴", req: "전문학사 80학점(전공 45·교양 15·일반선택 20, 17과목 포함) + 현장실습", period: "약 3~4학기" },
                  ].map((row, i) => (
                    <tr key={row.edu} style={{ background: i % 2 === 0 ? "#ffffff" : "#f8f9fa" }}>
                      <td style={{ padding: "12px 16px", fontWeight: 600, color: "#333", border: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{row.edu}</td>
                      <td style={{ padding: "12px 16px", color: "#333", border: "1px solid #e5e7eb", wordBreak: "keep-all" }}>{row.req}</td>
                      <td style={{ padding: "12px 16px", color: "#333", border: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{row.period}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. 플랜 상담 받아보기 ── */}
      <section className="w-full bg-white py-16 md:py-20 px-4 md:px-6">
        <style>{`
          @keyframes scrollUp {
            0%   { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes pulseDot {
            0%, 100% { transform: scale(1); opacity: 1; }
            50%       { transform: scale(1.6); opacity: 0.5; }
          }
        `}</style>
        <div className="mx-auto max-w-5xl">
          <div className="mb-8 text-center md:mb-12">
            <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium tracking-widest text-[#1a1aad]">
              무료 상담
            </span>
            <h2
              className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-3"
              style={{ wordBreak: "keep-all" }}
            >
              지금 바로 플랜 상담 받아보세요
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-stretch">
            {/* 왼쪽: 폼 */}
            <div className="flex flex-col" style={{ height: "100%" }}>
              {planSubmitDone ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 12 }}>신청 완료!</p>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>담당자가 곧 연락드리겠습니다.</p>
                </div>
              ) : (
                <form
                  onSubmit={handlePlanSubmit}
                  style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%", flex: 1 }}
                >
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", display: "block", marginBottom: 6 }}>
                      성함 <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="text"
                      value={planName}
                      onChange={(e) => setPlanName(e.target.value)}
                      placeholder="홍길동"
                      required
                      style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", display: "block", marginBottom: 6 }}>
                      연락처 <span style={{ color: "#EF4444" }}>*</span>
                    </label>
                    <input
                      type="tel"
                      value={planPhone}
                      onChange={(e) => setPlanPhone(e.target.value)}
                      placeholder="010-0000-0000"
                      required
                      style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", display: "block", marginBottom: 6 }}>
                      최종학력 및 보유학점
                    </label>
                    <input
                      type="text"
                      value={planEducation}
                      onChange={(e) => setPlanEducation(e.target.value)}
                      placeholder="예: 고졸 / 보유 학점 없음"
                      style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", display: "block", marginBottom: 6 }}>
                      문의내용
                    </label>
                    <textarea
                      value={planMessage}
                      onChange={(e) => setPlanMessage(e.target.value)}
                      placeholder="궁금한 점을 자유롭게 적어주세요"
                      rows={4}
                      style={{ height: 100, width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "11px 14px", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#555", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={planAgree}
                      onChange={(e) => setPlanAgree(e.target.checked)}
                      required
                      style={{ accentColor: NAVY, width: 16, height: 16, flexShrink: 0, marginTop: 1 }}
                    />
                    개인정보 수집 및 이용에 동의합니다.{" "}
                    <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  <button
                    type="submit"
                    disabled={planSubmitting}
                    style={{
                      width: "100%",
                      background: planSubmitting ? "#9ca3af" : NAVY,
                      color: "#fff",
                      fontWeight: 700,
                      fontSize: 15,
                      borderRadius: 10,
                      padding: "15px",
                      border: "none",
                      cursor: planSubmitting ? "not-allowed" : "pointer",
                      transition: "background 0.2s",
                    }}
                  >
                    {planSubmitting ? "제출 중..." : "나의 최단기 플랜 확인하기"}
                  </button>
                </form>
              )}
            </div>

            {/* 오른쪽: 카카오톡 + 실시간 상담 현황 */}
            <div className="flex flex-col" style={{ height: "100%" }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, color: "#111", marginBottom: 12, wordBreak: "keep-all", lineHeight: 1.4 }}>
                지금 바로 플랜 상담 받아보세요
              </h3>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: 8, wordBreak: "keep-all" }}>
                사회복지사 2급 전담 담당자가 내 상황에 맞는 최단 경로를 바로 설계해드립니다
              </p>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 20 }}>
                평일 09:00 ~ 22:00 / 주말 10:00 ~ 18:00
              </p>
              <Link
                href="/apply"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  background: "#FEE500",
                  color: "#111",
                  fontWeight: 700,
                  fontSize: 15,
                  borderRadius: 10,
                  padding: "14px 28px",
                  marginBottom: 28,
                  textDecoration: "none",
                }}
              >
                💬 카카오톡으로 상담 시작하기
              </Link>

              <div style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ background: "#F8F9FA", padding: "12px 18px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #e5e7eb" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", display: "inline-block", animation: "pulseDot 1.4s ease-in-out infinite" }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>실시간 상담 현황</span>
                </div>
                <div style={{ maxHeight: 300, overflow: "hidden", position: "relative" }}>
                  <div style={{ animation: "scrollUp 18s linear infinite" }}>
                    {[
                      { date: "오늘", type: "자격증취득", content: "사회복지사 2급 취득 플랜 상담", today: true },
                      { date: "오늘", type: "창업준비", content: "산후파견업 창업 준비 상담", today: true },
                      { date: "어제", type: "자격증취득", content: "고졸 기준 취득 기간 및 비용 문의", today: false },
                      { date: "어제", type: "창업준비", content: "사회복지사 자격증으로 창업 가능한지 문의", today: false },
                      { date: "2일 전", type: "자격증취득", content: "직장 병행 온라인 수강 가능한지 문의", today: false },
                      { date: "2일 전", type: "창업준비", content: "산모신생아 바우처 사업 등록 절차 문의", today: false },
                      { date: "3일 전", type: "자격증취득", content: "전문대졸 기준 필요 과목 수 문의", today: false },
                      { date: "3일 전", type: "창업준비", content: "160시간 실습 연계 방법 문의", today: false },
                      { date: "오늘", type: "자격증취득", content: "사회복지사 2급 취득 플랜 상담", today: true },
                      { date: "오늘", type: "창업준비", content: "산후파견업 창업 준비 상담", today: true },
                      { date: "어제", type: "자격증취득", content: "고졸 기준 취득 기간 및 비용 문의", today: false },
                      { date: "어제", type: "창업준비", content: "사회복지사 자격증으로 창업 가능한지 문의", today: false },
                      { date: "2일 전", type: "자격증취득", content: "직장 병행 온라인 수강 가능한지 문의", today: false },
                      { date: "2일 전", type: "창업준비", content: "산모신생아 바우처 사업 등록 절차 문의", today: false },
                      { date: "3일 전", type: "자격증취득", content: "전문대졸 기준 필요 과목 수 문의", today: false },
                      { date: "3일 전", type: "창업준비", content: "160시간 실습 연계 방법 문의", today: false },
                    ].map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "56px 72px 1fr",
                          gap: 8,
                          padding: "10px 18px",
                          borderBottom: "1px solid #f3f4f6",
                          alignItems: "center",
                          background: row.today ? "#FFFBEB" : "#fff",
                        }}
                      >
                        <span style={{ fontSize: 12, color: "#888", display: "flex", alignItems: "center", gap: 4 }}>
                          {row.today && <span style={{ fontSize: 10 }}>🔴</span>}
                          {row.date}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "2px 8px", borderRadius: 20, textAlign: "center", whiteSpace: "nowrap" }}>
                          {row.type}
                        </span>
                        <span style={{ fontSize: 12, color: "#444", lineHeight: 1.5, wordBreak: "keep-all" }}>
                          {row.content}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. 하단 CTA ── */}
      <section className="py-16 md:py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            지금 바로 시작하세요
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            전담 담당자가 1:1로 함께합니다
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
            style={{ background: "#FFFFFF", color: NAVY }}
          >
            무료 상담 신청하기
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
