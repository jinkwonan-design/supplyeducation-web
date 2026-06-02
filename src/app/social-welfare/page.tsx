"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, Users, Baby } from "lucide-react";

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
    q: "두 자격증을 동시에 취득할 수 있나요?",
    a: "네, 겹치는 과목을 활용하면 동시 취득이 가능합니다. 전담 컨설턴트가 최적의 플랜을 설계해드립니다.",
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

/* ── 과목 항목 ── */
function SubjectItem({ text }: { text: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{text}</span>
    </div>
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
      <section
        className="relative flex min-h-screen flex-col justify-center"
        style={{ background: "linear-gradient(135deg, #1a1aad 0%, #0d0d7a 100%)" }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "radial-gradient(ellipse at 70% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6" style={{ zIndex: 2 }}>
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            >
              사회복지사 2급 · 보육교사 2급 취득 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">복잡한 사회복지사·보육교사 취득방법</span>
              <span className="block mt-2">가장 쉽고, 가장 빠르게</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              시험 없이 과목 이수만으로 취득하는 국가공인 자격증
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "최소 1년", label: "취득 기간" },
                { value: "약 150만원~", label: "총 비용" },
                { value: "시험 없음", label: "합격률" },
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
            <div style={{ borderRadius: 20, border: "1.5px solid " + NAVY, overflow: "hidden" }}>
              <div style={{ background: NAVY, padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Users size={24} color="#fff" />
                </div>
                <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 10 }}>
                  국가공인 자격증
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: "#fff" }}>사회복지사 2급</h3>
              </div>
              <div style={{ padding: "22px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전문대졸 이상: <strong>17과목</strong> 이수</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>고졸: <strong>27과목</strong> 이수 (전문학사 병행)</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>현장실습 <strong>160시간</strong> 포함</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>취득 기간: <strong>약 1년</strong> (전문대졸 기준)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 보육교사 2급 카드 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#EEF2FF", padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Baby size={24} color="#fff" />
                </div>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 10 }}>
                  국가공인 자격증
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY }}>보육교사 2급</h3>
              </div>
              <div style={{ padding: "22px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>총 <strong>17과목</strong> 이수 필요</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>이론 8과목 + 대면 8과목 + 실습 1과목</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>대면 과목 <strong>오프라인 출석</strong> 필요</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>총 비용: <strong>약 210만원</strong></span>
                  </div>
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
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>사회복지사 2급</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>이수 과목 안내</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>전공필수 10과목 + 전공선택 7과목 이상 = 총 17과목 (전문대졸 기준)</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 전공필수 */}
                <div style={{ background: "#F8F9FA", borderRadius: 16, padding: "22px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: NAVY }} />
                    <p style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>전공필수 10과목</p>
                  </div>
                  {[
                    "사회복지학개론",
                    "사회복지법제와실천",
                    "사회복지실천기술론",
                    "사회복지실천론",
                    "사회복지정책론",
                    "사회복지조사론",
                    "사회복지행정론",
                    "인간행동과사회환경",
                    "지역사회복지론",
                    "사회복지 현장실습 (160시간)",
                  ].map((s) => <SubjectItem key={s} text={s} />)}
                </div>

                {/* 전공선택 */}
                <div style={{ background: "#F8F9FA", borderRadius: 16, padding: "22px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#15803D" }} />
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#15803D" }}>전공선택 7과목 이상</p>
                  </div>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                    사회복지 관련 선택과목 중 7과목 이상을 자유롭게 선택해 이수합니다.
                    전담 컨설턴트가 시간표 설계를 도와드립니다.
                  </p>
                </div>
              </div>

              {/* 학력별 비교 */}
              <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 16 }}>학력별 과정 비교</p>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#F8F9FA" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>학력</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>총 과목 수</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>예상 기간</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>예상 비용</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>전문대졸 이상</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>17과목</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>약 1년</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#15803D", fontWeight: 600 }}>약 150만원</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>고졸</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>27과목</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>약 1.5~2년</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#15803D", fontWeight: 600 }}>약 200~250만원</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 보육교사 2급 탭 */}
          {activeTab === "보육교사 2급" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>보육교사 2급</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>이수 과목 안내</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>이론 8과목 + 대면 8과목 + 실습 1과목 = 총 17과목</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 이론 과목 */}
                <div style={{ background: "#F8F9FA", borderRadius: 16, padding: "22px 22px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: NAVY }} />
                    <p style={{ fontSize: 14, fontWeight: 700, color: NAVY }}>이론과목 (8과목)</p>
                  </div>
                  <p style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>7.5만원/과목 · 100% 온라인</p>
                  {[
                    "보육학개론",
                    "보육과정",
                    "영유아발달",
                    "영유아교수방법론",
                    "놀이지도",
                    "언어지도",
                    "아동음악 (아동동작/아동미술)",
                    "아동수학지도 (아동과학지도)",
                  ].map((s) => <SubjectItem key={s} text={s} />)}
                </div>

                {/* 대면 과목 */}
                <div style={{ background: "#FFF7ED", borderRadius: 16, padding: "22px 22px", border: "1px solid #FED7AA" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#C2410C" }} />
                    <p style={{ fontSize: 14, fontWeight: 700, color: "#C2410C" }}>대면과목 (8과목)</p>
                  </div>
                  <p style={{ fontSize: 12, color: "#888", marginBottom: 14 }}>15만원/과목 · 오프라인 출석 필수</p>
                  {[
                    "보육교사(인성)론",
                    "아동권리와복지",
                    "아동안전관리 (아동생활지도)",
                    "아동관찰및행동연구",
                    "아동건강교육",
                    "영유아사회정서지도",
                    "아동문학교육",
                    "보육실습 (240시간, 30만원)",
                  ].map((s) => (
                    <div key={s} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{s}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* 비용 안내 배너 */}
              <div
                style={{
                  background: "#EEF2FF",
                  borderRadius: 14,
                  padding: "18px 22px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20 }}>💰</span>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 4 }}>총 예상 비용 약 210만원</p>
                  <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                    이론 8과목 × 7.5만원 + 대면 8과목 × 15만원 + 실습 30만원
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 동시 취득 안내 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
            동시 취득
          </span>
          <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-6">
            두 자격증, 동시에 취득할 수 있어요
          </h2>
          <p className="text-base text-gray-600 leading-relaxed mb-10" style={{ wordBreak: "keep-all" }}>
            사회복지사와 보육교사는 겹치는 과목이 있어<br />
            플랜을 잘 설계하면 시간과 비용을 아낄 수 있습니다.<br />
            전담 컨설턴트가 최적의 조합을 설계해드립니다.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: "⏱️", title: "기간 단축", desc: "겹치는 과목 동시 이수로 총 기간 단축" },
              { icon: "💸", title: "비용 절감", desc: "중복 과목 줄여 전체 비용 최소화" },
              { icon: "🎯", title: "1:1 플랜 설계", desc: "전담 컨설턴트가 최적 조합 안내" },
            ].map((item) => (
              <div key={item.title} style={{ background: "#F8F9FA", borderRadius: 16, padding: "24px 20px", textAlign: "center" }}>
                <p style={{ fontSize: 28, marginBottom: 10 }}>{item.icon}</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 6 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
          <Link
            href="/apply"
            className="inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
            style={{ background: NAVY, color: "#FFFFFF" }}
          >
            동시 취득 플랜 상담하기 →
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

      {/* ── 푸터 ── */}
      <footer className="border-t bg-white py-8" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div
          className="mx-auto max-w-6xl px-4 md:px-6 text-center text-xs"
          style={{ color: "rgba(0,0,0,0.4)" }}
        >
          <p className="font-semibold" style={{ color: "rgba(0,0,0,0.6)" }}>서플라이에듀케이션</p>
          <p className="mt-1">© {new Date().getFullYear()} Supply Education. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
