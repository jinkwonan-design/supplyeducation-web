import { kv } from "@vercel/kv";

const STATUS_MAP: Record<string, string> = {
  high_school: "고등학교 졸업",
  college: "대학교 중퇴·재학",
  worker: "직장인",
  athlete: "선수·코치 출신",
  other: "기타",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, phone, course, status, calculatorData, utm_source, utm_medium, utm_campaign } = body;

    const kst = new Intl.DateTimeFormat("ko-KR", {
      timeZone: "Asia/Seoul",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date());

    const utmStr =
      [utm_source, utm_medium, utm_campaign].filter(Boolean).join("/") || "-";

    const entry = {
      id: Date.now(),
      name: name ?? "",
      phone: phone ?? "",
      status: STATUS_MAP[status] ?? status ?? "",
      utm: utmStr,
      date: kst,
      course: course ?? "",
      calculatorData: calculatorData ?? "",
    };

    await kv.lpush("submissions", JSON.stringify(entry));

    return Response.json({ success: true });
  } catch (error) {
    console.error("[submit-form]", error);
    return Response.json(
      { success: false, error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
