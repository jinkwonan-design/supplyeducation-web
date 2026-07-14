"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Footer from "@/components/Footer";
import { MessageCircle, ClipboardList, Laptop, Award, ChevronRight } from "lucide-react";

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

/* ── 메인 페이지 ── */
export default function ElectricalPage() {
  /* 섹션 8 폼 상태 (나중에 사용) */
  const [planName, setPlanName] = useState("");
  const [planPhone, setPlanPhone] = useState("");
  const [planEducation, setPlanEducation] = useState("");
  const [planMessage, setPlanMessage] = useState("");
  const [planAgree, setPlanAgree] = useState(false);
  const [planSubmitting, setPlanSubmitting] = useState(false);
  const [planSubmitDone, setPlanSubmitDone] = useState(false);
  const [reviewModal, setReviewModal] = useState<number | null>(null);
  const [degreeReviewModal, setDegreeReviewModal] = useState<number | null>(null);

  async function handlePlanSubmit(e: React.FormEvent<HTMLFormElement>) {
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
          course: "전기 / 플랜 상담 신청",
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

      {/* ════════════════════════════════════════
          섹션 1. 히어로
      ════════════════════════════════════════ */}
      <section
        className="relative flex min-h-screen flex-col justify-center"
        style={{
          backgroundImage: "url('/images/electrical-hero-night.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* 어두운 오버레이 — 야경 조명이 살도록 좌측을 더 진하게 처리 */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(8,12,32,0.85) 0%, rgba(8,12,32,0.7) 45%, rgba(8,12,32,0.5) 100%)",
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6">
          <div className="max-w-2xl" style={{ wordBreak: "keep-all" }}>
            {/* H1 */}
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">시공이든, 감리든, 건설사든.</span>
              <span
                className="mt-3 inline-block rounded-lg px-4 py-2"
                style={{ background: NAVY }}
              >
                학위 하나면 세 곳 다 열립니다
              </span>
            </h1>

            {/* 서브 */}
            <p
              className="mt-6 text-base font-medium text-white/80 md:text-lg"
              style={{ lineHeight: 1.75 }}
            >
              전기공사협회 · 전기기술인협회 · 건설기술인협회<br />
              경력수첩 발급 요건, 한 번에.
            </p>

            {/* 통계 */}
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "100% 온라인", label: "시간·장소 자유" },
                { value: "시험 없이 취득", label: "국가기술자격 시험 불필요" },
                { value: "1:1 전담 설계", label: "처음부터 끝까지" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <p className="text-2xl font-bold text-white md:text-3xl">{s.value}</p>
                  <p className="mt-1 text-xs text-white/60">{s.label}</p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/apply"
              className="mt-10 inline-block rounded-full px-8 py-4 text-base font-bold transition-transform hover:scale-105 active:scale-95"
              style={{ background: "#FFFFFF", color: NAVY }}
            >
              내 상황 무료 진단받기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 2. 왜 전기공학사인가
      ════════════════════════════════════════ */}
      <section className="w-full bg-[#F8F9FA] py-14 px-4 md:py-20 md:px-6">
        <div className="mx-auto max-w-3xl">
          {/* 헤더 */}
          <div className="mb-10 text-center md:mb-12">
            <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium tracking-widest text-[#1a1aad]">
              왜 전기공학사인가
            </span>
            <h2
              className="mb-5 text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ wordBreak: "keep-all" }}
            >
              왜 전기공학사여야 하는가
            </h2>
            <p
              className="text-sm text-gray-600 md:text-base"
              style={{ lineHeight: 1.8, wordBreak: "keep-all" }}
            >
              경력수첩은 아무 학과로는 나오지 않습니다.<br />
              협회가 보는 건 딱 하나 &mdash; &ldquo;전기 관련 학과 출신&rdquo; 여부입니다.
            </p>
          </div>

          {/* 비교 테이블 */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
              background: "#fff",
            }}
          >
            {/* 헤더 행 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.15fr 1fr 1fr",
                background: NAVY,
                padding: "14px 12px",
              }}
            >
              {["", "경영학사", "전기공학사"].map((h, i) => (
                <span
                  key={i}
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#fff",
                    textAlign: i === 0 ? "left" : "center",
                    paddingLeft: i === 0 ? 8 : 0,
                    wordBreak: "keep-all",
                  }}
                >
                  {h}
                </span>
              ))}
            </div>
            {/* 데이터 행 */}
            {[
              { label: "기사 시험 응시", a: "✅ 가능", b: "✅ 가능", highlight: false },
              { label: "시험 합격 시", a: "자격증만", b: "자격증 + 경력수첩", highlight: false },
              { label: "시험 불합격 시", a: "아무것도 없음", b: "경력수첩은 남음", highlight: true },
            ].map((row, i) => (
              <div
                key={row.label}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.15fr 1fr 1fr",
                  padding: "15px 12px",
                  background: row.highlight ? "#FFF7F5" : i % 2 === 0 ? "#fff" : "#F8F9FA",
                  borderTop: "1px solid #f3f4f6",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#111",
                    paddingLeft: 8,
                    wordBreak: "keep-all",
                  }}
                >
                  {row.label}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: row.highlight ? 700 : 500,
                    color: row.highlight ? "#EF4444" : "#444",
                    textAlign: "center",
                    textDecoration: row.highlight ? "line-through" : "none",
                    wordBreak: "keep-all",
                  }}
                >
                  {row.a}
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: row.highlight ? 800 : 600,
                    color: row.highlight ? "#16a34a" : NAVY,
                    textAlign: "center",
                    wordBreak: "keep-all",
                  }}
                >
                  {row.b}
                </span>
              </div>
            ))}
          </div>

          {/* 테이블 아래 부연 텍스트 */}
          <p
            className="mt-8 text-center text-sm text-gray-600 md:text-base"
            style={{ lineHeight: 1.85, wordBreak: "keep-all" }}
          >
            학원 상담에서는 흔히 &ldquo;아무 전공이든 학점만 채우면 된다&rdquo;고 안내받습니다.
            <br />
            <span style={{ fontWeight: 700, color: "#111" }}>
              응시자격은 맞습니다. 하지만 수첩은 다릅니다.
            </span>
          </p>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 3. 목적 분기 카드
      ════════════════════════════════════════ */}
      <section className="w-full bg-white py-20 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* 헤더 */}
          <div className="mb-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl">
              어떤 목적으로 오셨나요?
            </h2>
          </div>

          {/* 카드 2개 */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                icon: "⚡",
                title: "산업기사·기사 응시자격",
                desc: "전기·소방·산업안전 자격증 시험 응시자격 취득",
                btnLabel: "산업기사·기사 자세히 보기 →",
                href: "#license",
              },
              {
                icon: "🎓",
                title: "전기공학사 학위",
                desc: "전기 관련 학위 취득, 기술인협회 등급 향상",
                btnLabel: "전기공학사 자세히 보기 →",
                href: "#degree",
              },
            ].map((card) => (
              <div
                key={card.title}
                style={{
                  borderRadius: 20,
                  background: "#fff",
                  border: "1.5px solid #e5e7eb",
                  boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                  padding: "36px 32px",
                  transition: "transform 0.25s",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.transform = "translateY(-6px)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.transform = "translateY(0)")
                }
              >
                {/* 아이콘 */}
                <div
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: "#EEF2FF",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 20,
                  }}
                >
                  <span style={{ fontSize: 26 }}>{card.icon}</span>
                </div>

                <h3
                  style={{
                    fontSize: 22,
                    fontWeight: 800,
                    color: "#111",
                    marginBottom: 10,
                  }}
                >
                  {card.title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    color: "#555",
                    lineHeight: 1.7,
                    marginBottom: 28,
                    wordBreak: "keep-all",
                  }}
                >
                  {card.desc}
                </p>

                <a
                  href={card.href}
                  style={{
                    display: "inline-block",
                    background: NAVY,
                    color: "#fff",
                    fontWeight: 700,
                    fontSize: 14,
                    borderRadius: 8,
                    padding: "12px 20px",
                    textDecoration: "none",
                  }}
                >
                  {card.btnLabel}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 4. 산업기사·기사 응시자격
      ════════════════════════════════════════ */}
      <section id="license" className="w-full bg-[#F8F9FA] py-20 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* 헤더 */}
          <div className="mb-14 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium tracking-widest text-[#1a1aad]">
              산업기사·기사 응시자격
            </span>
            <h2
              className="text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ wordBreak: "keep-all" }}
            >
              혼자 하면 복잡한 응시자격,<br />담당자가 설계해드립니다
            </h2>
          </div>

          {/* 후기 썸네일 + 인용구 3열 그리드 */}
          {(() => {
            const reviews = [
              {
                img: "/images/electrical-review-1.webp",
                quote: "퇴근하고 강의 켜놓기만 했는데 학점이 나왔어요",
                source: "직장 병행 전기산업기사 준비 이o현 학습자님",
              },
              {
                img: "/images/electrical-review-2.webp",
                quote: "과제 시험 다 도움받으니까 기사 공부에만 집중할 수 있었습니다",
                source: "경력직 이직 준비 김o준 학습자님",
              },
              {
                img: "/images/electrical-review-3.webp",
                quote: "4개월만에 응시자격 갖출 수 있다는 게 믿기지 않았어요",
                source: "고졸 전기기사 도전 박o수 학습자님",
              },
            ];
            return (
              <>
                <div className="mb-14 grid grid-cols-3 gap-4">
                  {reviews.map((item, idx) => (
                    <div
                      key={idx}
                      style={{ position: "relative", cursor: "pointer" }}
                      onClick={() => setReviewModal(idx)}
                    >
                      <img
                        src={item.img}
                        alt="수강생 카톡 후기"
                        style={{
                          width: "100%",
                          height: 180,
                          objectFit: "cover",
                          borderRadius: 12,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                          display: "block",
                        }}
                      />
                      {/* hover 어두운 overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: 12,
                          background: "rgba(0,0,0,0)",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(0,0,0,0.25)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "rgba(0,0,0,0)")
                        }
                      />
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: NAVY,
                          marginTop: 10,
                          lineHeight: 1.6,
                          wordBreak: "keep-all",
                        }}
                      >
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                        - {item.source} -
                      </p>
                    </div>
                  ))}
                </div>

                {/* 모달 */}
                {reviewModal !== null && (
                  <div
                    style={{
                      position: "fixed",
                      inset: 0,
                      background: "rgba(0,0,0,0.80)",
                      zIndex: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                    onClick={() => setReviewModal(null)}
                  >
                    <div
                      style={{ position: "relative", maxWidth: 500, width: "100%" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      {/* X 버튼 */}
                      <button
                        onClick={() => setReviewModal(null)}
                        style={{
                          position: "absolute",
                          top: -14,
                          right: -14,
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "#fff",
                          border: "none",
                          fontSize: 16,
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          zIndex: 1,
                        }}
                        aria-label="닫기"
                      >
                        ✕
                      </button>
                      <img
                        src={reviews[reviewModal].img}
                        alt="수강생 카톡 후기 원본"
                        style={{
                          width: "100%",
                          maxHeight: "90vh",
                          objectFit: "contain",
                          borderRadius: 12,
                          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                          display: "block",
                          overflowY: "auto",
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* 학력별 플랜 표 */}
          <div
            style={{
              borderRadius: 16,
              overflow: "hidden",
              border: "1px solid #e5e7eb",
              marginBottom: 40,
            }}
          >
            {/* 헤더 행 */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr 1fr",
                background: NAVY,
                padding: "14px 20px",
              }}
            >
              {["현재 학력", "산업기사", "기사"].map((h) => (
                <span
                  key={h}
                  style={{ fontSize: 13, fontWeight: 700, color: "#fff", textAlign: "center" }}
                >
                  {h}
                </span>
              ))}
            </div>
            {/* 데이터 행 */}
            {[
              { edu: "고졸", license: "41학점 · 4개월", engineer: "106학점 · 1년" },
              { edu: "전문대졸", license: "응시자격 확인 필요", engineer: "106학점" },
              { edu: "4년제 졸 (비전공)", license: "응시자격 확인 필요", engineer: "48학점 · 8개월" },
              { edu: "대학 중퇴", license: "보유학점에 따라 상이", engineer: "보유학점에 따라 상이" },
            ].map((row, i) => (
              <div
                key={row.edu}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr 1fr",
                  padding: "15px 20px",
                  background: i % 2 === 0 ? "#fff" : "#F8F9FA",
                  borderBottom: i < 3 ? "1px solid #f3f4f6" : "none",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                <span
                  style={{ fontSize: 14, fontWeight: 600, color: "#111", textAlign: "center" }}
                >
                  {row.edu}
                </span>
                <span
                  style={{ fontSize: 13, color: "#444", textAlign: "center", wordBreak: "keep-all" }}
                >
                  {row.license}
                </span>
                <span
                  style={{ fontSize: 13, color: "#444", textAlign: "center", wordBreak: "keep-all" }}
                >
                  {row.engineer}
                </span>
              </div>
            ))}
          </div>

          {/* 하단 버튼 */}
          <div className="text-center">
            <Link
              href="/apply"
              style={{
                display: "inline-block",
                background: NAVY,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 10,
                padding: "14px 28px",
                textDecoration: "none",
              }}
            >
              무료 응시자격 상담 신청하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 5. 전기공학사 학위
      ════════════════════════════════════════ */}
      <section id="degree" className="w-full bg-white py-20 px-4 md:px-6">
        <div className="mx-auto max-w-4xl">
          {/* 헤더 */}
          <div className="mb-14 text-center">
            <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium tracking-widest text-[#1a1aad]">
              전기공학사 학위
            </span>
            <h2
              className="text-3xl font-bold tracking-tight text-black md:text-4xl"
              style={{ wordBreak: "keep-all" }}
            >
              기사 준비하면서 학위까지
            </h2>
          </div>

          {/* 후기 썸네일 + 인용구 3열 그리드 */}
          {(() => {
            const degreeReviews = [
              {
                img: "/images/electrical-degree-review-1.webp",
                quote: "응시자격 따면서 학위까지 가져가니 일석이조였어요",
                source: "기술인협회 등급 향상 최o민 학습자님",
              },
              {
                img: "/images/electrical-degree-review-2.webp",
                quote: "기술인협회 등급 올리려고 시작했는데 생각보다 빠르게 됐어요",
                source: "이직 준비 전기기사 보유 정o훈 학습자님",
              },
              {
                img: "/images/electrical-degree-review-3.webp",
                quote: "온라인으로 전기공학사 학위 딸 수 있다는 게 신기했어요",
                source: "비전공 직장인 윤o서 학습자님",
              },
            ];
            return (
              <>
                <div className="mb-14 grid grid-cols-3 gap-4">
                  {degreeReviews.map((item, idx) => (
                    <div
                      key={idx}
                      style={{ position: "relative", cursor: "pointer" }}
                      onClick={() => setDegreeReviewModal(idx)}
                    >
                      <img
                        src={item.img}
                        alt="수강생 카톡 후기"
                        style={{
                          width: "100%",
                          height: 180,
                          objectFit: "cover",
                          borderRadius: 12,
                          boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                          display: "block",
                        }}
                      />
                      {/* hover overlay */}
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          borderRadius: 12,
                          background: "rgba(0,0,0,0)",
                          transition: "background 0.2s",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.background = "rgba(0,0,0,0.25)")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background = "rgba(0,0,0,0)")
                        }
                      />
                      <p
                        style={{
                          fontSize: 13,
                          fontWeight: 700,
                          color: NAVY,
                          marginTop: 10,
                          lineHeight: 1.6,
                          wordBreak: "keep-all",
                        }}
                      >
                        &ldquo;{item.quote}&rdquo;
                      </p>
                      <p style={{ fontSize: 12, color: "#888", marginTop: 4 }}>
                        - {item.source} -
                      </p>
                    </div>
                  ))}
                </div>

                {/* 모달 */}
                {degreeReviewModal !== null && (
                  <div
                    style={{
                      position: "fixed",
                      inset: 0,
                      background: "rgba(0,0,0,0.80)",
                      zIndex: 50,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "20px",
                    }}
                    onClick={() => setDegreeReviewModal(null)}
                  >
                    <div
                      style={{ position: "relative", maxWidth: 500, width: "100%" }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => setDegreeReviewModal(null)}
                        style={{
                          position: "absolute",
                          top: -14,
                          right: -14,
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          background: "#fff",
                          border: "none",
                          fontSize: 16,
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
                          zIndex: 1,
                        }}
                        aria-label="닫기"
                      >
                        ✕
                      </button>
                      <img
                        src={degreeReviews[degreeReviewModal].img}
                        alt="수강생 카톡 후기 원본"
                        style={{
                          width: "100%",
                          maxHeight: "90vh",
                          objectFit: "contain",
                          borderRadius: 12,
                          boxShadow: "0 8px 40px rgba(0,0,0,0.4)",
                          display: "block",
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            );
          })()}

          {/* 학력별 플랜 */}
          <div className="mb-10 flex flex-col gap-3">
            {[
              {
                edu: "고졸",
                plan: "수업 4학기 + 전기산업기사 + 독학사",
                period: "약 2년",
              },
              {
                edu: "전문대졸 (비동일전공)",
                plan: "수업 2학기 + 전공자격증 1개",
                period: "약 1년",
              },
              {
                edu: "전문대졸 (동일전공)",
                plan: "수업 1~2학기",
                period: "6~12개월",
              },
              {
                edu: "4년제 졸 (비동일전공)",
                plan: "타전공 경영학사 진행",
                period: "별도 안내",
              },
            ].map((row) => (
              <div
                key={row.edu}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 12,
                  background: "#F8F9FA",
                  borderRadius: 12,
                  border: "1px solid #e5e7eb",
                  padding: "16px 22px",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", gap: 3 }}>
                  <span style={{ fontSize: 14, fontWeight: 700, color: "#111" }}>{row.edu}</span>
                  <span style={{ fontSize: 13, color: "#555", wordBreak: "keep-all" }}>{row.plan}</span>
                </div>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: NAVY,
                    background: "#EEF2FF",
                    borderRadius: 20,
                    padding: "4px 14px",
                    flexShrink: 0,
                    whiteSpace: "nowrap",
                  }}
                >
                  {row.period}
                </span>
              </div>
            ))}
          </div>

          {/* 하단 버튼 */}
          <div className="text-center">
            <Link
              href="/apply"
              style={{
                display: "inline-block",
                background: NAVY,
                color: "#fff",
                fontWeight: 700,
                fontSize: 15,
                borderRadius: 10,
                padding: "14px 28px",
                textDecoration: "none",
              }}
            >
              무료 학위 취득 상담 신청하기 →
            </Link>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 6. 학점 취득 방법
      ════════════════════════════════════════ */}
      <section className="w-full bg-[#F8F9FA] px-6 py-20">
        <div className="mx-auto max-w-4xl text-center">
          <span className="mb-4 inline-block rounded-full bg-[#EEF2FF] px-3 py-1 text-xs font-medium tracking-widest text-[#1a1aad]">
            진행 과정
          </span>
          <h2 className="mb-12 text-3xl font-bold tracking-tight text-black md:text-4xl">
            복잡한 학점은행제,<br />가장 쉽고 가장 빠르게
          </h2>
          <div className="grid grid-cols-4 gap-3 max-w-4xl mx-auto">
            {/* STEP 01 */}
            <div className="relative flex flex-col items-center px-1 text-center">
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">STEP 01</p>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                <MessageCircle size={20} className="md:hidden" color="#1a1aad" />
                <MessageCircle size={28} className="hidden md:block" color="#1a1aad" />
              </div>
              <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">무료 상담 신청</p>
              <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">3분이면 충분해요</p>
              <span className="absolute right-0 top-8 hidden md:block" style={{ transform: "translateX(50%)" }}>
                <ChevronRight size={20} color="#1a1aad" />
              </span>
            </div>

            {/* STEP 02 */}
            <div className="relative flex flex-col items-center px-1 text-center">
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">STEP 02</p>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                <ClipboardList size={20} className="md:hidden" color="#1a1aad" />
                <ClipboardList size={28} className="hidden md:block" color="#1a1aad" />
              </div>
              <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">1:1 플랜 설계</p>
              <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">최단기간 최저비용 맞춤 설계</p>
              <span className="absolute right-0 top-8 hidden md:block" style={{ transform: "translateX(50%)" }}>
                <ChevronRight size={20} color="#1a1aad" />
              </span>
            </div>

            {/* STEP 03 */}
            <div className="relative flex flex-col items-center px-1 text-center">
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">STEP 03</p>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                <Laptop size={20} className="md:hidden" color="#1a1aad" />
                <Laptop size={28} className="hidden md:block" color="#1a1aad" />
              </div>
              <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">온라인 수강</p>
              <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">언제 어디서든 편하게</p>
              <span className="absolute right-0 top-8 hidden md:block" style={{ transform: "translateX(50%)" }}>
                <ChevronRight size={20} color="#1a1aad" />
              </span>
            </div>

            {/* STEP 04 */}
            <div className="relative flex flex-col items-center px-1 text-center">
              <p className="mb-4 text-[10px] font-semibold tracking-widest text-[#1a1aad] md:text-xs">STEP 04</p>
              <div className="relative z-10 mb-4 flex h-12 w-12 items-center justify-center rounded-3xl bg-[#EEF2FF] md:h-16 md:w-16">
                <Award size={20} className="md:hidden" color="#1a1aad" />
                <Award size={28} className="hidden md:block" color="#1a1aad" />
              </div>
              <p className="mb-1 text-xs font-medium text-gray-900 md:text-sm">학위·자격증 취득</p>
              <p className="text-[10px] leading-relaxed text-gray-500 md:text-xs">끝까지 함께합니다</p>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 7. 왜 서플라이에듀인가
      ════════════════════════════════════════ */}
      <section className="w-full bg-[#F8F9FA] py-8 md:py-14 px-4 md:px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-6 md:mb-10">
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

          {/* 담당자 사진 마키 */}
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

            {/* overflow hidden 컨테이너 */}
            <div style={{ overflow: "hidden" }}>
              {/* 원본 + 복제본을 이어 붙여 끊김 없는 루프 */}
              <div
                className="marquee-track"
                style={{ display: "flex", width: "max-content" }}
              >
                {[...Array.from({ length: 11 }), ...Array.from({ length: 11 })].map((_, i) => {
                  const n = String((i % 11) + 1).padStart(2, "0");
                  return (
                    <img
                      key={i}
                      src={`/team/team-${n}.webp`}
                      alt={`담당자 ${n}`}
                      style={{
                        width: 110,
                        height: 110,
                        borderRadius: "50%",
                        objectFit: "cover",
                        flexShrink: 0,
                        marginRight: 16,
                      }}
                    />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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
                className="p-3"
              >
                <div style={{ fontSize: 18, marginBottom: 6 }}>{card.emoji}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 3 }}>{card.title}</h3>
                <p style={{ fontSize: 12, color: "#555", lineHeight: 1.65, wordBreak: "keep-all" }}>{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════
          섹션 8. 플랜 상담 받아보기
      ════════════════════════════════════════ */}
      <section className="w-full bg-white py-12 md:py-20 px-4 md:px-6">
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
              className="text-2xl font-bold tracking-tight text-black md:text-4xl mb-3"
              style={{ wordBreak: "keep-all" }}
            >
              지금 바로 플랜 상담 받아보세요
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 items-stretch">
            {/* ── 왼쪽: 폼 ── */}
            <div className="flex flex-col" style={{ height: "100%" }}>
              {planSubmitDone ? (
                <div style={{ textAlign: "center", padding: "60px 0" }}>
                  <p style={{ fontSize: 24, fontWeight: 800, color: NAVY, marginBottom: 12 }}>
                    신청 완료!
                  </p>
                  <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8 }}>
                    담당 멘토가 곧 연락드리겠습니다.
                  </p>
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

            {/* ── 오른쪽: 카카오톡 + 실시간 상담 현황 ── */}
            <div className="flex flex-col" style={{ height: "100%" }}>
              <h3
                style={{ fontSize: 22, fontWeight: 800, color: "#111", marginBottom: 12, wordBreak: "keep-all", lineHeight: 1.4 }}
              >
                지금 바로 플랜 상담 받아보세요
              </h3>
              <p style={{ fontSize: 14, color: "#555", lineHeight: 1.8, marginBottom: 8, wordBreak: "keep-all" }}>
                학점은행제 전기 전담 멘토가 내 상황에 맞는 최단 경로를 바로 설계해드립니다
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
              <div
                style={{
                  border: "1px solid #e5e7eb",
                  borderRadius: 14,
                  overflow: "hidden",
                  flex: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    background: "#F8F9FA",
                    padding: "12px 18px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "#EF4444",
                      display: "inline-block",
                      animation: "pulseDot 1.4s ease-in-out infinite",
                    }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#111" }}>
                    실시간 상담 현황
                  </span>
                </div>
                <div style={{ maxHeight: 300, overflow: "hidden", position: "relative" }}>
                  <div style={{ animation: "scrollUp 18s linear infinite" }}>
                    {[
                      { date: "오늘", type: "응시자격", content: "전기산업기사 41학점 취득 방법 문의", today: true },
                      { date: "오늘", type: "학위취득", content: "전기공학사 최단기간 취득 문의", today: true },
                      { date: "어제", type: "응시자격", content: "직장 병행 온라인 수강 가능한지 문의", today: false },
                      { date: "어제", type: "학위취득", content: "기술인협회 등급 향상 방법 문의", today: false },
                      { date: "2일 전", type: "응시자격", content: "소방설비산업기사 학점 인정 문의", today: false },
                      { date: "2일 전", type: "학위취득", content: "전문대졸 전기공학사 취득 기간 문의", today: false },
                      { date: "3일 전", type: "응시자격", content: "산업안전산업기사 응시자격 문의", today: false },
                      { date: "3일 전", type: "응시자격", content: "고졸 전기기사 도전 플랜 문의", today: false },
                      /* 무한 스크롤을 위한 복제 */
                      { date: "오늘", type: "응시자격", content: "전기산업기사 41학점 취득 방법 문의", today: true },
                      { date: "오늘", type: "학위취득", content: "전기공학사 최단기간 취득 문의", today: true },
                      { date: "어제", type: "응시자격", content: "직장 병행 온라인 수강 가능한지 문의", today: false },
                      { date: "어제", type: "학위취득", content: "기술인협회 등급 향상 방법 문의", today: false },
                      { date: "2일 전", type: "응시자격", content: "소방설비산업기사 학점 인정 문의", today: false },
                      { date: "2일 전", type: "학위취득", content: "전문대졸 전기공학사 취득 기간 문의", today: false },
                      { date: "3일 전", type: "응시자격", content: "산업안전산업기사 응시자격 문의", today: false },
                      { date: "3일 전", type: "응시자격", content: "고졸 전기기사 도전 플랜 문의", today: false },
                    ].map((row, i) => (
                      <div
                        key={i}
                        style={{
                          display: "grid",
                          gridTemplateColumns: "56px 68px 1fr",
                          gap: 8,
                          padding: "10px 18px",
                          borderBottom: "1px solid #f3f4f6",
                          alignItems: "center",
                          background: row.today ? "#FFFBEB" : "#fff",
                        }}
                      >
                        <span
                          style={{
                            fontSize: 12,
                            color: "#888",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          {row.today && <span style={{ fontSize: 10 }}>🔴</span>}
                          {row.date}
                        </span>
                        <span
                          style={{
                            fontSize: 11,
                            fontWeight: 600,
                            color: NAVY,
                            background: "#EEF2FF",
                            padding: "2px 8px",
                            borderRadius: 20,
                            textAlign: "center",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {row.type}
                        </span>
                        <span
                          style={{ fontSize: 12, color: "#444", lineHeight: 1.5, wordBreak: "keep-all" }}
                        >
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

      {/* ── 하단 CTA ── */}
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
