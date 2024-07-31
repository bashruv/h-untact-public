import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";

import { randomString } from "@/utils";
import { work } from "@/lib/prisma/transaction";
import { SNSButton } from "@/components/sns-button";
import { CloseButton } from "@/components/close-button";
import { DetailImageView } from "@/components/detail-image";

export default async function DetailPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  const detail = await work(id);

  if (!detail) {
    return notFound();
  }

  const otherWorks = detail.artist.works.filter((val) => val.id !== id);

  return (
    <main className="flex min-h-screen flex-col border lg:h-screen lg:flex-row">
      <div className="flex items-start justify-between border-b p-5 lg:hidden">
        <div className="flex flex-col gap-1">
          <h1 className="break-keep text-24px">{detail.title}</h1>
          <p className="text-12px">
            {detail.artist.grade}학년 {detail.artist_name || detail.artist.name}{" "}
            - {detail.type_detail}
          </p>
        </div>
        <div className="mt-2 h-5 w-5">
          <CloseButton />
        </div>
      </div>
      <DetailImageView images={detail.images} youtubeUrl={detail.yt_url} />
      <div className="w-full flex-shrink-0 border-t lg:w-1/4 lg:min-w-96 lg:overflow-y-auto lg:border-l lg:border-t-0">
        <div className="hidden items-start justify-between border-b p-5 lg:flex">
          <div className="flex flex-col gap-1">
            <h1 className="break-keep text-24px">{detail.title}</h1>
            <p className="text-12px">
              {detail.artist.grade}학년{" "}
              {detail.artist_name || detail.artist.name} - {detail.type_detail}
            </p>
          </div>
          <div className="mt-2 h-5 w-5">
            <CloseButton />
          </div>
        </div>
        <div className="flex flex-col gap-4 p-6">
          {/* 현재 \n에서 역슬래시가 2개 들어가 있음 */}
          {detail.desc && (
            <div className="whitespace-pre-line text-12px text-grayscale-gray">
              {detail.desc.split("\\n").join("\n")}
            </div>
          )}
          {detail.artist.artist_sns.length > 0 && (
            <div className="flex gap-1">
              {detail.artist.artist_sns.map((val) => (
                <SNSButton key={val.url} {...val} />
              ))}
            </div>
          )}
        </div>
        {otherWorks.length > 0 && (
          <div className="border-t p-6">
            <p>
              <strong>{detail.artist.name}</strong>의 작품 더보기
            </p>
            <div className="grid grid-cols-3 pt-5">
              {otherWorks.map((val) => (
                <Link
                  className="border border-grayscale-white"
                  key={`${val.title}-${randomString()}`}
                  href={`/archive/${val.id}`}
                  target="_blank"
                >
                  <Image
                    src={val.thumbnail}
                    alt={val.title}
                    width={500}
                    height={500}
                  />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
