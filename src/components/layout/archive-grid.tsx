import { work_list } from "@prisma/client";
import Image from "next/image";
import prisma from "@/src/lib/prisma";

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid grid-cols-2">{children}</div>;
}

async function Item(props: work_list) {
  const { id, title, artist_id, artist_footnote, thumbnail } = props;

  const artist = await prisma.artists.findUnique({
    where: { id: artist_id },
  });

  return (
    <div>
      <Image src={thumbnail} alt={title} width={200} height={200} />
      <p>{title}</p>
      <p>
        <span>{artist.name}</span>
      </p>
    </div>
  );
}

export default Object.assign(Grid, { Item });
