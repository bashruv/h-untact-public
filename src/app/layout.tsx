import { Popup } from "@/components/popup";
import type { Metadata, Viewport } from "next";
import { Noto_Sans_KR } from "next/font/google";

import "tailwindcss/tailwind.css";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "H.Untact",
  description: "화면 너머 작품들에게, Hello! Untact!",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body
        className={`${notoSansKr.className} bg-grayscale-pure-black text-grayscale-white`}
      >
        <Popup />
        {children}
      </body>
    </html>
  );
}
