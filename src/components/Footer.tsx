import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-white py-10" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
      <div
        className="mx-auto max-w-6xl px-4 md:px-6 text-center"
        style={{ color: "rgba(0,0,0,0.4)", fontSize: 11, lineHeight: 1.9 }}
      >
        <p className="font-semibold" style={{ color: "rgba(0,0,0,0.65)", fontSize: 12 }}>
          서플라이에듀케이션
        </p>
        <p>주식회사 라인에듀 | 대표 안진규</p>
        <p>사업자등록번호 525-87-02809</p>
        <p>서울특별시 마포구 이노베이션로 130, 3층 3563호(상암동, 기린빌딩)</p>
        <p>이메일 dwrzzang@gmail.com | 대표전화 010-2244-3463</p>
        <div className="mt-3 flex justify-center gap-5" style={{ fontSize: 11 }}>
          <Link href="/privacy" className="hover:underline" style={{ color: "rgba(0,0,0,0.5)" }}>
            개인정보처리방침
          </Link>
        </div>
        <p className="mt-2">
          © {new Date().getFullYear()} Supply Education. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
