import { Metadata, Viewport } from "next";

export const metadata: Metadata = {
  title: "Archive | H.Untact",
  description: "화면 너머 작품들에게, Hello! Untact!",
};

export const viewport: Viewport = {
  themeColor: "#1e1e1e",
};

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="bg-grayscale-dark">{children}</main>;
}
