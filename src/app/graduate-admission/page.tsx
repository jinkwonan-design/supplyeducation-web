"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronDown, GraduationCap, BookOpen, Monitor } from "lucide-react";

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
    q: "대졸자전형으로 입학하면 일반 재학생과 차이가 있나요?",
    a: "차이가 없습니다. 대졸자전형으로 입학해도 동일한 학적을 유지하며, 졸업 시 동일한 학위증이 수여됩니다. 편입 후 남은 학기를 이수하면 정상적으로 졸업하게 됩니다.",
  },
  {
    q: "사이버대와 방통대, 어떤 차이가 있나요?",
    a: "사이버대는 100% 온라인 수업으로 유연성이 높고, 방통대(방송통신대학교)는 온라인 수업과 오프라인 출석수업이 병행됩니다. 직장인에게는 사이버대가 더 편하고, 국립대 학위가 목표라면 방통대가 유리합니다.",
  },
  {
    q: "학점은행제 학점으로 편입할 수 있나요?",
    a: "네, 학점은행제를 통해 취득한 학점이 일정 기준 이상이면 사이버대·방통대 3학년 편입이 가능합니다. 전문대졸 또는 전문학사 학위를 취득한 경우 편입자격을 갖추게 됩니다.",
  },
  {
    q: "편입 후 졸업까지 얼마나 걸리나요?",
    a: "3학년 편입 기준 2년 이상 재학해야 졸업이 가능합니다. 대부분의 사이버대·방통대는 학기당 이수 학점 제한이 있으므로, 실제로는 2~2.5년 정도 소요됩니다.",
  },
  {
    q: "대졸자전형이 왜 유리한가요?",
    a: "이미 학사학위를 보유하고 있는 분이 새로운 전공을 추가로 취득하고 싶을 때 유리합니다. 학점은행제와 달리 정규 대학의 학적을 유지하면서 전공 심화 공부가 가능하며, 대학원 진학 시 정규 대학 졸업 이력이 중요할 수 있습니다.",
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
        <p className="text-sm text-gray-500 mb-10">대졸자전형 편입에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
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
export default function GraduateAdmissionPage() {
  const [activeTab, setActiveTab] = useState<"사이버대" | "방통대">("사이버대");
  const tabs: Array<"사이버대" | "방통대"> = ["사이버대", "방통대"];

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
              사이버대 · 방통대 대졸자전형 편입 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">새로운 전공, 더 높은 학위</span>
              <span className="block mt-2">대졸자도 편입이 가능합니다</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              학점은행제 → 사이버대·방통대 3학년 편입, 가장 빠른 경로로 안내해드립니다
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "약 6개월", label: "편입 준비 기간" },
                { value: "약 75만원~", label: "편입 준비 비용" },
                { value: "3학년 편입", label: "편입 학년" },
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

      {/* ── 편입 경로 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              편입 경로
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              어떤 경로로 편입하나요?
            </h2>
            <p className="text-sm text-gray-500">학점은행제로 편입 자격을 먼저 갖추고, 사이버대·방통대에 지원합니다</p>
          </div>

          {/* 3단계 흐름 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {[
              {
                step: "STEP 1",
                icon: <BookOpen size={22} color="#fff" />,
                title: "학점은행제 학점 취득",
                desc: "80학점 이상 취득 후 전문학사 학위 취득. 이미 전문대를 졸업하셨다면 이 단계는 건너뛸 수 있어요.",
                period: "약 6개월~",
                cost: "약 75만원~",
              },
              {
                step: "STEP 2",
                icon: <GraduationCap size={22} color="#fff" />,
                title: "편입 지원 및 합격",
                desc: "전문학사 학위 취득 후 사이버대 또는 방통대 3학년 편입 지원. 대부분의 학교는 별도 시험 없이 학력 기준으로 합격합니다.",
                period: "원서 접수 기간",
                cost: "학교별 입학금",
              },
              {
                step: "STEP 3",
                icon: <Monitor size={22} color="#fff" />,
                title: "온라인으로 졸업",
                desc: "편입 후 온라인 수업으로 남은 과정 이수. 직장 병행이 가능하며 2년 이수 후 학사 학위 취득.",
                period: "2년~",
                cost: "학교별 등록금",
              },
            ].map((item, i) => (
              <div key={item.step} style={{ background: "#F8F9FA", borderRadius: 18, padding: "28px 24px", position: "relative" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: NAVY, background: "#EEF2FF", padding: "2px 10px", borderRadius: 20 }}>{item.step}</span>
                </div>
                <p style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 10 }}>{item.title}</p>
                <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 14 }}>{item.desc}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 12, color: "#555", background: "#fff", border: "1px solid #e5e7eb", padding: "4px 10px", borderRadius: 20 }}>기간: {item.period}</span>
                  <span style={{ fontSize: 12, color: "#555", background: "#fff", border: "1px solid #e5e7eb", padding: "4px 10px", borderRadius: 20 }}>비용: {item.cost}</span>
                </div>
                {i < 2 && (
                  <div style={{ display: "none" }} className="md:block absolute top-1/2 -right-4 z-10 transform -translate-y-1/2 text-gray-300 text-xl font-bold">→</div>
                )}
              </div>
            ))}
          </div>

          {/* 안내 배너 */}
          <div style={{ background: "#EEF2FF", borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>🎓</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 4 }}>이미 대졸자라면 대학원 준비에도 활용 가능</p>
              <p style={{ fontSize: 13, color: "#555", lineHeight: 1.7 }}>
                기존 학사 학위와 다른 전공을 추가하거나, 대학원 진학을 위한 정규 대학 이력이 필요한 경우 사이버대·방통대 편입이 좋은 선택이 됩니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 사이버대 vs 방통대 비교 탭 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              학교 비교
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              사이버대 vs 방통대, 어디가 맞을까요?
            </h2>
            <p className="text-sm text-gray-500">목표와 생활 패턴에 따라 더 맞는 학교가 다릅니다</p>
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

          {/* 사이버대 탭 */}
          {activeTab === "사이버대" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>사이버대학교</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>주요 특징</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div style={{ background: "#F8F9FA", borderRadius: 14, padding: "22px" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 12 }}>장점</p>
                  <SubjectItem text="수업 100% 온라인 — 출석 불필요" />
                  <SubjectItem text="직장 병행에 최적화" />
                  <SubjectItem text="학기당 수강 과목 수 유연하게 조절" />
                  <SubjectItem text="다양한 전공 선택 가능 (경영, IT, 사회복지 등)" />
                  <SubjectItem text="사립대학교 학사 학위 취득" />
                </div>
                <div style={{ background: "#F8F9FA", borderRadius: 14, padding: "22px" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#C2410C", marginBottom: 12 }}>주의사항</p>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>방통대 대비 등록금이 다소 높을 수 있음</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>학교마다 인지도 차이가 있음</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>학교별 지원 시기 확인 필요</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 12 }}>이런 분께 추천</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["직장을 다니면서 학위를 취득하고 싶은 분", "오프라인 출석이 어려운 분", "유연한 수강 일정이 필요한 분"].map((s) => (
                  <div key={s} style={{ background: "#EEF2FF", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: NAVY, fontWeight: 500 }}>{s}</div>
                ))}
              </div>
            </div>
          )}

          {/* 방통대 탭 */}
          {activeTab === "방통대" && (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>한국방송통신대학교</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>주요 특징</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div style={{ background: "#F8F9FA", borderRadius: 14, padding: "22px" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: NAVY, marginBottom: 12 }}>장점</p>
                  <SubjectItem text="국립대학교 — 높은 신뢰도와 인지도" />
                  <SubjectItem text="연간 등록금 약 50~70만원 수준으로 매우 저렴" />
                  <SubjectItem text="공무원 시험 응시 시 가산점 학교로 인정" />
                  <SubjectItem text="전국 13개 지역대학, 지원 시스템 체계적" />
                  <SubjectItem text="졸업장에 방송통신대학교 명기" />
                </div>
                <div style={{ background: "#F8F9FA", borderRadius: 14, padding: "22px" }}>
                  <p style={{ fontSize: 14, fontWeight: 700, color: "#C2410C", marginBottom: 12 }}>주의사항</p>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>일부 과목 오프라인 출석수업 필수</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>학기 시작 시기가 정해져 있어 유연성 낮음</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 8 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#C2410C", flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공 선택의 폭이 사이버대보다 제한적</span>
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 12 }}>이런 분께 추천</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {["국립대학교 졸업장이 필요한 분", "공무원·공공기관 취업을 준비하는 분", "등록금을 최소화하고 싶은 분"].map((s) => (
                  <div key={s} style={{ background: "#EEF2FF", borderRadius: 10, padding: "10px 14px", fontSize: 13, color: NAVY, fontWeight: 500 }}>{s}</div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 비교 테이블 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              한 눈에 비교
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              사이버대 vs 방통대 비교표
            </h2>
          </div>

          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ background: "#F8F9FA" }}>
                  <th style={{ padding: "14px 16px", textAlign: "left", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>항목</th>
                  <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, color: NAVY, borderBottom: "2px solid #e5e7eb" }}>사이버대학교</th>
                  <th style={{ padding: "14px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>방송통신대학교</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "학교 구분", cyber: "사립대학교", kornu: "국립대학교" },
                  { label: "수업 방식", cyber: "100% 온라인", kornu: "온라인 + 오프라인 출석" },
                  { label: "연간 등록금", cyber: "약 200~400만원", kornu: "약 50~70만원" },
                  { label: "편입 학년", cyber: "3학년", kornu: "3학년" },
                  { label: "졸업 소요기간", cyber: "2년 이상", kornu: "2년 이상" },
                  { label: "전공 다양성", cyber: "매우 다양", kornu: "제한적" },
                  { label: "직장 병행", cyber: "매우 용이", kornu: "다소 어려울 수 있음" },
                ].map((row, i) => (
                  <tr key={row.label} style={{ borderBottom: "1px solid #f0f0f0", background: i % 2 === 0 ? "#fff" : "#FAFAFA" }}>
                    <td style={{ padding: "12px 16px", color: "#555", fontWeight: 600 }}>{row.label}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 500 }}>{row.cyber}</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>{row.kornu}</td>
                  </tr>
                ))}
              </tbody>
            </table>
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
