"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ChevronDown, BookOpen, ClipboardCheck, UserCheck, Bell, FileText, CheckCircle2 } from "lucide-react";
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
              : { background: "rgba(255,255,255,0.15)", color: "#FFFFFF", border: "1.5px solid rgba(255,255,255,0.6)", backdropFilter: "blur(4px)" }
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
  const row1Items = [...ROW1, ...ROW1];
  const row2Items = [...ROW2, ...ROW2];

  return (
    <section
      ref={sectionRef}
      className="bg-[#F8F9FA] pb-16 pt-6"
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
        <div style={{ display: "flex", gap: GAP, width: "max-content", willChange: "transform", transform: "translateZ(0)", animation: `ticker-ltr 60s linear infinite`, animationPlayState: playState }}>
          {row1Items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={item.src} alt="" loading="eager" decoding="async" onClick={() => setLightbox(item)}
              style={{ height: 160, width: "auto", borderRadius: 10, flexShrink: 0, cursor: "pointer" }} />
          ))}
        </div>
      </div>

      <div style={{ position: "relative", overflow: "hidden", marginTop: 10 }}>
        <div style={{ display: "flex", gap: GAP, width: "max-content", willChange: "transform", transform: "translateZ(0)", animation: `ticker-rtl 60s linear infinite`, animationPlayState: playState }}>
          {row2Items.map((item, i) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={i} src={item.src} alt="" loading="eager" decoding="async" onClick={() => setLightbox(item)}
              style={{ height: 160, width: "auto", borderRadius: 10, flexShrink: 0, cursor: "pointer" }} />
          ))}
        </div>
      </div>

      {/* 클로징 카피 */}
      <div className="px-4 pt-10 text-center">
        <p className="text-base font-medium mb-1" style={{ color: NAVY }}>"정말 감사합니다!"</p>
        <p className="text-base font-medium mb-6" style={{ color: NAVY }}>"담당자님 덕분에 잘 마무리했어요!"</p>
        <p className="text-[22px] font-bold tracking-tight mb-1" style={{ color: "#000000" }}>포기만 하지 마세요!</p>
        <p className="text-[22px] font-bold tracking-tight" style={{ color: "#000000", textDecoration: "underline", textUnderlineOffset: "6px" }}>
          서플라이에듀는 끝까지 책임집니다
        </p>
      </div>

      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, backgroundColor: "rgba(0,0,0,0.85)", display: "flex", alignItems: "flex-start", justifyContent: "center", zIndex: 9999, overflowY: "auto", padding: "40px 20px" }}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: "16px", right: "16px", background: "none", border: "none", color: "#FFFFFF", fontSize: 32, lineHeight: 1, cursor: "pointer" }} aria-label="닫기">×</button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={lightbox.src} alt="" onClick={(e) => e.stopPropagation()} style={{ maxWidth: "90vw", width: "auto", height: "auto", objectFit: "contain", borderRadius: "12px", display: "block" }} />
        </div>
      )}
    </section>
  );
}

/* ── FAQ ── */
const faqs = [
  { q: "직장 다니면서도 가능한가요?", a: "네, 가능합니다. 이론 과목은 100% 온라인으로 진행됩니다. 160시간 실습은 담당자가 직장 스케줄에 맞춰 인근 기관을 연계해드립니다. 직장인 수강생 비율이 높은 과정입니다." },
  { q: "고졸인데 취득할 수 있나요?", a: "가능합니다. 고졸의 경우 전문학사 취득과 사회복지사 과목을 병행하는 방식으로 진행됩니다. 기간은 약 1년 반~2년 정도 소요되며, 담당자가 최적의 경로를 설계해드립니다." },
  { q: "취득까지 얼마나 걸리나요?", a: "전문대졸 기준으로 약 3학기(1년 반)입니다. 고졸의 경우 학점은행제 병행 시 약 3~4학기가 소요됩니다. 개인 상황에 따라 다르므로 무료 상담으로 정확한 기간을 확인해보세요." },
  { q: "실습은 어떻게 진행되나요?", a: "160시간 현장 실습은 사회복지 기관에서 진행됩니다. 담당자가 거주 지역 인근의 적합한 기관을 연계해드리고, 실습 일정도 함께 조율해드립니다." },
  { q: "비용이 중간에 추가로 드나요?", a: "아니요. 처음 상담 시 안내드린 비용 외에 추가 비용은 없습니다. 총 비용과 납부 일정을 명확하게 안내해드리므로 걱정하지 않으셔도 됩니다." },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="w-full bg-white py-16 md:py-20 px-4 md:px-6">
      <div className="mx-auto max-w-2xl">
        <div className="text-center mb-8">
          <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">자주 묻는 질문</span>
          <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-2">자주 하는 질문</h2>
          <p className="text-sm text-gray-500" style={{ wordBreak: "keep-all" }}>
            사회복지사 2급 취득에 대해<br />
            가장 많이 물어보시는 질문들을 모았어요
          </p>
        </div>
        <div className="space-y-2">
          {faqs.map((faq, i) => (
            <div
              key={i}
              style={{
                borderRadius: 14,
                overflow: "hidden",
                border: openIndex === i ? `1.5px solid ${NAVY}` : "1px solid #e5e7eb",
                background: openIndex === i ? "#EEF2FF" : "#ffffff",
                transition: "background 0.2s, border-color 0.2s",
              }}
            >
              <button
                className="flex w-full items-center justify-between px-4 py-4 text-left"
                onClick={() => setOpenIndex(openIndex === i ? -1 : i)}
              >
                <span className="text-sm font-semibold text-gray-800 pr-3" style={{ wordBreak: "keep-all" }}>{faq.q}</span>
                <ChevronDown
                  size={18}
                  color={NAVY}
                  style={{ flexShrink: 0, transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.25s" }}
                />
              </button>
              <div style={{ display: "grid", gridTemplateRows: openIndex === i ? "1fr" : "0fr", transition: "grid-template-rows 0.25s ease" }}>
                <div style={{ overflow: "hidden" }}>
                  <div className="px-4 pb-5 text-sm leading-relaxed text-gray-600" style={{ wordBreak: "keep-all" }}>{faq.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── 메인 페이지 ── */
export default function SocialWelfarePage() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      <Navbar />

      {/* ── 1. 히어로 ── */}
      <section className="relative flex min-h-dvh flex-col justify-center">
        <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/social-welfare-hero.png" alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(10,15,40,0.72) 60%, rgba(10,15,40,0.85))" }} />
        </div>
        <div className="relative mx-auto w-full max-w-6xl px-5 pt-20 pb-12 md:px-8 md:py-0" style={{ zIndex: 2 }}>
          <div className="max-w-xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-5 inline-block rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", border: "1px solid rgba(255,255,255,0.2)" }}
            >
              정부 지원금으로 매출 내는 소자본 창업
            </span>
            <h1 className="text-[28px] font-bold leading-snug tracking-tight text-white sm:text-4xl md:text-5xl">
              사회복지사 2급으로<br />
              <span style={{ background: NAVY, color: "#ffffff", padding: "2px 8px", borderRadius: 4 }}>산후파견업 대표</span>가<br />
              될 수 있습니다
            </h1>
            <p className="mt-5 text-base font-medium text-white/75 md:text-lg" style={{ lineHeight: 1.85 }}>
              시험 없이 취득 가능한 국가자격증<br />
              1:1 담당자가 자격증 취득까지 책임집니다
            </p>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-8">
              {[
                { value: "최단 1년 반", label: "취득 기간" },
                { value: "97.3%", label: "자격증 취득률" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="text-[15px] font-bold text-white sm:text-xl md:text-2xl">{stat.value}</p>
                  <p className="mt-0.5 text-xs text-white/55">{stat.label}</p>
                </div>
              ))}
            </div>
            <div className="mt-8">
              <Link
                href="/apply"
                className="block w-full rounded-full px-8 py-4 text-base font-bold text-center transition-transform hover:scale-105 active:scale-95 sm:inline-block sm:w-auto"
                style={{ background: "#FFFFFF", color: NAVY }}
              >
                무료 상담 신청하기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. 왜 산후파견업인가 ── */}
      <section className="w-full bg-white py-16 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">산후파견업 창업</span>
            <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-2" style={{ wordBreak: "keep-all" }}>왜 지금 산후파견업인가요?</h2>
            <p className="text-sm text-gray-500">자격증 하나로 만들 수 있는 가장 현실적인 사업</p>
          </div>

          <div className="flex flex-col">
            {[
              {
                num: "01",
                title: "정부가 매출을 만들어줍니다",
                body: (
                  <>
                    서비스 비용의 대부분을 <strong style={{ color: NAVY, fontWeight: 700 }}>정부 바우처</strong>가 지급합니다.<br />
                    광고 없이도 수요가 생기고,<br />경기 불황에도 안정적인 매출 구조가 유지됩니다.
                  </>
                ),
              },
              {
                num: "02",
                title: "자격증 하나, 사무실 3평이면 됩니다",
                body: (
                  <>
                    <strong style={{ color: NAVY, fontWeight: 700 }}>사회복지사 2급 + 사무실 3평</strong>이면 창업 등록이 가능합니다.<br />
                    별도 시험 없이 온라인 과목 이수만으로 취득되며,<br />직장 병행도 가능합니다.
                  </>
                ),
              },
              {
                num: "03",
                title: "취득부터 창업까지, 혼자 하지 않아도 됩니다",
                body: (
                  <>
                    교육원 선별,<br />실습 연계,<br />창업 신청까지<br />
                    <strong style={{ color: NAVY, fontWeight: 700 }}>전담 담당자가 막히는 구간 없이</strong> 이끌어드립니다.
                  </>
                ),
              },
            ].map((card, i, arr) => (
              <div
                key={card.num}
                style={{
                  paddingTop: i === 0 ? 0 : 28,
                  paddingBottom: i === arr.length - 1 ? 0 : 28,
                  borderBottom: i === arr.length - 1 ? "none" : "1px solid #e5e7eb",
                }}
              >
                <p style={{ fontSize: 11, fontWeight: 800, color: NAVY, letterSpacing: "0.2em", marginBottom: 8 }}>{card.num}</p>
                <h3 style={{ fontSize: 18, fontWeight: 800, color: "#111", lineHeight: 1.4, marginBottom: 10, wordBreak: "keep-all" }}>{card.title}</h3>
                <p style={{ fontSize: 15, color: "#444", lineHeight: 1.95, wordBreak: "keep-all" }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. 이런 분들께 추천합니다 ── */}
      <section className="w-full py-16 md:py-20 px-4 md:px-6" style={{ background: NAVY }}>
        <div className="mx-auto max-w-2xl text-center">
          <span
            className="inline-block text-xs font-semibold tracking-widest rounded-full px-4 py-1.5 mb-5"
            style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            이런 분께 추천합니다
          </span>
          <h2 className="text-[26px] font-bold text-white md:text-4xl mb-8" style={{ wordBreak: "keep-all" }}>
            혹시 이런 고민을 하고 계신가요?
          </h2>
          <div className="flex flex-col gap-2.5 mb-10 sm:flex-row sm:flex-wrap sm:justify-center">
            {[
              "육아 경험을 살려 창업하고 싶은 분",
              "직장 다니면서 자격증 취득하고 싶은 분",
              "고졸인데 자격증 취득 가능한지 궁금한 분",
              "어떤 교육원이 좋은지 모르겠는 분",
            ].map((text) => (
              <div
                key={text}
                className="flex items-center gap-2 rounded-xl px-4 py-3 sm:rounded-full"
                style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.25)" }}
              >
                <span style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, flexShrink: 0 }}>✓</span>
                <span style={{ color: "#ffffff", fontSize: 14, fontWeight: 600, wordBreak: "keep-all", textAlign: "left" }}>{text}</span>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="block w-full rounded-full px-8 py-4 text-base font-bold text-center transition-transform hover:scale-105 active:scale-95 sm:inline-block sm:w-auto"
            style={{ background: "#FFFFFF", color: NAVY }}
          >
            나도 가능한지 무료 상담받기 →
          </Link>
        </div>
      </section>

      {/* ── 4. 이런 분들이 취득했어요 ── */}
      <section className="w-full bg-[#F8F9FA] pt-16 md:pt-20 pb-0 px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">수강생 후기</span>
          <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-2" style={{ wordBreak: "keep-all" }}>이런 분들이 취득했어요</h2>
          <p className="text-sm text-gray-500 mb-8">실제 카카오톡으로 받은 수강생 후기입니다</p>
        </div>
      </section>
      <ReviewTicker />

      {/* ── 5. 왜 서플라이에듀인가요 ── */}
      <section className="w-full bg-white py-16 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">서플라이에듀를 선택하는 이유</span>
            <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-2" style={{ wordBreak: "keep-all" }}>학점은행제, 왜 서플라이에듀인가요?</h2>
            <p className="text-sm text-gray-500" style={{ wordBreak: "keep-all" }}>처음부터 자격증 취득까지, 혼자 하지 않아도 됩니다</p>
          </div>

          {/* 신뢰 숫자 배지 */}
          <div className="mb-10 grid grid-cols-3 gap-2 text-center sm:flex sm:justify-center sm:gap-12">
            {[
              { value: "8,000명+", label: "누적 수강생" },
              { value: "97.3%", label: "자격증 취득률" },
              { value: "1:1", label: "전담 담당자" },
            ].map((b) => (
              <div key={b.label}>
                <p className="text-lg font-bold sm:text-2xl" style={{ color: NAVY }}>{b.value}</p>
                <p className="mt-0.5 text-[11px] text-gray-500 sm:text-xs">{b.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-10 text-center">
            <style>{`
              @keyframes marqueeSlide {
                0%   { transform: translateX(0); }
                100% { transform: translateX(-50%); }
              }
              .marquee-track { animation: marqueeSlide 20s linear infinite; }
              .marquee-track:hover { animation-play-state: paused; }
            `}</style>
            <p style={{ fontSize: 14, fontWeight: 600, color: NAVY, marginBottom: 14 }}>얼굴 없이 사라지는 플래너와는 다릅니다</p>
            <div style={{ overflow: "hidden" }}>
              <div className="marquee-track" style={{ display: "flex", width: "max-content" }}>
                {[...Array.from({ length: 11 }), ...Array.from({ length: 11 })].map((_, i) => {
                  const n = String((i % 11) + 1).padStart(2, "0");
                  return (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img key={i} src={`/team/team-${n}.webp`} alt={`담당자 ${n}`}
                      style={{ width: 90, height: 90, borderRadius: "50%", objectFit: "cover", flexShrink: 0, marginRight: 14 }} />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { Icon: BookOpen,      title: "핵심 자료 제공",   desc: "과목별 핵심 요약 자료로 최단 시간 내 최고 성적을 낼 수 있도록 도와드립니다" },
              { Icon: ClipboardCheck, title: "이수 현황 점검",  desc: "분기마다 학점 현황을 꼼꼼히 체크해 누락 없이 자격증까지 정확하게 관리합니다" },
              { Icon: UserCheck,     title: "전담 담당자 1:1",  desc: "처음 상담부터 자격증 취득, 창업까지 한 명의 전담 담당자가 끝까지 함께합니다" },
              { Icon: Bell,          title: "시기별 맞춤 알림", desc: "수강신청·실습 신청·학점인정 시기마다 놓치지 않도록 사전에 안내해 드립니다" },
              { Icon: FileText,      title: "상세 가이드 제공", desc: "복잡한 서류와 신청 절차를 누구나 쉽게 따라할 수 있도록 단계별로 안내합니다" },
              { Icon: CheckCircle2,  title: "분기별 사후 점검", desc: "신청 내역에 누락된 부분이 없는지 분기별로 꼼꼼하게 재점검합니다" },
            ].map((card) => {
              const Icon = card.Icon;
              return (
                <div key={card.title} className="p-3 md:p-4" style={{ background: "#F8F9FA", border: "1px solid #e5e7eb", borderRadius: 14 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 8, background: "#EEF2FF", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <Icon size={17} color={NAVY} />
                  </div>
                  <h3 style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 4, wordBreak: "keep-all" }}>{card.title}</h3>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6, wordBreak: "keep-all" }}>{card.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. 과정 상세 ── */}
      <section className="w-full bg-[#F8F9FA] py-16 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">과정별 상세</span>
            <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-2">필요한 과목과 비용을 확인하세요</h2>
            <p className="text-sm text-gray-500">사회복지사 2급 취득에 필요한 과목과 기간을 확인하세요</p>
          </div>
          {/* 모바일: 카드형 */}
          {(() => {
            const rows = [
              { edu: "4년제 대졸",    req: "17과목(51학점) + 현장실습 160시간",                                          period: "약 3학기"   },
              { edu: "전문대졸",      req: "17과목(51학점) + 현장실습 160시간",                                          period: "약 3학기"   },
              { edu: "고졸·대학 중퇴", req: "전문학사 80학점(전공 45·교양 15·일반선택 20, 17과목 포함) + 현장실습",     period: "약 3~4학기" },
            ];
            return (
              <>
                {/* 모바일 */}
                <div className="space-y-3 md:hidden">
                  {rows.map((row) => (
                    <div key={row.edu} style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "14px 16px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                        <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{row.edu}</span>
                        <span style={{ fontSize: 12, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "2px 10px", borderRadius: 20, whiteSpace: "nowrap" }}>{row.period}</span>
                      </div>
                      <p style={{ fontSize: 13, color: "#555", lineHeight: 1.65, wordBreak: "keep-all" }}>{row.req}</p>
                    </div>
                  ))}
                </div>
                {/* 데스크탑 */}
                <div className="hidden md:block" style={{ background: "#ffffff", borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr>
                        {["최종 학력", "이수 요건", "예상 소요 기간"].map((h) => (
                          <th key={h} style={{ padding: "11px 14px", textAlign: "left", fontWeight: 600, background: NAVY, color: "#fff", whiteSpace: "nowrap" }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {rows.map((row, i) => (
                        <tr key={row.edu} style={{ background: i % 2 === 0 ? "#ffffff" : "#f8f9fa" }}>
                          <td style={{ padding: "11px 14px", fontWeight: 600, color: "#333", borderTop: "1px solid #e5e7eb", whiteSpace: "nowrap" }}>{row.edu}</td>
                          <td style={{ padding: "11px 14px", color: "#444", borderTop: "1px solid #e5e7eb", wordBreak: "keep-all", lineHeight: 1.6 }}>{row.req}</td>
                          <td style={{ padding: "11px 14px", color: "#333", borderTop: "1px solid #e5e7eb", whiteSpace: "nowrap", fontWeight: 600 }}>{row.period}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            );
          })()}

          <p className="text-xs text-gray-400 mt-3 text-center">* 비용 및 정확한 일정은 무료 상담 시 안내드립니다</p>
        </div>
      </section>

      {/* ── 7. FAQ ── */}
      <FAQSection />

      {/* ── 8. 상담 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-16 md:py-20 px-4 md:px-6">
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
        <div className="mx-auto max-w-xl">
          <div className="mb-8 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium tracking-widest text-[#1a1aad]">무료 상담</span>
            <h2 className="text-[26px] font-bold tracking-tight text-black md:text-4xl mb-3" style={{ wordBreak: "keep-all" }}>지금 바로 플랜 상담 받아보세요</h2>
            <p className="text-sm text-gray-500" style={{ wordBreak: "keep-all" }}>사회복지사 2급 전담 담당자가 내 상황에 맞는 최단 경로를 바로 설계해드립니다</p>
            <p className="text-xs text-gray-400 mt-2">평일 09:00 ~ 22:00 / 주말 10:00 ~ 18:00</p>
          </div>

          <Link
            href="/apply"
            className="flex w-full items-center justify-center gap-2 rounded-xl py-4 text-base font-bold mb-8"
            style={{ background: NAVY, color: "#fff" }}
          >
            무료 상담 신청하기 →
          </Link>

          <div style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", background: "#fff" }}>
            <div style={{ background: "#F8F9FA", padding: "12px 16px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #e5e7eb" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#EF4444", display: "inline-block", flexShrink: 0, animation: "pulseDot 1.4s ease-in-out infinite" }} />
              <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>실시간 상담 현황</span>
            </div>
            <div style={{ maxHeight: 260, overflow: "hidden" }}>
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
                  <div key={i} style={{ display: "grid", gridTemplateColumns: "46px 64px 1fr", gap: 6, padding: "9px 14px", borderBottom: "1px solid #f3f4f6", alignItems: "center", background: row.today ? "#FFFBEB" : "#fff" }}>
                    <span style={{ fontSize: 11, color: "#888", display: "flex", alignItems: "center", gap: 3 }}>
                      {row.today && <span style={{ fontSize: 8 }}>🔴</span>}
                      {row.date}
                    </span>
                    <span style={{ fontSize: 10, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "2px 6px", borderRadius: 20, textAlign: "center", whiteSpace: "nowrap" }}>{row.type}</span>
                    <span style={{ fontSize: 12, color: "#444", lineHeight: 1.45, wordBreak: "keep-all" }}>{row.content}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. 하단 CTA ── */}
      <section className="py-16 md:py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-[22px] font-extrabold text-white md:text-3xl" style={{ wordBreak: "keep-all" }}>
            산후파견업 대표,<br className="sm:hidden" /> 오늘 첫 발을 내딛으세요
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.65)", wordBreak: "keep-all" }}>
            전담 담당자가 자격증 취득부터 창업까지 1:1로 함께합니다
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/apply"
              className="block w-full rounded-full px-8 py-4 text-base font-bold text-center transition-transform hover:scale-105 active:scale-95 sm:inline-block sm:w-auto"
              style={{ background: "#FFFFFF", color: NAVY }}
            >
              무료 상담 신청하기 →
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
