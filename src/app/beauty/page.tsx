"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Scissors, Award } from "lucide-react";
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

/* ── FAQ ── */
const faqs = [
  {
    q: "종합미용면허증을 취득하려면 미용학원을 꼭 다녀야 하나요?",
    a: "아니요.\n종합미용면허증은 미용 관련 전문학사 학위만 취득하면 발급 가능합니다.\n\n학점은행제를 통해 온라인 수업만으로도 학위 취득이 가능하며,\n별도의 국가자격시험이나 실기시험은 필요하지 않습니다.",
  },
  {
    q: "미용학위 취득에 얼마나 걸리나요?",
    a: "고졸 기준 약 80학점을 이수해야 하며, 보통 1~1.5년 정도 소요됩니다.\n전문대졸 이상이라면 36학점만 추가로 이수하면 되어 약 1년(2학기) 이내에 전문학사 취득이 가능합니다.",
  },
  {
    q: "미용 전공 온라인 수업이 가능한가요?",
    a: "전문학사 과정은 100% 온라인 진행 가능합니다.\n\n종합미용면허증 발급만 목적이라면 별도 실습 과목 이수가 필요하지 않습니다.\n\n다만 실제 미용 기술을 배우거나 미용사 국가자격증 취득을 목표로 하는 경우에는 학원에서 실무 교육을 받는 것이 일반적입니다.",
  },
  {
    q: "미용사(일반) 국가자격증은 어떻게 취득하나요?",
    a: "미용사(일반) 국가자격증은 별도의 응시자격 제한이 없어 누구나 필기·실기 시험에 응시할 수 있습니다.\n\n다만 실기시험 합격을 위해서는 실제 미용 기술이 필요하므로, 대부분 학원에서 오프라인 실습 교육을 받은 후 응시합니다.\n\n종합미용면허증 발급만을 목적으로 한다면 국가자격시험 없이 전문학사 학위 취득만으로 발급이 가능합니다.",
  },
  {
    q: "전문대 미용과를 졸업했는데 추가로 무엇이 필요한가요?",
    a: "전문대 미용 관련 학과를 졸업했다면 이미 종합미용면허증 발급 요건을 충족한 경우가 많습니다.\n\n별도의 학사학위 취득이 필수는 아니며,\n졸업 학과와 취득 학위가 미용 관련 기준에 해당하는지 확인 후 면허 발급 여부를 안내받을 수 있습니다.\n\n즉, 미용 관련 전문학사 학위를 이미 보유하고 있다면 추가 학점 이수 없이 종합미용면허증 발급이 가능합니다.",
  },
  {
    q: "자격증과 종합미용면허증은 무엇이 다른가요?",
    a: "자격증과 면허증은 전혀 다른 개념입니다.\n\n자격증은 특정 기술을 수행할 수 있다는 실력 인증이며,\n면허증은 국가가 해당 분야의 시술 및 영업을 할 수 있도록 권한을 부여하는 제도입니다.\n\n예를 들어 의사면허, 간호사면허처럼\n미용 분야 역시 면허가 있어야 합법적으로 시술 및 창업이 가능합니다.\n\n종합미용면허증은 헤어, 피부, 네일, 메이크업 분야의 시술 권한을 부여하는 면허입니다.",
  },
  {
    q: "미용사 국가자격증 4개를 모두 취득해야 종합미용면허증이 나오나요?",
    a: "아닙니다.\n\n헤어, 피부, 네일, 메이크업 국가자격증 4개를 모두 취득하면 종합미용면허증 발급이 가능하지만,\n\n미용 관련 전문학사 이상의 학위를 취득해도 종합미용면허증 발급이 가능합니다.\n\n따라서 종합미용면허증 발급 목적이라면\n반드시 국가자격증 4개를 모두 취득할 필요는 없습니다.",
  },
  {
    q: "종합미용면허증을 온라인으로 취득하면 바로 창업이나 취업이 가능한가요?",
    a: "종합미용면허증은 법적으로 시술과 창업이 가능한 자격을 부여하는 면허입니다.\n\n다만 면허를 취득했다고 해서 곧바로 실무 능력이 생기는 것은 아닙니다.\n\n실제 미용 기술은 별도의 실무 교육과 현장 경험을 통해 배우게 되며,\n국가자격증을 취득한 사람도 취업 전 별도 실습과 교육을 받는 경우가 많습니다.\n\n실무 역량 향상을 위해서는\n전문 교육기관이나 현업에서 운영 중인 우수한 원장님의 실전 클래스 등을 통해 기술을 배우는 것을 권장합니다.",
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
        <p className="text-sm text-gray-500 mb-10">종합미용면허증 취득에 대해 가장 많이 물어보시는 질문들을 모았어요</p>
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
                <div className="px-5 pb-4 text-sm leading-relaxed text-gray-500 whitespace-pre-line">{faq.a}</div>
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
export default function BeautyPage() {

  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      <Navbar />

      {/* ── 히어로 섹션 ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* 풀블리드 배경 이미지 */}
        <Image
          src="/images/beauty-hero.webp"
          alt="미용 학위 및 면허 취득"
          fill
          priority
          className="object-cover object-right"
        />

        {/* 오버레이 */}
        <div className="absolute inset-0" style={{ background: "rgba(0, 0, 0, 0.55)" }} />

        {/* 텍스트 콘텐츠 */}
        <div className="relative z-10 mx-auto w-full max-w-6xl px-4 md:px-6 py-28 md:py-0">
          <div className="max-w-xl" style={{ wordBreak: "keep-all" }}>
            <span
              className="mb-6 inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-widest"
              style={{ background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.85)" }}
            >
              종합미용면허증 · 미용 학위 취득 안내
            </span>
            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              <span className="block">자격증 4개 따지 마세요</span>
              <span className="block mt-2">면허 하나로 끝납니다</span>
            </h1>
            <p className="mt-6 text-lg font-medium text-white/80 md:text-xl" style={{ lineHeight: 1.7 }}>
              헤어·피부·네일·메이크업, 전부 가능
            </p>
            <div className="mt-10 flex flex-wrap gap-8">
              {[
                { value: "최소 1년~", label: "취득 기간" },
                { value: "무시험", label: "별도 국가시험 없음" },
                { value: "100% 온라인", label: "수업 방식" },
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

      {/* ── 자격증 이미지 소개 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              종합미용면허증
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              종합미용면허증이란?
            </h2>
            <p className="text-sm text-gray-500">하나의 면허로 미용 4개 분야를 모두 시술하고 창업까지 가능한 국가면허입니다</p>
          </div>

          <div style={{ borderRadius: 16, border: "1px solid #e5e7eb", overflow: "hidden", background: "#ffffff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}>
            <div style={{ height: "320px", overflow: "hidden", position: "relative" }}>
              <Image
                src="/images/beauty-nail.webp"
                alt="종합미용면허증"
                fill
                loading="lazy"
                style={{ objectFit: "cover", objectPosition: "center" }}
              />
            </div>
            <div style={{ padding: 24 }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: NAVY, marginBottom: 12 }}>종합미용면허증</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>헤어·피부·네일·메이크업 <strong>4개 분야 모두 시술·창업 가능</strong></span>
                <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>미용 관련 <strong>전문학사 이상 학위 취득만으로 발급</strong> (국가자격시험 불필요)</span>
                <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>분야별 자격증 대비 <strong>비용·시간 대폭 절약</strong></span>
                <span style={{ fontSize: 14, color: "#555", lineHeight: 1.7 }}>100% 온라인 과정, <strong>직장 병행 가능</strong></span>
              </div>
              <div style={{ marginTop: 16, padding: "14px 16px", background: "#F8F9FA", borderRadius: 10, fontSize: 13, color: "#555", lineHeight: 1.8 }}>
                미용 관련 전문학사 이상의 학위를 취득하면 종합미용면허증 발급이 가능합니다. 미용 관련 학과 졸업자도 동일하게 인정되며, 미용고등학교 졸업자 역시 관련 기준 충족 시 면허 발급이 가능합니다.<br />
                학교를 다시 다니기 어려운 직장인·주부·성인의 경우 <strong>학점은행제를 통한 온라인 학위 취득이 가장 효율적인 방법</strong>입니다.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 혜택 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              왜 필요한가요
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              종합미용면허증, 왜 꼭 필요할까요?
            </h2>
            <p className="text-sm text-gray-500">면허증 하나로 누릴 수 있는 강력한 혜택을 소개합니다</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                num: "01",
                title: "모든 미용 분야 창업 가능",
                desc: "이 면허증 하나만 있으면 헤어, 피부, 네일, 메이크업 등 4가지 분야를 모두 시술할 수 있고 창업도 가능합니다.",
              },
              {
                num: "02",
                title: "토탈 뷰티샵 운영",
                desc: "네일아트와 속눈썹 연장, 피부 관리와 메이크업을 한 곳에서 제공하는 멀티샵을 열 수 있어 고객 만족도가 높습니다.",
              },
              {
                num: "03",
                title: "어려운 시험 면제",
                desc: "복잡한 실기·필기 시험 없이, 정해진 수업만 이수하면 면허증을 받을 수 있습니다.",
              },
              {
                num: "04",
                title: "시간과 비용 대폭 절약",
                desc: "분야별 자격증을 따로 취득하면 500만 원 이상·2년 이상이 필요하지만, 종합면허증은 150~250만 원, 1~1.5년이면 충분합니다.",
              },
              {
                num: "05",
                title: "100% 온라인 진행",
                desc: "수업과 시험이 모두 온라인으로 진행되어 직장을 다니면서도 편하게 준비할 수 있습니다.",
              },
            ].map((item, i, arr) => (
              <div
                key={item.num}
                className={i === arr.length - 1 ? "md:col-span-2" : ""}
                style={{ background: "#ffffff", borderRadius: 16, padding: "22px 24px", display: "flex", alignItems: "flex-start", gap: 16, border: "1px solid #e5e7eb" }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: "#fff" }}>{item.num}</span>
                </div>
                <div>
                  <p style={{ fontSize: 15, fontWeight: 700, color: "#111", marginBottom: 6 }}>{item.title}</p>
                  <p style={{ fontSize: 13, color: "#666", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 미용면허 취득 경로 섹션 ── */}
      <section className="w-full bg-white py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-14">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              취득 경로
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              학점은행제로 미용면허 취득하기
            </h2>
            <p className="text-sm text-gray-500">두 단계만 거치면 종합미용면허증을 발급받을 수 있습니다</p>
          </div>

          {/* 2단계 경로 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* STEP 1 */}
            <div style={{ borderRadius: 20, border: "1.5px solid " + NAVY, overflow: "hidden" }}>
              <div style={{ background: NAVY, padding: "28px 24px 20px" }}>
                <div style={{ display: "inline-block", background: "rgba(255,255,255,0.2)", color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 10 }}>
                  STEP 1
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(255,255,255,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Scissors size={22} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: "#fff" }}>미용 관련 학위 취득</h3>
                </div>
              </div>
              <div style={{ padding: "22px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <SubjectItem text="학점은행제로 미용 관련 전문학사 취득" />
                  <SubjectItem text="온라인 강의 중심, 자격증·기존 학점 인정 병행 가능" />
                  <SubjectItem text="전문학사(80학점)만으로 면허 발급 자격 충족" />
                  <SubjectItem text="고졸 80학점 / 전문대졸 이상 36학점" />
                </div>
              </div>
            </div>

            {/* STEP 2 */}
            <div style={{ borderRadius: 20, border: "1px solid #e5e7eb", overflow: "hidden" }}>
              <div style={{ background: "#EEF2FF", padding: "28px 24px 20px" }}>
                <div style={{ display: "inline-block", background: NAVY, color: "#fff", fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 20, marginBottom: 10 }}>
                  STEP 2
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: NAVY, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Award size={22} color="#fff" />
                  </div>
                  <h3 style={{ fontSize: 18, fontWeight: 700, color: NAVY }}>종합미용면허증 발급</h3>
                </div>
              </div>
              <div style={{ padding: "22px 24px 28px" }}>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  <SubjectItem text="별도의 국가자격시험·실기시험 없이 학위 취득만으로 면허 발급 자격 충족" />
                  <SubjectItem text="시·군·구청 민원센터 방문 신청" />
                  <SubjectItem text="헤어·피부·네일·메이크업 4개 분야 모두 시술·창업 가능한 종합면허" />
                </div>
              </div>
            </div>
          </div>

          {/* 안내 배너 */}
          <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 14, padding: "18px 24px", display: "flex", alignItems: "flex-start", gap: 12 }}>
            <span style={{ fontSize: 20, flexShrink: 0 }}>💡</span>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "#92400E", marginBottom: 4 }}>미용 학위, 취업에도 바로 활용됩니다</p>
              <p style={{ fontSize: 13, color: "#78350F", lineHeight: 1.7 }}>
                미용 관련 학위는 종합미용면허 발급 외에도 뷰티샵 창업, 뷰티 관련 기업 취업, 뷰티 강사 활동 등 다양한 분야에서 경쟁력을 높여줍니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 취득 플랜 섹션 ── */}
      <section className="w-full bg-[#F8F9FA] py-20 px-6">
        <div className="mx-auto max-w-5xl">
          <div className="text-center mb-12">
            <span className="inline-block text-xs font-medium text-[#1a1aad] bg-[#EEF2FF] px-3 py-1 rounded-full mb-4 tracking-widest">
              취득 플랜
            </span>
            <h2 className="text-3xl font-bold tracking-tight text-black md:text-4xl mb-3">
              내 학력에 맞는 플랜을 확인하세요
            </h2>
            <p className="text-sm text-gray-500">전문학사(80학점) 취득 시 종합미용면허증 발급이 가능합니다</p>
          </div>

          <div style={{ background: "#ffffff", borderRadius: 20, padding: "36px 32px", border: "1px solid #e5e7eb" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 600, color: NAVY, background: "#EEF2FF", padding: "3px 12px", borderRadius: 20 }}>전문학사 (80학점)</span>
              <h3 style={{ fontSize: 22, fontWeight: 700, color: "#111" }}>학력별 취득 플랜</h3>
            </div>
            <p style={{ fontSize: 13, color: "#888", marginBottom: 28 }}>80학점 취득 시 전문학사 취득 → 종합미용면허증 발급 가능</p>

            <div style={{ overflowX: "auto", marginBottom: 28 }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ background: "#F8F9FA" }}>
                    <th style={{ padding: "12px 16px", textAlign: "left", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>현재 학력</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>추가 필요 학점</th>
                    <th style={{ padding: "12px 16px", textAlign: "center", fontWeight: 700, color: "#111", borderBottom: "2px solid #e5e7eb" }}>예상 기간</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>고졸</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>80학점</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>약 1~1.5년</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>전문대졸 이상</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>전공 36학점 (의무 18학점 포함)</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>약 1년 (2학기)</td>
                  </tr>
                  <tr style={{ borderBottom: "1px solid #f0f0f0" }}>
                    <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>4년제 대졸 (타전공)</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>전공 36학점 (의무 18학점 포함)</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>약 1년 (2학기)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: "12px 16px", color: "#444", fontWeight: 600 }}>대학 중퇴</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: NAVY, fontWeight: 600 }}>보유학점에 따라 상이</td>
                    <td style={{ padding: "12px 16px", textAlign: "center", color: "#444" }}>상담 후 확인</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p style={{ fontSize: 14, fontWeight: 700, color: "#111", marginBottom: 12 }}>주요 이수 과목 예시</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {["미용경영학", "미용과건강", "미용문화사", "미용색채학", "미용학개론", "피부미용학", "화장품학", "모발과학", "사진학개론Ⅰ", "식품보건산업학", "의상학", "코디네이트미학"].map((s) => (
                <div key={s} style={{ background: "#F8F9FA", borderRadius: 8, padding: "8px 12px", fontSize: 12, color: "#444" }}>{s}</div>
              ))}
            </div>
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

      <Footer />
    </div>
  );
}
