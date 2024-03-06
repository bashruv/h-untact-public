import ArchiveGrid from "@/src/components/archive-grid";
import prisma from "@/src/lib/prisma";

export default async function Archive() {
  const users = await prisma.$transaction(
    ["D", "I", "M"].flatMap((type) =>
      [3, 2, 1].map((grade) =>
        prisma.work_list.findMany({
          where: {
            type: { equals: type },
            artist: { grade: { equals: grade } },
          },
          select: {
            id: true,
            title: true,
            type: true,
            artist_name: true,
            thumbnail: true,
            artist: {
              select: {
                name: true,
                grade: true,
              },
            },
          },
        }),
      ),
    ),
  );

  return (
    <>
      {users.map((val, idx) => (
        <ArchiveGrid key={idx}>
          <ArchiveGrid.Head>
            <p>3학년</p>
          </ArchiveGrid.Head>
          {val.map((val) => (
            <ArchiveGrid.Item key={val.id} {...val} />
          ))}
        </ArchiveGrid>
      ))}
    </>
  );
}
