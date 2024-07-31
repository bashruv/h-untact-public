import { workForMetadata } from "@/lib/prisma/transaction";
import { Metadata } from "next";

interface MetadataProps {
  params: { id: string };
}

export async function generateMetadata({
  params,
}: MetadataProps): Promise<Metadata> {
  const data = await workForMetadata(Number(params.id));

  if (!data) {
    return {
      title: "ERROR | H.Untact",
    };
  }

  return {
    title: `${data.title} | H.Untact`,
    description: data.desc,
    openGraph: {
      images: [data.thumbnail],
    },
  };
}

export default function ArchiveLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <main className="bg-grayscale-dark">{children}</main>;
}
