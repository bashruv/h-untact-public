import { artists, work_list } from "@prisma/client";
import Image from "next/image";

type ItemProps = Pick<
  work_list,
  "id" | "title" | "thumbnail" | "artist_name"
> & {
  artist: Pick<artists, "name" | "grade">;
};

function Grid({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className="grid grid-cols-2">{children}</div>;
}

function Head({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="col-span-full flex h-[4.125rem] border border-grayscale-white bg-grayscale-dark">
      {children}
    </div>
  );
}

async function Item(props: ItemProps) {
  const { id, title, artist, artist_name, thumbnail } = props;

  return (
    <div>
      <Image src={thumbnail} alt={title} width={200} height={200} />
      <p>{title}</p>
      <p>
        <span>{artist_name || `${artist.grade}학년 ${artist.name}`}</span>
      </p>
    </div>
  );
}

export default Object.assign(Grid, { Head, Item });
