/* eslint-disable @next/next/no-img-element */

export function DetailImageView({
  images,
  youtubeUrl,
}: {
  images: string[];
  youtubeUrl: string | null;
}) {
  return (
    <div className="flex w-full flex-col overflow-y-auto bg-grayscale-pure-black p-4 lg:p-6 lg:scrollbar-thin lg:scrollbar-track-grayscale-pure-black lg:scrollbar-thumb-grayscale-deep">
      {youtubeUrl && (
        <iframe
          src={youtubeUrl}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="aspect-video"
        />
      )}
      {images.map((url) => (
        <img src={url} alt={url} key={url} className="my-auto w-full" />
      ))}
    </div>
  );
}
