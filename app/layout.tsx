import type { Metadata } from "next";
import "tailwindcss/tailwind.css";

export const metadata: Metadata = {
  title: "H.Untact",
  description: "화면 너머 작품들에게, Hello! Untact!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="bg-grayscale-pure-black text-grayscale-white">
        {children}
      </body>
    </html>
  );
}
