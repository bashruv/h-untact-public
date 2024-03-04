import ArchiveGrid from "@/src/components/layout/archive-grid";
import prisma from "@/src/lib/prisma";

export default async function Archive() {
  const users = await prisma.work_list.findUnique({
    where: { id: 133051 },
  });

  return (
    <ArchiveGrid>
      {users.map((val) => (
        <ArchiveGrid.Item key={val.id} {...val} />
      ))}
    </ArchiveGrid>
  );
}
