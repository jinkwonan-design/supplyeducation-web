import Link from "next/link";
import Footer from "@/components/Footer";

export const metadata = { title: "개인정보처리방침 | 서플라이에듀케이션" };

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col font-sans text-black antialiased">
      {/* 헤더 */}
      <header className="border-b bg-white px-6 py-4" style={{ borderColor: "rgba(0,0,0,0.08)" }}>
        <div className="mx-auto flex max-w-3xl items-center justify-between">
          <Link href="/" className="text-base font-bold text-black">
            서플라이에듀케이션
          </Link>
          <Link href="/" className="text-xs text-gray-400 hover:text-gray-600">
            ← 메인으로
          </Link>
        </div>
      </header>

      {/* 본문 */}
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-12">
        <h1 className="mb-2 text-2xl font-bold text-black">개인정보처리방침</h1>
        <p className="mb-10 text-sm text-gray-400">시행일: 2025년 6월 8일</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-700">
          <p>
            주식회사 라인에듀(이하 "회사")는 「개인정보 보호법」에 따라 이용자의 개인정보를 보호하고,
            이와 관련한 고충을 신속하게 처리하기 위하여 다음과 같이 개인정보처리방침을 수립·공개합니다.
          </p>

          <section>
            <h2 className="mb-3 text-base font-bold text-black">제1조 (수집하는 개인정보 항목 및 수집 방법)</h2>
            <p>회사는 상담 신청을 위해 아래 개인정보를 수집합니다.</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
              <li>수집 항목: 이름, 연락처(휴대전화번호), 상담 희망 내용</li>
              <li>수집 방법: 홈페이지 상담 신청 폼</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold text-black">제2조 (개인정보의 수집·이용 목적)</h2>
            <p>수집한 개인정보는 다음 목적에 의해 이용됩니다.</p>
            <ul className="mt-2 list-disc pl-5 space-y-1 text-gray-600">
              <li>학점은행제·대졸자전형 상담 안내 및 학습 지원</li>
              <li>서비스 관련 공지사항 전달</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold text-black">제3조 (개인정보의 보유 및 이용 기간)</h2>
            <p>
              수집된 개인정보는 수집·이용 목적 달성 후 지체 없이 파기하며, 보존 기간은
              상담 완료일로부터 1년입니다. 단, 관계 법령에 의해 보존이 필요한 경우 해당 기간 동안 보관합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold text-black">제4조 (개인정보의 제3자 제공)</h2>
            <p>
              회사는 이용자의 동의 없이 개인정보를 제3자에게 제공하지 않습니다.
              다만, 법률에 특별한 규정이 있는 경우에는 예외로 합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold text-black">제5조 (개인정보의 파기 절차 및 방법)</h2>
            <ul className="list-disc pl-5 space-y-1 text-gray-600">
              <li>전자적 파일: 복구 불가능한 방법으로 영구 삭제</li>
              <li>종이 문서: 분쇄기로 분쇄 또는 소각</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold text-black">제6조 (이용자의 권리·의무 및 행사 방법)</h2>
            <p>
              이용자는 언제든지 본인의 개인정보에 대해 열람, 수정, 삭제, 처리 정지를 요구할 수 있으며,
              아래 연락처로 요청하시면 지체 없이 조치하겠습니다.
            </p>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold text-black">제7조 (개인정보 보호책임자)</h2>
            <div className="rounded-lg bg-gray-50 p-4 text-gray-600">
              <p>성명: 안진규</p>
              <p>직위: 대표이사</p>
              <p>이메일: dwrzzang@gmail.com</p>
              <p>전화: 010-2244-3463</p>
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-base font-bold text-black">제8조 (개인정보처리방침의 변경)</h2>
            <p>
              이 방침은 시행일로부터 적용되며, 변경 사항이 있을 경우 홈페이지를 통해 공지합니다.
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
