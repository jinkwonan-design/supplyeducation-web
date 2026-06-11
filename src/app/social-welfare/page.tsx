"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Footer from "@/components/Footer";
import PracticumMapBg from "@/components/hero/PracticumMapBg";

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

/* ── FAQ ── */
const faqs = [
  {
    q: "사회복지사 2급 취득에 시험이 있나요?",
    a: "아니요, 별도의 국가시험 없이 과목 이수만으로 취득 가능합니다. 전공필수 10과목과 전공선택 7과목을 이수하면 자격증이 발급됩니다.",
  },
  {
    q: "보육교사 대면 과목은 어떻게 진행되나요?",
    a: "대면 8과목은 각 과목당 8시간씩 가까운 교육장에 1회 방문하시면 됩니다. 전국 각지에 교육장이 있어 접근이 어렵지 않아요.",
  },
  {
    q: "직장을 다니면서도 가능한가요?",
    a: "네, 이론 과목은 100% 온라인으로 진행됩니다. 대면 과목은 주말 일정으로 조율 가능해서 직장인도 충분히 병행할 수 있어요.",
  },
  {
    q: "고졸인데 사회복지사 취득이 가능한가요?",
    a: "가능합니다. 고졸의 경우 전문학사 취득과 사회복지사 과정을 병행하는 방식으로 진행됩니다. 기간은 1.5~2년 정도 소요됩니다.",
  },
  {
    q: "두 자격증을 모두 취득할 수 있나요?",
    a: "두 자격증을 순차적으로 취득할 수 있습니다. 중복 과목을 활용하면 시간과 비용을 줄일 수 있어요. 전담 컨설턴트가 최적의 플랜을 설계해드립니다.",
  },
];

function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);
  return (
    <section className="w-full bg-[#F8F9FA] py-20 px-6">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
          자주 묻는 질문
        </span>
        <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-2">궁금한 점이 있으신가요?</h2>
        <p className="text-sm text-gray-500 mb-10">사회복지사·보육교사 취득에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
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
  const [activeTab, setActiveTab] = useState<"사회복지사 2급" | "보육교사 2급">("사회복지사 2급");
  const tabs: Array<"사회복지사 2급" | "보육교사 2급"> = ["사회복지사 2급", "보육교사 2급"];

  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      <Navbar />

      {/* ── 히어로 섹션 ── */}
      <section className="relative flex min-h-screen flex-col justify-center">
        <PracticumMapBg variant="social-worker" />
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6" style={{ zIndex: 2 }}>
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            >
              사회복지사 2급 · 보육교사 2급 취득 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              반값 광고에 속지 마세요.<br />
              국가자격증 취득의 핵심은<br />
              <span style={{ color: "#2DD4BF" }}>[실습연계]</span>입니다
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.9 }}>
              내 집 근처 실습 100% 안심 매칭<br />
              중간에 포기할 일 없는 확실한 가이드
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

      {/* ── 두 과정 소개 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              과정 소개
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              어떤 자격증을 취득할까요?
            </h2>
            <p className="text-sm text-gray-500">두 자격증 모두 시험 없이 과목 이수만으로 취득 가능합니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 사회복지사 2급 카드 */}
            <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div style={{ position: "relative", height: "260px" }}>
                <Image
                  src="/images/social-worker.webp"
                  alt="사회복지사"
                  fill
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 12 }}>사회복지사 2급</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>전문대졸 이상: <strong>17과목</strong> 이수</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>고졸: <strong>27과목</strong> 이수 (전문학사 병행)</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>현장실습 <strong>160시간</strong> 포함</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>취득 기간: <strong>약 1년 반</strong> (전문대졸 기준)</span>
                </div>
              </div>
            </div>

            {/* 보육교사 2급 카드 */}
            <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div style={{ position: "relative", height: "260px" }}>
                <Image
                  src="/images/childcare-teacher.webp"
                  alt="보육교사"
                  fill
                  loading="lazy"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 12 }}>보육교사 2급</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>총 <strong>17과목</strong> 이수 필요</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>이론 8과목 + 대면 8과목 + 실습 1과목</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>대면 과목 <strong>오프라인 출석</strong> 필요</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>취득 기간: <strong>약 1년 반</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 과정별 상세 탭 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              과정별 상세
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              필요한 과목과 비용을 확인하세요
            </h2>
            <p className="text-sm text-gray-500">취득하려는 자격증을 선택해 상세 정보를 확인해보세요</p>
          </div>

          {/* 탭 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32 }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: "10px 22px",
                  borderRadius: 30,
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.2s",
                  background: activeTab === tab ? NAVY : "#ffffff",
                  color: activeTab === tab ? "#ffffff" : "#555",
                  boxShadow: activeTab === tab ? "0 2px 12px rgba(26,26,173,0.25)" : "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 사회복지사 2급 탭 */}
          {activeTab === "사회복지사 2급" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr>
                      <th style={{ width: "35%", padding: "12px 16px", textAlign: "left", fontWeight: 600, background: NAVY, color: "#fff", border: "1px solid #e5e7eb" }}>구분</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, background: NAVY, color: "#fff", border: "1px solid #e5e7eb" }}>내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "자격 요건", value: "전문대졸 이상" },
                      { label: "필수 과목", value: "전공필수 10과목 + 전공선택 7과목" },
                      { label: "현장 실습", value: "160시간 필수" },
                      { label: "취득 기간", value: "약 1년 반 (전문대졸 기준)" },
                      { label: "고졸 기준", value: "자격증 병행 시 약 1년 반, 수업만 시 약 2년" },
                      { label: "취득 방식", value: "별도 시험 없음, 과목 이수만으로 취득" },
                    ].map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? "#ffffff" : "#f8f9fa" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "#333", border: "1px solid #e5e7eb" }}>{row.label}</td>
                        <td style={{ padding: "12px 16px", color: "#333", border: "1px solid #e5e7eb" }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 보육교사 2급 탭 */}
          {activeTab === "보육교사 2급" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
                  <thead>
                    <tr>
                      <th style={{ width: "35%", padding: "12px 16px", textAlign: "left", fontWeight: 600, background: NAVY, color: "#fff", border: "1px solid #e5e7eb" }}>구분</th>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 600, background: NAVY, color: "#fff", border: "1px solid #e5e7eb" }}>내용</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "자격 요건", value: "전문대졸 이상" },
                      { label: "이론 과목", value: "8과목 (온라인)" },
                      { label: "대면 과목", value: "8과목 (오프라인 출석 필수)" },
                      { label: "실습", value: "1과목 (240시간)" },
                      { label: "취득 기간", value: "약 1년 반" },
                      { label: "취득 방식", value: "별도 시험 없음, 과목 이수만으로 취득" },
                    ].map((row, i) => (
                      <tr key={row.label} style={{ background: i % 2 === 0 ? "#ffffff" : "#f8f9fa" }}>
                        <td style={{ padding: "12px 16px", fontWeight: 600, color: "#333", border: "1px solid #e5e7eb" }}>{row.label}</td>
                        <td style={{ padding: "12px 16px", color: "#333", border: "1px solid #e5e7eb" }}>{row.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 중복 과목 안내 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-6">
            두 자격증, 과목이 겹칩니다
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-8" style={{ wordBreak: "keep-all", lineHeight: 1.9 }}>
            사회복지사 2급과 보육교사 2급은 일부 과목이 중복됩니다.<br />
            어차피 들어야 할 과목이라면, 하나를 더 취득하는 게 유리합니다.<br />
            전담 컨설턴트가 중복 과목을 확인하고<br />
            두 자격증을 모두 취득할 수 있는 플랜을 설계해드립니다.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 36 }}>
            {[
              "중복 과목으로 추가 비용 최소화",
              "취업 가능 직군이 2배로 확장",
              "전담 컨설턴트가 최적 조합 설계",
            ].map((text) => (
              <div key={text} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, height: 24, borderRadius: "50%", background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>✓</span>
                </div>
                <span style={{ fontSize: 15, color: "#333", fontWeight: 500 }}>{text}</span>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
            style={{ background: NAVY, color: "#FFFFFF" }}
          >
            중복 과목 확인하고 플랜 짜기 →
          </Link>
        </div>
      </section>

      {/* ── FAQ 섹션 ── */}
      <FAQSection />

      {/* ── 하단 CTA 섹션 ── */}
      <section className="py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            지금 바로 시작하세요
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            전담 컨설턴트가 1:1로 함께합니다
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
