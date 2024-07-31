import { archiveList, archiveListWithSearch } from "@/lib/prisma/transaction";
import * as ArchiveGrid from "@/components/archive-grid";
import { ArchiveSearch } from "@/components/archive-search";

export default async function Archive({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  let list;

  if (searchParams && searchParams.q) {
    const rawList = await archiveListWithSearch(searchParams.q);
    list = rawList.filter(({ data }) => data.length > 0);
  } else {
    list = await archiveList();
  }

  return (
    <>
      <ArchiveGrid.Root>
        {list.map(({ data, query }, idx) => (
          <ArchiveGrid.Wrap
            query={query}
            key={idx}
            lastWrap={idx === list.length - 1}
          >
            <ArchiveGrid.Head query={query} />
            <ArchiveGrid.Body>
              {data.map((val) => (
                <ArchiveGrid.Item key={val.id} {...val} />
              ))}
            </ArchiveGrid.Body>
          </ArchiveGrid.Wrap>
        ))}
      </ArchiveGrid.Root>
      <ArchiveSearch params={searchParams.q} />
    </>
  );
}
