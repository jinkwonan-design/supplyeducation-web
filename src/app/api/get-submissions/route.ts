import { kv } from "@vercel/kv";

export async function GET() {
  try {
    const raw = await kv.lrange("submissions", 0, -1);

    const data = raw.map((item, i) => {
      const parsed: Record<string, string | number> =
        typeof item === "string" ? JSON.parse(item) : (item as Record<string, string | number>);
      return {
        no: raw.length - i,
        name: parsed.name ?? "",
        phone: parsed.phone ?? "",
        status: parsed.status ?? "",
        utm: parsed.utm ?? "",
        date: parsed.date ?? "",
        course: parsed.course ?? "",
        calculatorData: parsed.calculatorData ?? "",
      };
    });

    return Response.json({ success: true, data });
  } catch (error) {
    console.error("[get-submissions]", error);
    return Response.json(
      { success: false, error: "데이터 조회에 실패했습니다" },
      { status: 500 }
    );
  }
}
