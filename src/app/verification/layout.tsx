import Image from "next/image";
import { Metadata, Viewport } from "next";

import HUntactLogo from "@/assets/h-untact-logo-symbol.svg";

export const metadata: Metadata = {
  title: "Verification | H.Untact",
  description: "화면 너머 작품들에게, Hello! Untact!",
};

export const viewport: Viewport = {
  themeColor: "#1e1e1e",
};

export default function VerificationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex min-h-screen items-center border bg-grayscale-dark">
      <section className="mx-auto flex w-full max-w-screen-md flex-col px-4 py-6">
        <Image src={HUntactLogo} height={80} alt="H. Untact" />
        <h1 className="text-30px">Verification</h1>
        <br />
        {children}
      </section>
    </main>
  );
}
