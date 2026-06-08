import { google } from "googleapis";

export async function GET() {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_KEY) {
    console.error("[get-submissions] GOOGLE_SERVICE_ACCOUNT_KEY 환경변수 없음");
    return Response.json(
      { success: false, error: "서버 설정 오류: GOOGLE_SERVICE_ACCOUNT_KEY 미설정" },
      { status: 500 }
    );
  }
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) {
    console.error("[get-submissions] GOOGLE_SHEETS_SPREADSHEET_ID 환경변수 없음");
    return Response.json(
      { success: false, error: "서버 설정 오류: GOOGLE_SHEETS_SPREADSHEET_ID 미설정" },
      { status: 500 }
    );
  }

  try {
    const key = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY);
    key.private_key = key.private_key.replace(/\\n/g, "\n");
    const auth = new google.auth.GoogleAuth({
      credentials: key,
      scopes: ["https://www.googleapis.com/auth/spreadsheets.readonly"],
    });
    const sheets = google.sheets({ version: "v4", auth });

    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEETS_SPREADSHEET_ID,
      range: "A:G",
    });

    const rows = res.data.values ?? [];
    const dataRows =
      rows.length > 0 && rows[0][0] === "이름" ? rows.slice(1) : rows;

    const data = [...dataRows].reverse().map((row, i) => ({
      no: dataRows.length - i,
      name: row[0] ?? "",
      phone: row[1] ?? "",
      status: row[2] ?? "",
      utm: row[3] ?? "",
      date: row[4] ?? "",
      course: row[5] ?? "",
      calculatorData: row[6] ?? "",
    }));

    return Response.json({ success: true, data });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    console.error("[get-submissions]", msg);

    if (msg.includes("invalid_grant") || msg.includes("unauthorized")) {
      return Response.json(
        { success: false, error: "Google 인증 실패: 서비스 계정 키를 확인하세요" },
        { status: 500 }
      );
    }
    if (msg.includes("PERMISSION_DENIED") || msg.includes("403")) {
      return Response.json(
        { success: false, error: "권한 없음: 스프레드시트에 서비스 계정을 공유해주세요" },
        { status: 500 }
      );
    }
    if (msg.includes("404") || msg.includes("not found")) {
      return Response.json(
        { success: false, error: "스프레드시트를 찾을 수 없음: SPREADSHEET_ID를 확인하세요" },
        { status: 500 }
      );
    }

    return Response.json(
      { success: false, error: `데이터 조회 실패: ${msg}` },
      { status: 500 }
    );
  }
}
