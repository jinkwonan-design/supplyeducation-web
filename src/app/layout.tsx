import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 카카오/페이스북이 og:image 를 절대 URL 로 가져가므로 실제 배포 도메인을 사용합니다.
const SITE_URL = "https://www.supplyedu.co.kr";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "서플라이에듀케이션 | 학점은행제 전문 상담",
  description:
    "응시자격부터 학위까지, 1:1 전담 플래너가 최단 경로를 설계합니다",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "서플라이에듀케이션",
    title: "서플라이에듀케이션 | 학점은행제 전문 상담",
    description:
      "응시자격부터 학위까지, 1:1 전담 플래너가 최단 경로를 설계합니다",
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
    title: "서플라이에듀케이션 | 학점은행제 전문 상담",
    description:
      "응시자격부터 학위까지, 1:1 전담 플래너가 최단 경로를 설계합니다",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MetaPixel />
        {/* GTM noscript fallback — body 시작 직후 */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TFHF6H9V"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>

        {/* Meta Pixel noscript fallback */}
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=1652329863197521&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>

        {children}
      </body>

      {/* GTM 메인 스크립트 */}
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TFHF6H9V');`,
        }}
      />

    </html>
  );
}
