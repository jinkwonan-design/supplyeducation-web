"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Wrench, HardHat } from "lucide-react";

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
    q: "산업기사와 기사, 어떻게 다른가요?",
    a: "산업기사는 41학점 이상(전문대 수준), 기사는 106학점 이상(학사 수준)의 학점을 보유해야 응시할 수 있습니다. 기사가 더 높은 등급으로 취업 시 우대 조건도 더 유리합니다.",
  },
  {
    q: "현재 고졸인데 기사 자격증을 딸 수 있나요?",
    a: "네, 가능합니다. 학점은행제를 통해 필요한 학점을 취득하면 응시자격이 생깁니다. 고졸 기준으로 기사 응시까지 보통 1~1.5년이 소요됩니다.",
  },
  {
    q: "이미 전문대를 졸업했는데 얼마나 추가로 필요한가요?",
    a: "전문대 2년제 졸업자는 80학점을 보유한 것으로 인정됩니다. 기사의 경우 106학점이 필요하므로 추가로 약 26~30학점만 취득하면 됩니다. 약 4~8개월이면 충분합니다.",
  },
  {
    q: "학점은행제 학점이 실제 자격증 시험 응시에 인정되나요?",
    a: "네, 국가기술자격법에 따라 학점은행제 학점은 산업기사·기사 응시 자격으로 완전히 인정됩니다. 한국산업인력공단에서 직접 확인하실 수 있습니다.",
  },
  {
    q: "어떤 종류의 기사 자격증을 취득할 수 있나요?",
    a: "전기기사, 전기산업기사, 정보처리기사, 건설안전기사, 소방설비기사, 산업안전기사 등 다양한 국가기술자격증의 응시자격을 취득할 수 있습니다. 목표 자격증에 따라 최적의 학점 취득 계획을 세워드립니다.",
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
        <p className="text-sm text-gray-500 mb-10">산업기사·기사 응시자격 취득에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
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
export default function NationalCertPage() {
  const [activeTab, setActiveTab] = useState<"산업기사" | "기사">("산업기사");
  const tabs: Array<"산업기사" | "기사"> = ["산업기사", "기사"];

  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      <Navbar />

      {/* ── 히어로 섹션 ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* 풀블리드 배경 이미지 */}
        <Image
          src="/national-cert-hero.png"
          alt="기사 자격증 취득"
          fill
          priority
          className="object-cover object-right"
        />

        {/* 오버레이: social-welfare와 동일한 방식 */}
        <div className="absolute inset-0" style={{ background: "rgba(0, 0, 0, 0.55)" }} />

        {/* 텍스트 콘텐츠 */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6 py-28 md:py-0">
          <div className="max-w-xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            >
              산업기사 · 기사 자격증 응시자격 취득 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">학점만 채우면</span>
              <span className="block mt-2">바로 응시 가능합니다</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              학점은행제로 응시자격을 취득하는 가장 빠른 방법
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "최소 4개월", label: "응시자격 취득 기간" },
                { value: "약 54만원~", label: "최소 비용" },
                { value: "전 종목 가능", label: "지원 자격증 범위" },
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

      {/* ── 자격증 이미지 카드 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              국가기술자격
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              산업기사 · 기사, 어떤 자격증인가요?
            </h2>
            <p className="text-sm text-gray-500">학점은행제로 응시자격을 갖춘 뒤 시험에 합격하면 취득할 수 있는 국가기술자격증입니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 산업기사 카드 */}
            <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                <Image
                  src="/images/industrial-engineer.png"
                  alt="산업기사"
                  fill
                  loading="lazy"
                  style={{ objectFit: "cover", objectPosition: "center 20%", transform: "scale(1.35)", transformOrigin: "center 20%" }}
                />
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 12 }}>산업기사</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>응시자격: <strong>41학점 이상</strong> 보유</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>전문대 2년제 졸업자는 <strong>추가 학점 불필요</strong></span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>고졸 기준 취득 기간: <strong>약 4~8개월</strong></span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>현장 기술직 취업 및 승진 시 <strong>우대</strong></span>
                </div>
              </div>
            </div>

            {/* 기사 카드 */}
            <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
              <div style={{ height: "260px", overflow: "hidden", position: "relative" }}>
                <Image
                  src="/images/engineer.png"
                  alt="기사"
                  fill
                  loading="lazy"
                  style={{ objectFit: "cover", objectPosition: "center 15%", transform: "scale(1.4)", transformOrigin: "center 15%" }}
                />
              </div>
              <div style={{ padding: 24 }}>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 12 }}>기사</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>응시자격: <strong>106학점 이상</strong> 보유</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>전문대 2년제 졸업자: 추가 <strong>약 26학점</strong>만 취득</span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>고졸 기준 취득 기간: <strong>약 1~1.5년</strong></span>
                  <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>산업기사보다 높은 등급, <strong>경력·승급에 유리</strong></span>
                </div>
              </div>
            </div>
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
              어떤 자격증을 목표로 하시나요?
            </h2>
            <p className="text-sm text-gray-500">필요한 학점 수에 따라 소요 기간과 비용이 달라집니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 산업기사 카드 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#EEF2FF", padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Wrench size={24} color="#fff" />
                </div>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 10 }}>
                  국가기술자격
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY }}>산업기사</h3>
              </div>
              <div style={{ padding: "22px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>응시자격: <strong>41학점 이상</strong> 보유</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전문대졸의 경우 조건 충족 가능성 높음</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>고졸: <strong>최소 4~8개월</strong> 학점 취득</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>예상 비용: <strong>약 54만원~</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* 기사 카드 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#EEF2FF", padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <HardHat size={24} color="#fff" />
                </div>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 10 }}>
                  국가기술자격
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY }}>기사</h3>
              </div>
              <div style={{ padding: "22px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>응시자격: <strong>106학점 이상</strong> 보유</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전문대 2년제 졸업: 추가 <strong>약 26학점</strong> 필요</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>고졸: <strong>약 1~1.5년</strong> 학점 취득</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15803D", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>예상 비용: <strong>약 54~130만원</strong></span>
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
              학력별 플랜
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              내 학력에 맞는 플랜을 확인하세요
            </h2>
            <p className="text-sm text-gray-500">목표 자격증을 선택해 상세 정보를 확인해보세요</p>
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

          {/* 산업기사 탭 */}
          {activeTab === "산업기사" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>산업기사</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>학력별 필요 학점</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>응시자격 기준 41학점 이상 보유 필요</p>

              <div style={{ overflowX: "auto", marginBottom: 28 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#F8F9FA" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>현재 학력</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>보유 학점</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>추가 필요</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>예상 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>고졸</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>0학점</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>41학점</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>약 4~8개월</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>전문대졸 2년제</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>80학점</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#15803D", fontWeight: 700 }}>조건 충족</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>추가 불필요</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>4년제 대졸</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>전공 관련 여부에 따라 상이</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>상담 필요</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>상담 후 확인</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>대학 중퇴</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>보유학점에 따라 상이</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>상담 필요</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>상담 후 확인</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 취득 가능 자격증 목록 */}
              <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 16 }}>취득 가능한 주요 산업기사</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["전기산업기사", "정보처리산업기사", "건설안전산업기사", "소방설비산업기사(전기·기계)", "산업안전산업기사", "화학분석기사"].map((cert) => (
                  <div key={cert} style={{ background: "#F8F9FA", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: "#333", fontWeight: 500 }}>
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 기사 탭 */}
          {activeTab === "기사" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>기사</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>학력별 필요 학점</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>응시자격 기준 106학점 이상 보유 필요</p>

              <div style={{ overflowX: "auto", marginBottom: 28 }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#F8F9FA" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>현재 학력</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>보유 학점</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>추가 필요</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>예상 기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>고졸</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>0학점</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>106학점</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>약 1~1.5년</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>전문대졸 2년제</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>80학점</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>26학점</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>약 4개월</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>전문대졸 3년제</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>120학점</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#15803D", fontWeight: 700 }}>조건 충족</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>추가 불필요</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>4년제 대졸</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>전공 관련 여부에 따라 상이</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>상담 필요</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>상담 후 확인</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>대학 중퇴·재학</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>보유학점에 따라 상이</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>상담 필요</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>상담 후 확인</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* 취득 가능 자격증 목록 */}
              <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 16 }}>취득 가능한 주요 기사</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {["전기기사", "정보처리기사", "건설안전기사", "소방설비기사(전기·기계)", "산업안전기사", "품질경영기사"].map((cert) => (
                  <div key={cert} style={{ background: "#EEF2FF", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: NAVY, fontWeight: 600 }}>
                    {cert}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 학점 취득 방법 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              학점 취득 방법
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              3가지 방법으로 학점을 빠르게
            </h2>
            <p className="text-sm text-gray-500">병행하면 더 빨리, 더 저렴하게 응시자격을 취득할 수 있어요</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: "💻",
                title: "온라인 강의",
                badge: "과목당 9만원",
                badgeColor: NAVY,
                items: ["원하는 시간에 수강", "학기당 최대 7과목", "모바일/PC 모두 가능"],
              },
              {
                icon: "📋",
                title: "자격증 학점 인정",
                badge: "최대 18학점",
                badgeColor: "#15803D",
                items: ["매경TEST S·1급 → 18학점", "한경TESAT S·1급 → 18학점", "기타 자격증도 학점 인정"],
              },
              {
                icon: "📝",
                title: "독학사",
                badge: "과목당 약 2~3만원",
                badgeColor: "#C2410C",
                items: ["시험 통과 시 학점 인정", "비용이 가장 저렴", "병행 시 기간 단축 효과"],
              },
            ].map((item) => (
              <div key={item.title} style={{ background: "#F8F9FA", borderRadius: 18, padding: "28px 24px" }}>
                <p style={{ fontSize: 32, marginBottom: 12 }}>{item.icon}</p>
                <div style={{ display: "inline-block", background: item.badgeColor, color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 12 }}>
                  {item.badge}
                </div>
                <p style={{ fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 14 }}>{item.title}</p>
                <div>
                  {item.items.map((s) => <SubjectItem key={s} text={s} />)}
                </div>
              </div>
            ))}
          </div>
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
