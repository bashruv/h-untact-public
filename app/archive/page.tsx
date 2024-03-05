import ArchiveGrid from "@/src/components/layout/archive-grid";
import prisma from "@/src/lib/prisma";

export default async function Archive() {
  const users = await prisma.work_list.findMany({
    where: { type: { equals: "D" }, artist: { grade: { equals: 3 } } },
  });

  return (
    <>
      <ArchiveGrid>
        {users.map((val) => (
          <ArchiveGrid.Item key={val.id} {...val} />
        ))}
      </ArchiveGrid>
    </>
  );
}
