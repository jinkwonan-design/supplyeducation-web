"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { Monitor, Award, BookOpen } from "lucide-react";

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
/* ── 메인 페이지 ── */
export default function SportsPage() {
  const [activeTab, setActiveTab] = useState<"전문학사" | "학사" | "타전공">("전문학사");
  const [activeTransferTab, setActiveTransferTab] = useState<"실기 전형" | "비실기 전형" | "대학원">("실기 전형");

  const [planName, setPlanName] = useState("");
  const [planPhone, setPlanPhone] = useState("");
  const [planEducation, setPlanEducation] = useState("");
  const [planMessage, setPlanMessage] = useState("");
  const [planAgree, setPlanAgree] = useState(false);
  const [planSubmitting, setPlanSubmitting] = useState(false);
  const [planSubmitDone, setPlanSubmitDone] = useState(false);

  async function handlePlanSubmit(e: React.FormEvent) {
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
          course: "체육 / 플랜 상담 신청",
          status: planEducation,
          calculatorData: JSON.stringify({
            message: planMessage,
          }),
        }),
      });
      const json = await res.json();
      if (json.success) setPlanSubmitDone(true);
    } catch {
      // 네트워크 오류 무시
    } finally {
      setPlanSubmitting(false);
    }
  }

  const tabs: Array<"전문학사" | "학사" | "타전공"> = ["전문학사", "학사", "타전공"];

  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      <Navbar />

      {/* ── 히어로 섹션 ── */}
      <section
        className="relative flex min-h-screen flex-col justify-center"
        style={{
          backgroundImage: "url('/images/3.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(10, 15, 40, 0.7)",
          }}
        />
        <div className="relative mx-auto w-full max-w-6xl px-4 md:px-6" style={{ zIndex: 2 }}>
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            >
              체육학 학위 취득 안내
            </span>
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">
                <span style={{ backgroundColor: "#1a1aad", color: "#ffffff", padding: "2px 12px" }}>100% 온라인으로</span>
              </span>
              <span className="block mt-2">학원 없이, 시험장 없이</span>
              <span className="block mt-2">체육학 학위까지</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              트레이너부터 편입 준비생까지,<br />
              학점은행제로 최단 경로 설계
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "최단 8개월", label: "전문학사 취득" },
                { value: "100% 온라인", label: "시간·장소 자유" },
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

      {/* ── 타깃 분기 카드 섹션 ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              목적별 안내
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-black md:text-4xl mb-3" style={{ wordBreak: "keep-all" }}>
              어떤 목적으로 오셨나요?
            </h2>
            <p className="text-sm text-gray-500">목적에 따라 최적의 경로가 달라집니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 현직 트레이너 카드 */}
            <div
              className="transition-transform duration-200 ease-in-out hover:-translate-y-1.5"
              style={{
                borderRadius: 20,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="/images/sports-trainer.webp"
                alt="건강운동관리사"
                style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
              />
              <div className="p-5 md:p-8" style={{ background: "#F8F9FA" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111", marginBottom: 8, wordBreak: "keep-all" }}>
                  건강운동관리사
                </h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, wordBreak: "keep-all" }}>
                  전문학사 이상 학위취득 과정
                </p>
              </div>
              <div className="p-5 md:p-8" style={{ background: "#fff", flexGrow: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {[
                    "현장 경력에 공식 학위를 더해 전문성 입증",
                    "건강운동관리사 응시자격 취득 경로 설계",
                    "세미나 수료증이 아닌 국가 공인 자격증 취득",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#111",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2,
                          fontSize: 9,
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: 14, color: "#333", lineHeight: 1.6, wordBreak: "keep-all" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="#trainer-proof"
                  className="inline-block w-full rounded-full py-3 text-sm font-bold text-center transition-opacity hover:opacity-90"
                  style={{ background: "#1a1aad", color: "#fff" }}
                >
                  건강운동관리사 자세히 보기 →
                </Link>
              </div>
            </div>

            {/* 편입·대학원 준비 카드 */}
            <div
              className="transition-transform duration-200 ease-in-out hover:-translate-y-1.5"
              style={{
                borderRadius: 20,
                border: "1px solid #e5e7eb",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <img
                src="/images/sports-transfer.webp"
                alt="편입·대학원 준비"
                style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }}
              />
              <div className="p-5 md:p-8" style={{ background: "#F8F9FA" }}>
                <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111", marginBottom: 8, wordBreak: "keep-all" }}>
                  편입·대학원 준비
                </h3>
                <p style={{ fontSize: 14, color: "#666", lineHeight: 1.6, wordBreak: "keep-all" }}>
                  성적관리 + 학위취득 과정
                </p>
              </div>
              <div className="p-5 md:p-8" style={{ background: "#fff", flexGrow: 1 }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
                  {[
                    "비실기 전형 지원 시 동일계열 학위로 어필",
                    "실기 전형 준비와 학위 취득 병행 가능",
                    "대학원 진학 목적이라면 학사 학위 필요",
                  ].map((t) => (
                    <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: "#111",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 2,
                          fontSize: 9,
                          color: "#fff",
                          fontWeight: 700,
                        }}
                      >
                        ✓
                      </span>
                      <span style={{ fontSize: 14, color: "#333", lineHeight: 1.6, wordBreak: "keep-all" }}>{t}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="#transfer"
                  className="inline-block w-full rounded-full py-3 text-sm font-bold text-center transition-opacity hover:opacity-90"
                  style={{ background: "#1a1aad", color: "#fff" }}
                >
                  편입·대학원 자세히 보기 →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 섹션 3: 건강운동관리사 ── */}
      <section id="trainer" className="w-full bg-white py-12 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          {/* 실제 후기 증거 */}
          <div id="trainer-proof" className="p-6 md:p-12" style={{ background: "#F8F9FA", borderRadius: 20, marginTop: 32 }}>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
                건강운동관리사 취득 과정
              </span>
              <h3
                className="text-2xl font-bold text-black md:text-3xl"
                style={{ wordBreak: "keep-all" }}
              >
                실제 결과로 증명합니다
              </h3>
            </div>

            {/* 인용구 3개 */}
            <div className="flex flex-col items-center mb-10" style={{ gap: 24 }}>
              {[
                { quote: '"회원 등록률이 2배 이상 늘었습니다"', source: "- 무경력 헬스트레이너 이o범 학습자님 -" },
                { quote: '"센터에서 먼저 연락이 오더라구요!"', source: "- 취업 걱정이 많던 김o호 학습자님 -" },
                { quote: '"확실히 건운사가 끝판왕이더라구요!"', source: "- 경력 3년차 트레이너 박o진 학습자님 -" },
              ].map(({ quote, source }) => (
                <div key={quote} className="flex flex-col items-center" style={{ gap: 6 }}>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1a1aad",
                      textAlign: "center",
                      wordBreak: "keep-all",
                      lineHeight: 1.6,
                    }}
                  >
                    {quote}
                  </p>
                  <p style={{ fontSize: 13, color: "#888", textAlign: "center" }}>{source}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* 카톡 후기 */}
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/images/sports-review-kakao.png"
                  alt="카카오톡 후기"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 12,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                    display: "block",
                  }}
                />
                <p style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>직장 다니면서 학위 취득 완료</p>
              </div>
              {/* 자격증 */}
              <div className="flex flex-col items-center gap-4">
                <img
                  src="/images/sports-certificate.png"
                  alt="건강운동관리사 자격증"
                  style={{
                    width: "100%",
                    height: "auto",
                    borderRadius: 12,
                    boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                    display: "block",
                  }}
                />
                <p style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>건강운동관리사 자격증 취득</p>
              </div>
            </div>
            <div className="flex justify-center mt-10">
              <Link
                href="#credit-intro"
                style={{
                  background: "#1a1aad",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "14px 32px",
                  fontSize: 15,
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                건강운동관리사 학점은행제 과정 자세히 보기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 섹션 4: 편입·대학원 ── */}
      <section id="transfer" className="w-full bg-[#F8F9FA] py-12 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div id="transfer-proof" className="p-6 md:p-12" style={{ background: "#fff", borderRadius: 20 }}>
            <div className="text-center mb-10">
              <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
                편입·대학원 준비 과정
              </span>
              <h2
                className="text-2xl font-bold tracking-tight text-black md:text-4xl mb-3"
                style={{ wordBreak: "keep-all" }}
              >
                성적이 가장 중요합니다
              </h2>
            </div>

            {/* 인용구 3개 */}
            <div className="flex flex-col items-center mb-10" style={{ gap: 24 }}>
              {[
                { quote: '"학점은행제 덕분에 목표 대학 편입했습니다!"', source: "- 체대 편입 준비 최o준 학습자님 -" },
                { quote: '"관리 잘 해주셔서 높은 성적 받을 수 있었습니다"', source: "- 비실기 전형 준비 강o민 학습자님 -" },
                { quote: '"실기에만 온전히 집중할 수 있었습니다"', source: "- 대학원 진학 준비 윤o서 학습자님 -" },
              ].map(({ quote, source }) => (
                <div key={quote} className="flex flex-col items-center" style={{ gap: 6 }}>
                  <p
                    style={{
                      fontSize: 16,
                      fontWeight: 700,
                      color: "#1a1aad",
                      textAlign: "center",
                      wordBreak: "keep-all",
                      lineHeight: 1.6,
                    }}
                  >
                    {quote}
                  </p>
                  <p style={{ fontSize: 13, color: "#888", textAlign: "center" }}>{source}</p>
                </div>
              ))}
            </div>

            {/* 이미지 1개 */}
            <div className="flex flex-col items-center gap-4">
              <img
                src="/images/sports-grade.webp"
                alt="실제 학습자 성적 인증"
                style={{
                  width: "100%",
                  maxWidth: 600,
                  height: "auto",
                  borderRadius: 12,
                  boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                  display: "block",
                }}
              />
              <p style={{ fontSize: 13, color: "#555", fontWeight: 600 }}>실제 학습자 성적 인증 (4.5/4.5 만점)</p>
            </div>

            {/* 편입 유형 탭 */}
            <div style={{ marginTop: 40, marginBottom: 32, position: "relative", zIndex: 20, pointerEvents: "auto" }}>
              <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 24, pointerEvents: "auto" }}>
                {(["실기 전형", "비실기 전형", "대학원"] as const).map((tab) => (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTransferTab(tab)}
                    onTouchEnd={(e) => { e.preventDefault(); setActiveTransferTab(tab); }}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      position: "relative",
                      zIndex: 20,
                      padding: "10px 22px",
                      minHeight: 44,
                      minWidth: 44,
                      borderRadius: 30,
                      fontSize: 14,
                      fontWeight: 600,
                      border: "none",
                      outline: "none",
                      cursor: "pointer",
                      touchAction: "manipulation",
                      WebkitTapHighlightColor: "transparent",
                      WebkitAppearance: "none",
                      appearance: "none",
                      userSelect: "none",
                      pointerEvents: "auto",
                      transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                      background: activeTransferTab === tab ? NAVY : "#ffffff",
                      color: activeTransferTab === tab ? "#ffffff" : "#555",
                      boxShadow: activeTransferTab === tab ? "0 2px 12px rgba(26,26,173,0.25)" : "0 1px 4px rgba(0,0,0,0.08)",
                    }}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {activeTransferTab === "실기 전형" && (
                <div className="p-4 md:p-7" style={{ background: "#F8F9FA", borderRadius: 16 }}>
                  <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 20, wordBreak: "keep-all" }}>
                    체대 편입 준비생의 90%가 선택하는 전형. <strong>실기 성적 + 학교 성적</strong>으로 평가합니다.
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 10 }}>주요 실기 종목</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
                    {[
                      "제자리 멀리뛰기 (모든 학교 공통, 가장 중요)",
                      "사이드 스텝",
                      "20M 왕복달리기",
                      "서전트 (제자리 점프)",
                      "유연성 (윗몸 앞으로 굽히기)",
                      "메디신 볼 (공 멀리 던지기)",
                      "배구 스킬 테스트",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ background: "#EEF2FF", borderRadius: 10, padding: "14px 18px", marginBottom: 14 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 6 }}>난이도 순서</p>
                    <p style={{ fontSize: 13, color: "#444" }}>세종대·중앙대(안성) → 한체대·단국대 → 삼육대</p>
                  </div>
                  <div style={{ background: "#fff", borderRadius: 10, padding: "14px 18px", border: "1px solid #e5e7eb" }}>
                    <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7, wordBreak: "keep-all" }}>
                      동일계열 학위 병행 시 성적 부분에서 유리하며, 학점은행제로 학위를 준비하면서 실기도 함께 병행할 수 있습니다.
                    </p>
                  </div>
                </div>
              )}

              {activeTransferTab === "비실기 전형" && (
                <div className="p-4 md:p-7" style={{ background: "#F8F9FA", borderRadius: 16 }}>
                  <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 20, wordBreak: "keep-all" }}>
                    부상이나 실기 부담으로 실기 전형 대신 선택하는 전형. <strong>영어 + 성적 or 성적 + 면접</strong>으로 평가합니다.
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      "동일계열 학위 보유 시 면접에서 강력하게 어필 가능",
                      "경희대 제외 대부분 학교에서 편입 학점 인정",
                      "학점은행제로 단기간(고졸 1~1.5년, 전문대졸 1년) 동일계열 학위 취득 가능",
                      "높은 학점 관리가 핵심 → 학점은행제 수업은 상대적으로 높은 학점 받기 유리",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6, wordBreak: "keep-all" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTransferTab === "대학원" && (
                <div className="p-4 md:p-7" style={{ background: "#F8F9FA", borderRadius: 16 }}>
                  <p style={{ fontSize: 14, color: "#444", lineHeight: 1.8, marginBottom: 20, wordBreak: "keep-all" }}>
                    체육 관련 석사 학위 취득으로 <strong>전문성·취업·교원자격증 취득</strong>을 목적으로 합니다.
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#111", marginBottom: 12 }}>주요 진학 목적</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    {[
                      "체육 교사 희망 → 교육대학원(체육교육전공) → 정교사 2급 자격증 취득",
                    ].map((item) => (
                      <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 8 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 7 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6, wordBreak: "keep-all" }}>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-center mt-10">
              <Link
                href="#credit-intro"
                style={{
                  background: "#1a1aad",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "14px 32px",
                  fontSize: 15,
                  fontWeight: 700,
                  display: "inline-block",
                }}
              >
                편입·대학원 학점은행제 과정 자세히 보기 →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── 학점 취득 구조 섹션 ── */}
      <section id="credit-intro" className="w-full bg-white py-12 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              학점 취득 방법
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-black md:text-4xl mb-3">
              학점은행제, 처음이시라구요?
            </h2>
            <p className="text-sm text-gray-500">세 가지 방법을 조합해 가장 빠르고 저렴하게 학위를 취득할 수 있습니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {/* 온라인 수업 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "#fff", padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Monitor size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>온라인 수업</h3>
                <p style={{ fontSize: 13, color: "#555" }}>체육학 전용 온라인 강의</p>
              </div>
              <div style={{ padding: "20px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>과목당 <strong>3학점</strong> 인정</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>시간·장소 제약 없이 수강</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>체육학 전공 과목 중심</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 자격증 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "#fff", padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <Award size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>자격증</h3>
                <p style={{ fontSize: 13, color: "#555" }}>학점 단축의 핵심 수단</p>
              </div>
              <div style={{ padding: "20px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>생활스포츠지도사 2급 → <strong>6학점</strong> 인정</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>스포츠경영관리사 → <strong>20학점</strong> 인정</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>수업 없이 학점을 채울 수 있는 유일한 방법</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 기존 학점 활용 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "#fff", padding: "28px 24px 20px" }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <BookOpen size={24} color="#fff" />
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: "#111", marginBottom: 4 }}>기존 학점 활용</h3>
                <p style={{ fontSize: 13, color: "#555" }}>내가 가진 학점을 그대로</p>
              </div>
              <div style={{ padding: "20px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>이전 대학 학점 최대 <strong>140학점</strong> 인정</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>보유 자격증 학점 인정</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                    <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>보유 학점이 많을수록 기간 단축</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 안내 배너 */}
          <div
            style={{
              background: "#F8F9FA",
              borderRadius: 14,
              padding: "16px 24px",
              display: "flex",
              alignItems: "center",
              gap: 12,
              border: "1px solid #e5e7eb",
            }}
          >
            <span style={{ fontSize: 20 }}>🎓</span>
            <p style={{ fontSize: 14, color: "#444", lineHeight: 1.6 }}>
              체육학 학점은행제 과정은 조합 방식에 따라 기간과 비용이 크게 달라집니다.{" "}
              <strong>내 상황에 맞는 최적 경로는 무료 상담으로 확인하세요.</strong>
            </p>
          </div>

          {/* 자격증 안내 */}
          <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY, marginTop: 48, marginBottom: 24, wordBreak: "keep-all" }}>
            체육 관련 학위 취득 시 알아두면 무조건 좋은 자격증!
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* 생활스포츠지도사 2급 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "#fff", padding: "28px 24px 20px" }}>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20, marginBottom: 14 }}>
                  6학점 인정
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 4 }}>생활스포츠지도사 2급</h3>
              </div>
              <div style={{ padding: "4px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["필기 + 실기 시험", "전문학사 전공 학점 필수 자격증", "체육 현장에서도 직접 활용 가능"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 스포츠경영관리사 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "#fff", padding: "28px 24px 20px" }}>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20, marginBottom: 14 }}>
                  20학점 인정
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 4 }}>스포츠경영관리사</h3>
              </div>
              <div style={{ padding: "4px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["필기 + 실기 시험", "시험 연 3회 응시 가능", "학사 기간 단축에 가장 효과적"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* TESAT */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
              <div style={{ background: "#fff", padding: "28px 24px 20px" }}>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 12, fontWeight: 700, padding: "3px 12px", borderRadius: 20, marginBottom: 14 }}>
                  일반학점 인정
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, color: "#111", marginBottom: 4 }}>TESAT</h3>
              </div>
              <div style={{ padding: "4px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {["거의 매월 시험 진행", "2~3주 준비로 합격 가능", "일반 선택 학점 부족 시 활용"].map((item, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                      <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 과정별 플랜 섹션 (탭 UI) ── */}
      <section className="w-full bg-[#F8F9FA] py-12 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              과정별 플랜
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-black md:text-4xl mb-3">
              내 목표에 맞는 플랜을 선택하세요
            </h2>
            <p className="text-sm text-gray-500">전문학사·학사·타전공 중 상황에 맞는 경로를 확인해보세요</p>
          </div>

          {/* 탭 */}
          <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 32, position: "relative", zIndex: 20, pointerEvents: "auto" }}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                onTouchEnd={(e) => { e.preventDefault(); setActiveTab(tab); }}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  zIndex: 20,
                  padding: "10px 22px",
                  minHeight: 44,
                  minWidth: 44,
                  borderRadius: 30,
                  fontSize: 14,
                  fontWeight: 600,
                  border: "none",
                  outline: "none",
                  cursor: "pointer",
                  touchAction: "manipulation",
                  WebkitTapHighlightColor: "transparent",
                  WebkitAppearance: "none",
                  appearance: "none",
                  userSelect: "none",
                  pointerEvents: "auto",
                  transition: "background 0.2s, color 0.2s, box-shadow 0.2s",
                  background: activeTab === tab ? NAVY : "#ffffff",
                  color: activeTab === tab ? "#ffffff" : "#555",
                  boxShadow: activeTab === tab ? "0 2px 12px rgba(26,26,173,0.25)" : "0 1px 4px rgba(0,0,0,0.08)",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* 전문학사 탭 */}
          {activeTab === "전문학사" && (
            <div className="p-5 md:p-9" style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>전문학사</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>레저스포츠 전공</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>총 80학점 필요 · 전공 45학점 + 교양 15학점 + 일반 최대 20학점</p>

              {/* 학점 현황 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[
                  { label: "온라인 전공 수업", value: "13개 개설", sub: "39학점 취득 가능", color: NAVY },
                  { label: "부족한 전공 학점", value: "6학점", sub: "자격증으로 채워야 함", color: "#DC2626" },
                  { label: "추천 자격증", value: "생활스포츠지도사 2급", sub: "6학점 인정", color: "#15803D" },
                ].map((item) => (
                  <div key={item.label} style={{ background: "#F8F9FA", borderRadius: 14, padding: "20px 18px", textAlign: "center" }}>
                    <p style={{ fontSize: 11, color: "#888", marginBottom: 6, fontWeight: 600, letterSpacing: "0.05em" }}>{item.label}</p>
                    <p style={{ fontSize: 17, fontWeight: 700, color: item.color, marginBottom: 4 }}>{item.value}</p>
                    <p style={{ fontSize: 12, color: "#666" }}>{item.sub}</p>
                  </div>
                ))}
              </div>

              {/* 예상 일정 */}
              <div style={{ background: "#EEF2FF", borderRadius: 14, padding: "20px 24px", marginBottom: 24 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: NAVY, marginBottom: 12 }}>예상 일정 (약 1년)</p>
                <p style={{ fontSize: 13, color: "#444", lineHeight: 1.7 }}>
                  온라인 수업 2학기 + 자격증 2개 + 독학사 1단계 조합
                </p>
              </div>

              {/* 플랜 표 */}
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr style={{ background: "#F8F9FA" }}>
                      <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>구분</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>1학기</th>
                      <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>2학기</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444" }}>온라인 수업</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>7과목 (21학점)</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>6과목 (18학점)</td>
                    </tr>
                    <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                      <td style={{ padding: "12px 16px", color: "#444" }}>자격증</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#15803D", fontWeight: 600 }}>생활스포츠지도사 2급</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>—</td>
                    </tr>
                    <tr>
                      <td style={{ padding: "12px 16px", color: "#444" }}>독학사</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#C2410C", fontWeight: 600 }}>1단계 (교양)</td>
                      <td style={{ padding: "12px 16px", textAlign: "center", color: "#888" }}>—</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 학사 탭 */}
          {activeTab === "학사" && (
            <div className="p-5 md:p-9" style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>학사</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>체육학 전공</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>총 140학점 필요 · 전공 60학점 + 교양 30학점 + 일반 최대 50학점</p>

              {/* 개설 현황 */}
              <div style={{ background: "#EEF2FF", borderRadius: 14, padding: "16px 20px", marginBottom: 28, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>📚</span>
                <p style={{ fontSize: 14, color: "#333", lineHeight: 1.6 }}>
                  온라인 전공 수업 <strong style={{ color: NAVY }}>23개 개설</strong> — 자격증 없이도 수업만으로 전공 학점 충족 가능
                </p>
              </div>

              {/* 두 가지 플랜 비교 */}
              <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 16 }}>두 가지 플랜 비교</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
                {/* 자격증 포함 플랜 */}
                <div style={{ borderRadius: 16, background: NAVY, padding: "24px 22px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: "#fff" }}>자격증 포함 플랜</p>
                    <span style={{ fontSize: 12, fontWeight: 600, background: "#FFD700", color: "#111", padding: "3px 10px", borderRadius: 20 }}>추천</span>
                  </div>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: 16 }}>
                    스포츠경영관리사 + 생활스포츠지도사 2급 활용
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>스포츠경영관리사: 20학점 인정</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>생활스포츠지도사 2급: 6학점 인정</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#FFD700", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "rgba(255,255,255,0.9)" }}>온라인 수업 3~4학기</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 20, padding: "12px 16px", background: "rgba(255,255,255,0.1)", borderRadius: 10, textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginBottom: 2 }}>예상 취득 시점</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#FFD700" }}>약 2년 (27년 2월)</p>
                  </div>
                </div>

                {/* 자격증 없는 플랜 */}
                <div style={{ borderRadius: 16, background: "#F8F9FA", border: "1px solid #e5e7eb", padding: "24px 22px" }}>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 12 }}>자격증 없는 플랜</p>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.7, marginBottom: 16 }}>
                    온라인 수업만으로 학점 취득
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#555", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#555" }}>온라인 전공 수업 5학기 이수</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#555", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#555" }}>자격증 준비 부담 없음</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#555", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, color: "#555" }}>기간이 더 소요됨</span>
                    </div>
                  </div>
                  <div style={{ marginTop: 20, padding: "12px 16px", background: "#e5e7eb", borderRadius: 10, textAlign: "center" }}>
                    <p style={{ fontSize: 13, color: "#666", marginBottom: 2 }}>예상 취득 시점</p>
                    <p style={{ fontSize: 20, fontWeight: 800, color: "#555" }}>약 2년 반 (28년 2월)</p>
                  </div>
                </div>
              </div>

              {/* 강조 배너 */}
              <div
                style={{
                  background: "#FFF7ED",
                  border: "1.5px solid #FED7AA",
                  borderRadius: 14,
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20 }}>⚡</span>
                <p style={{ fontSize: 14, color: "#92400E", lineHeight: 1.6, fontWeight: 600 }}>
                  자격증 2개로 약 1년 단축 가능 — 비용도 함께 줄어듭니다
                </p>
              </div>
            </div>
          )}

          {/* 타전공 탭 */}
          {activeTab === "타전공" && (
            <div className="p-5 md:p-9" style={{ background: "#ffffff", borderRadius: 20, border: "1px solid #e5e7eb" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#15803D", background: "#F0FDF4", padding: "3px 12px", borderRadius: 20 }}>타전공</span>
                <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>이미 학위가 있다면? 타전공으로 빠르게</h3>
              </div>
              <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>기존 학위(전공)를 보유한 경우 전공 학점만 추가로 취득하면 됩니다</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {/* 전문학사 타전공 */}
                <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <div style={{ background: "#EEF2FF", padding: "20px 22px" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>전문학사 타전공</p>
                  </div>
                  <div style={{ padding: "20px 22px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공 <strong>36학점</strong>만 추가 취득하면 OK</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공필수 과목 충족 필수</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>교양·일반 학점은 기존 학위로 대체</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 학사 타전공 */}
                <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden" }}>
                  <div style={{ background: "#EEF2FF", padding: "20px 22px" }}>
                    <p style={{ fontSize: 15, fontWeight: 700, color: NAVY }}>학사 타전공</p>
                  </div>
                  <div style={{ padding: "20px 22px" }}>
                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공 <strong>48학점</strong>만 추가 취득하면 OK</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>전공필수 과목 충족 필수</span>
                      </div>
                      <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                        <span style={{ width: 6, height: 6, borderRadius: "50%", background: NAVY, flexShrink: 0, marginTop: 6 }} />
                        <span style={{ fontSize: 13, color: "#444", lineHeight: 1.6 }}>교양·일반 학점은 기존 학위로 대체</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div
                style={{
                  background: "#F8F9FA",
                  borderRadius: 14,
                  padding: "16px 20px",
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                }}
              >
                <span style={{ fontSize: 20 }}>⚠️</span>
                <p style={{ fontSize: 13, color: "#555", lineHeight: 1.6 }}>
                  타전공은 <strong>전공필수 과목 충족이 반드시 필요</strong>합니다. 충족 여부는 상담을 통해 정확히 확인해드립니다.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ── 서플라이에듀를 선택하는 이유 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-12 md:py-20 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              서플라이에듀를 선택하는 이유
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-black md:text-4xl mb-3" style={{ wordBreak: "keep-all" }}>
              학점은행제, 왜 서플라이에듀인가요?
            </h2>
            <p className="text-sm text-gray-500" style={{ wordBreak: "keep-all" }}>
              처음부터 학위 취득까지, 혼자 하지 않아도 됩니다
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              { emoji: "📚", title: "핵심 자료 제공", desc: "과목별 핵심 요약 자료를 제공해 최단 시간으로 최고 성적을 낼 수 있도록 도와드립니다" },
              { emoji: "📋", title: "이수 현황 점검", desc: "분기마다 학점 현황을 꼼꼼히 체크해 누락된 학점 없이 목표 학위까지 정확하게 관리합니다" },
              { emoji: "🧑‍💼", title: "전담 멘토 1:1", desc: "처음 상담부터 학위 취득까지 한 명의 전담 멘토가 끝까지 함께합니다" },
              { emoji: "📅", title: "시기별 맞춤 알림", desc: "수강신청·학점인정신청·학위신청 시기마다 놓치지 않도록 사전에 안내해 드립니다" },
              { emoji: "📖", title: "상세 가이드 제공", desc: "복잡한 서류와 신청 절차를 누구나 쉽게 따라할 수 있도록 단계별로 안내합니다" },
              { emoji: "✅", title: "분기별 사후 점검", desc: "신청 내역에 누락된 부분이 없는지 분기별로 꼼꼼하게 재점검합니다" },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  background: "#fff",
                  border: "1px solid #e5e7eb",
                  borderRadius: 12,
                  boxShadow: "0 1px 6px rgba(0,0,0,0.05)",
                }}
                className="p-4 md:p-5"
              >
                <div style={{ fontSize: 20, marginBottom: 8 }}>{card.emoji}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 4 }} className="md:text-base">{card.title}</h3>
                <p style={{ fontSize: 12, color: "#555", lineHeight: 1.7, wordBreak: "keep-all" }} className="md:text-sm">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 무료 이수계획표 섹션 ── */}
      <section className="w-full bg-white py-12 md:py-20 px-4 md:px-6">
        <style>{`
          @keyframes scrollUp {
            0% { transform: translateY(0); }
            100% { transform: translateY(-50%); }
          }
          @keyframes pulseDot {
            0%, 100% { transform: scale(1); opacity: 1; }
            50% { transform: scale(1.6); opacity: 0.5; }
          }
        `}</style>
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-8 md:mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              무료 상담
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-black md:text-4xl mb-3" style={{ wordBreak: "keep-all" }}>
              지금 바로 플랜 상담 받아보세요
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-stretch">
            {/* 왼쪽: 폼 */}
            <div className="flex flex-col" style={{ height: "100%" }}>
              {planSubmitDone ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 12 }}>신청 완료!</p>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>담당 멘토가 곧 연락드리겠습니다.</p>
                </div>
              ) : (
                <form onSubmit={handlePlanSubmit} style={{ display: "flex", flexDirection: "column", gap: 14, height: "100%", flex: 1 }}>
                  {/* 성함 */}
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
                  {/* 연락처 */}
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
                  {/* 최종학력 */}
                  <div>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", display: "block", marginBottom: 6 }}>최종학력 및 보유학점</label>
                    <input
                      type="text"
                      value={planEducation}
                      onChange={(e) => setPlanEducation(e.target.value)}
                      placeholder="예: 전문대졸 / 보유 학점 없음"
                      style={{ width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "11px 14px", fontSize: 14, outline: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* 문의내용 */}
                  <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
                    <label style={{ fontSize: 13, fontWeight: 600, color: "#333", display: "block", marginBottom: 6 }}>문의내용</label>
                    <textarea
                      value={planMessage}
                      onChange={(e) => setPlanMessage(e.target.value)}
                      placeholder="궁금한 점을 자유롭게 적어주세요"
                      rows={4}
                      style={{ height: 100, width: "100%", border: "1px solid #e5e7eb", borderRadius: 8, padding: "11px 14px", fontSize: 14, outline: "none", resize: "none", boxSizing: "border-box" }}
                    />
                  </div>
                  {/* 개인정보 동의 */}
                  <label style={{ display: "flex", alignItems: "flex-start", gap: 8, fontSize: 13, color: "#555", cursor: "pointer" }}>
                    <input
                      type="checkbox"
                      checked={planAgree}
                      onChange={(e) => setPlanAgree(e.target.checked)}
                      required
                      style={{ accentColor: NAVY, width: 16, height: 16, flexShrink: 0, marginTop: 1 }}
                    />
                    개인정보 수집 및 이용에 동의합니다. <span style={{ color: "#EF4444" }}>*</span>
                  </label>
                  {/* 제출 버튼 */}
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
                학점은행제 체육학 전담 멘토가 내 상황에 맞는 최단 경로를 바로 설계해드립니다
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

              {/* 실시간 상담 현황 */}
              <div style={{ border: "1px solid #e5e7eb", borderRadius: 14, overflow: "hidden", flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ background: "#F8F9FA", padding: "12px 18px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid #e5e7eb" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#EF4444", display: "inline-block", animation: "pulseDot 1.4s ease-in-out infinite" }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>실시간 상담 현황</span>
                </div>
                <div style={{ maxHeight: 300, overflow: "hidden", position: "relative" }}>
                  <div style={{ animation: "scrollUp 18s linear infinite" }}>
                    {[
                      { date: "오늘", type: "건운사", content: "건강운동관리사 응시자격 조건 문의", today: true },
                      { date: "오늘", type: "편입", content: "체대 비실기 전형 학점 준비 문의", today: true },
                      { date: "어제", type: "학위취득", content: "고졸 체육전문학사 최단기간 문의", today: false },
                      { date: "어제", type: "건운사", content: "직장인 병행 수강 가능한지 문의", today: false },
                      { date: "2일 전", type: "편입", content: "실기 준비 중 학위 병행 문의", today: false },
                      { date: "2일 전", type: "학위취득", content: "전문대졸 체육학사 취득 기간 문의", today: false },
                      { date: "3일 전", type: "대학원", content: "체육교육대학원 진학 조건 문의", today: false },
                      { date: "3일 전", type: "건운사", content: "스포츠경영관리사 학점 인정 문의", today: false },
                      { date: "오늘", type: "건운사", content: "건강운동관리사 응시자격 조건 문의", today: true },
                      { date: "오늘", type: "편입", content: "체대 비실기 전형 학점 준비 문의", today: true },
                      { date: "어제", type: "학위취득", content: "고졸 체육전문학사 최단기간 문의", today: false },
                      { date: "어제", type: "건운사", content: "직장인 병행 수강 가능한지 문의", today: false },
                      { date: "2일 전", type: "편입", content: "실기 준비 중 학위 병행 문의", today: false },
                      { date: "2일 전", type: "학위취득", content: "전문대졸 체육학사 취득 기간 문의", today: false },
                      { date: "3일 전", type: "대학원", content: "체육교육대학원 진학 조건 문의", today: false },
                      { date: "3일 전", type: "건운사", content: "스포츠경영관리사 학점 인정 문의", today: false },
                    ].map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "56px 64px 1fr",
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
                        <span style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: NAVY,
                          background: "#EEF2FF",
                          padding: "2px 8px",
                          borderRadius: 20,
                          textAlign: "center",
                          whiteSpace: "nowrap",
                        }}>
                          {row.type}
                        </span>
                        <span style={{ fontSize: 12, color: "#444", lineHeight: 1.5, wordBreak: "keep-all" }}>{row.content}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 하단 CTA 섹션 ── */}
      <section className="py-14 md:py-24" style={{ background: NAVY }}>
        <div className="mx-auto max-w-6xl px-4 md:px-6 text-center">
          <h2 className="text-2xl font-extrabold text-white md:text-3xl">
            내 상황에 맞는 최적의 플랜이 궁금하다면
          </h2>
          <p className="mt-3 text-sm md:text-base" style={{ color: "rgba(255,255,255,0.7)" }}>
            전담 컨설턴트가 1:1로 분석해드립니다
          </p>
          <Link
            href="/apply"
            className="mt-8 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
            style={{ background: "#FFFFFF", color: NAVY }}
          >
            1:1 무료 상담 신청하기
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
