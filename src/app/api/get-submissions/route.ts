import { kv } from "@vercel/kv";

export async function GET() {
  try {
    const raw = await kv.lrange("submissions", 0, -1);
    const data = raw
      .map((item) => {
        try {
          return typeof item === "string" ? JSON.parse(item) : item;
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .map((entry, i) => ({ no: i + 1, ...entry }));

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("[get-submissions]", error);
    return Response.json(
      { success: false, error: "데이터 조회 실패" },
      { status: 500 }
    );
  }
}
