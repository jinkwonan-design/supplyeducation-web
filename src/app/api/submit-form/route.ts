import { kv } from "@vercel/kv";
import { google } from "googleapis";

const STATUS_MAP: Record<string, string> = {
  high_school: "고등학교 졸업",
  college: "대학교 중퇴·재학",
  worker: "직장인",
  athlete: "선수·코치 출신",
  other: "기타",
};

// 텔레그램 알림
async function sendTelegramAlert(entry: {
  name: string;
  phone: string;
  course: string;
  status: string;
  date: string;
  utm: string;
}) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  const text =
    `🔔 새 상담 신청\n\n` +
    `👤 이름: ${entry.name}\n` +
    `📞 연락처: ${entry.phone}\n` +
    `📚 과정: ${entry.course}\n` +
    `🎓 학력: ${entry.status}\n` +
    `🕒 신청시각: ${entry.date}\n` +
    `📈 유입: ${entry.utm}`;

  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text }),
    });
  } catch (err) {
    console.error("[telegram-alert]", err);
  }
}

// 구글 시트 자동 기록
async function appendToSheet(entry: {
  name: string;
  phone: string;
  course: string;
  status: string;
  date: string;
  utm: string;
}) {
  try {
    const keyStr = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!keyStr || !spreadsheetId) return;

    const key = JSON.parse(keyStr);
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });

    const sheets = google.sheets({ version: "v4", auth });
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: "문의현황!A:F",
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [[
          "",             // 담당자 (수동 입력)
          entry.name,     // 이름
          entry.phone,    // 연락처
          entry.course,   // 과정
          "",             // 결제여부 (수동 입력)
          entry.date,     // 신청일자
        ]],
      },
    });
  } catch (err) {
    console.error("[sheet-append]", err);
  }
}

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

    // 텔레그램 알림 + 시트 기록 동시 실행
    await Promise.all([
      sendTelegramAlert(entry),
      appendToSheet(entry),
    ]);

    return Response.json({ success: true });
  } catch (error) {
    console.error("[submit-form]", error);
    return Response.json(
      { success: false, error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}