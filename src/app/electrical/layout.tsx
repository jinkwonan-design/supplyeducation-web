import type { Metadata } from "next";

// electrical/page.tsx 는 "use client" 이므로 metadata 를 직접 export 할 수 없습니다.
// 서버 컴포넌트 layout 에서 이 라우트의 OG/메타데이터를 재정의합니다.
// metadataBase 와 og:image 경로는 루트 layout.tsx 에서 상속받습니다.
export const metadata: Metadata = {
  title: "전기공학사 학위 취득 | 서플라이에듀케이션",
  description:
    "시공·감리·건설사, 학위 하나면 세 곳 다 열립니다. 100% 온라인 취득.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "서플라이에듀케이션",
    title: "전기공학사 학위 취득 | 서플라이에듀케이션",
    description:
      "시공·감리·건설사, 학위 하나면 세 곳 다 열립니다. 100% 온라인 취득.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "서플라이에듀케이션 · 학점은행제 전문 상담",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "전기공학사 학위 취득 | 서플라이에듀케이션",
    description:
      "시공·감리·건설사, 학위 하나면 세 곳 다 열립니다. 100% 온라인 취득.",
    images: ["/og-image.png"],
  },
};

export default function ElectricalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
