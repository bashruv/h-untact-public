"use client";

import Image from "next/image";

interface SNSButtonProps {
  platform: string;
  url: string;
}

export function SNSButton({ platform, url }: SNSButtonProps) {
  const iconUrl = require(`@/assets/sns/${platform}.svg`);

  return (
    <a href={url} target="_blank" rel="noreferrer noopener">
      <Image src={iconUrl} alt={platform} />
    </a>
  );
}
