"use client";

import { useEffect, useState, useCallback } from "react";

interface Submission {
  no: number;
  name: string;
  phone: string;
  status: string;
  utm: string;
  date: string;
  course: string;
  calculatorData: string;
}

interface CalcData {
  course?: string;
  edu?: string;
  credits?: string;
  certs?: string;
  period?: string;
  cost?: string;
}

const PASS = "supply2024";
const NAVY = "#1B2A4A";

const COURSE_COLORS: Record<string, string> = {
  "사회복지사 2급":        "#7c3aed",
  "보육교사 2급":          "#db2777",
  "기사·산업기사 응시자격": "#d97706",
  "미용학위(종합미용면허증)": "#0891b2",
  "체육학사":              "#16a34a",
  "컴퓨터공학사":          "#2563eb",
  "전기공학사":            "#dc2626",
};

function courseColor(course: string) {
  return COURSE_COLORS[course] ?? "#6b7280";
}

function exportCSV(data: Submission[]) {
  const header = ["번호", "이름", "연락처", "관심과정", "현재상태", "신청일시", "UTM"];
  const rows = data.map((r) => [
    r.no, r.name, r.phone, r.course, r.status, r.date, r.utm,
  ]);
  const csv = [header, ...rows]
    .map((row) => row.map((v) => `"${String(v).replace(/"/g, '""')}"`).join(","))
    .join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `상담신청_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

export default function AdminPage() {
  const [auth, setAuth]         = useState(false);
  const [pw, setPw]             = useState("");
  const [pwError, setPwError]   = useState(false);
  const [data, setData]         = useState<Submission[]>([]);
  const [loading, setLoading]   = useState(false);
  const [fetchError, setFetchError] = useState("");
  const [search, setSearch]     = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const load = useCallback(() => {
    setLoading(true);
    setFetchError("");
    fetch("/api/get-submissions")
      .then((r) => r.json())
      .then((json) => {
        if (json.success) setData(json.data);
        else setFetchError(json.error ?? "데이터 조회 실패");
      })
      .catch(() => setFetchError("네트워크 오류"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (auth) load();
  }, [auth, load]);

  function handleLogin() {
    if (pw === PASS) { setAuth(true); setPwError(false); }
    else setPwError(true);
  }

  /* ── 로그인 화면 ── */
  if (!auth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="w-80 rounded-2xl bg-white p-8 shadow-lg">
          <p className="mb-1 text-xs font-semibold tracking-widest text-gray-400">SUPPLY EDU</p>
          <h1 className="mb-6 text-xl font-bold text-gray-800">관리자 로그인</h1>
          <input
            type="password"
            placeholder="비밀번호"
            value={pw}
            autoFocus
            onChange={(e) => { setPw(e.target.value); setPwError(false); }}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          {pwError && <p className="mt-2 text-xs text-red-500">비밀번호가 올바르지 않습니다</p>}
          <button
            onClick={handleLogin}
            className="mt-4 w-full rounded-lg py-3 text-sm font-bold text-white"
            style={{ background: NAVY }}
          >
            확인
          </button>
        </div>
      </div>
    );
  }

  /* ── 필터링 ── */
  const q = search.trim().toLowerCase();
  const filtered = q
    ? data.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          r.phone.includes(q) ||
          r.course.toLowerCase().includes(q) ||
          r.status.toLowerCase().includes(q)
      )
    : data;

  /* ── 통계 ── */
  const today = new Date().toLocaleDateString("ko-KR", { timeZone: "Asia/Seoul" }).replace(/\. /g, "-").replace(".", "");
  const todayCount = data.filter((r) => r.date.startsWith(today.slice(0, 10).replace(/-/g, ". "))).length;

  /* ── 과정별 집계 ── */
  const courseStats = data.reduce<Record<string, number>>((acc, r) => {
    const key = r.course || "미선택";
    acc[key] = (acc[key] ?? 0) + 1;
    return acc;
  }, {});
  const topCourses = Object.entries(courseStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  /* ── 어드민 화면 ── */
  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div style={{ background: NAVY }} className="px-6 py-5">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <div>
            <p className="text-xs font-semibold tracking-widest text-white/40">SUPPLY EDU</p>
            <h1 className="text-xl font-bold text-white">상담 신청 현황</h1>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => exportCSV(filtered)}
              className="rounded-lg border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 hover:bg-white/10"
            >
              CSV 다운로드
            </button>
            <button
              onClick={load}
              disabled={loading}
              className="rounded-lg bg-white/10 px-4 py-2 text-xs font-semibold text-white hover:bg-white/20 disabled:opacity-50"
            >
              {loading ? "로딩 중…" : "새로고침"}
            </button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-6">
        {/* 통계 카드 */}
        <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[
            { label: "전체 신청", value: data.length + "건" },
            { label: "오늘 신청", value: todayCount + "건" },
            { label: "TOP 과정", value: topCourses[0]?.[0] ?? "-" },
            { label: "TOP 과정 건수", value: topCourses[0] ? topCourses[0][1] + "건" : "-" },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white p-4 shadow-sm">
              <p className="text-xs text-gray-400">{s.label}</p>
              <p className="mt-1 text-lg font-bold text-gray-800 truncate">{s.value}</p>
            </div>
          ))}
        </div>

        {/* 검색 */}
        <div className="mb-4 flex items-center gap-3">
          <input
            type="text"
            placeholder="이름 · 연락처 · 과정 · 상태 검색"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
          />
          {search && (
            <button
              onClick={() => setSearch("")}
              className="text-xs text-gray-400 hover:text-gray-600"
            >
              초기화
            </button>
          )}
          <span className="text-sm text-gray-400">
            {filtered.length}건
          </span>
        </div>

        {/* 에러 */}
        {fetchError && (
          <div className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            {fetchError}
          </div>
        )}

        {/* 데이터 없음 */}
        {!loading && !fetchError && filtered.length === 0 && (
          <div className="rounded-xl bg-white py-16 text-center shadow-sm">
            <p className="text-gray-400">{search ? "검색 결과가 없습니다" : "아직 신청 내역이 없습니다"}</p>
          </div>
        )}

        {/* 목록 */}
        <div className="space-y-2">
          {filtered.map((row) => {
            let calc: CalcData | null = null;
            try { if (row.calculatorData) calc = JSON.parse(row.calculatorData); } catch { /* skip */ }
            const hasCalc = calc && Object.values(calc).some(Boolean);
            const isOpen = expanded === row.no;

            return (
              <div
                key={row.no}
                className="rounded-xl bg-white shadow-sm overflow-hidden"
              >
                {/* 메인 행 */}
                <div
                  className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1 px-5 py-4 hover:bg-gray-50"
                  onClick={() => setExpanded(isOpen ? null : row.no)}
                >
                  {/* 번호 */}
                  <span className="w-7 shrink-0 text-center text-xs font-bold text-gray-300">
                    {row.no}
                  </span>

                  {/* 이름 + 연락처 */}
                  <span className="font-bold text-gray-800">{row.name}</span>
                  <span className="text-sm text-gray-500">{row.phone}</span>

                  {/* 과정 배지 */}
                  {row.course && (
                    <span
                      className="rounded-full px-2.5 py-0.5 text-xs font-semibold text-white"
                      style={{ background: courseColor(row.course) }}
                    >
                      {row.course}
                    </span>
                  )}

                  {/* 현재 상태 */}
                  {row.status && (
                    <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-500">
                      {row.status}
                    </span>
                  )}

                  {/* 계산기 아이콘 */}
                  {hasCalc && (
                    <span className="rounded-full bg-blue-50 px-2 py-0.5 text-xs text-blue-500">
                      계산기
                    </span>
                  )}

                  {/* 날짜 — 오른쪽 */}
                  <span className="ml-auto text-xs text-gray-400">{row.date}</span>
                </div>

                {/* 펼침: 계산기 + UTM */}
                {isOpen && (
                  <div className="border-t border-gray-100 bg-gray-50 px-5 py-4 text-xs text-gray-600">
                    {hasCalc && (
                      <div className="mb-3">
                        <p className="mb-1.5 font-semibold text-gray-500">계산기 입력 정보</p>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1">
                          {calc!.course  && <span>관심 과정: <b>{calc!.course}</b></span>}
                          {calc!.edu     && <span>최종 학력: <b>{calc!.edu}</b></span>}
                          {calc!.credits && <span>보유 학점: <b>{calc!.credits === "0" ? "없음" : calc!.credits + "학점 내외"}</b></span>}
                          {calc!.certs   && <span>보유 자격증: <b>{calc!.certs}</b></span>}
                          {calc!.period && calc!.period !== "—" && <span>예상 기간: <b>{calc!.period}</b></span>}
                          {calc!.cost   && calc!.cost !== "—"   && <span>예상 비용: <b>{calc!.cost}</b></span>}
                        </div>
                      </div>
                    )}
                    {row.utm && row.utm !== "-" && (
                      <p className="text-gray-400">UTM: {row.utm}</p>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* 과정별 통계 */}
        {data.length > 0 && (
          <div className="mt-8 rounded-xl bg-white p-5 shadow-sm">
            <p className="mb-4 text-sm font-bold text-gray-700">과정별 신청 현황</p>
            <div className="space-y-2">
              {topCourses.map(([course, count]) => (
                <div key={course} className="flex items-center gap-3">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ background: courseColor(course) }}
                  />
                  <span className="flex-1 text-sm text-gray-600">{course}</span>
                  <div className="flex items-center gap-2">
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: Math.round((count / data.length) * 120) + "px",
                        background: courseColor(course),
                        opacity: 0.7,
                      }}
                    />
                    <span className="w-8 text-right text-xs text-gray-400">{count}건</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
