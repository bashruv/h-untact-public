import prisma from "@/api/prisma";
import { gradeValue, workTypeValue } from "@/constants";

export async function archiveList() {
  const queries = workTypeValue.flatMap((type) =>
    gradeValue.map((grade) => {
      const whereCondition = {
        type: { equals: type },
        artist: { grade: { equals: grade } },
      };

      const orderByCondition = [
        {
          artist: {
            id: "asc" as const,
          },
        },
        {
          id: "asc" as const,
        },
      ];

      const selectFields = {
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
      };

      return prisma.work_list.findMany({
        where: whereCondition,
        orderBy: orderByCondition,
        select: selectFields,
      });
    }),
  );

  const results = await prisma.$transaction(queries);

  const combinedResults = results.map((result, index) => {
    const typeIndex = Math.floor(index / gradeValue.length);
    const gradeIndex = index % gradeValue.length;
    const type = workTypeValue[typeIndex];
    const grade = gradeValue[gradeIndex];

    return {
      query: { type, grade },
      data: result,
    };
  });

  return combinedResults;
}

export async function archiveListWithSearch(searchText: string) {
  const OR = searchText.split(" ").flatMap((word) => [
    {
      title: {
        contains: word,
      },
    },
    {
      artist_name: {
        contains: word,
      },
    },
    {
      artist: {
        name: {
          contains: word,
        },
      },
    },
  ]);

  const queries = workTypeValue.flatMap((type) =>
    gradeValue.map((grade) => {
      const whereCondition = {
        OR,
        type: { equals: type },
        artist: { grade: { equals: grade } },
      };

      const orderByCondition = [
        {
          artist: {
            id: "asc" as const,
          },
        },
        {
          id: "asc" as const,
        },
      ];

      const selectFields = {
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
      };

      return prisma.work_list.findMany({
        where: whereCondition,
        orderBy: orderByCondition,
        select: selectFields,
      });
    }),
  );

  const results = await prisma.$transaction(queries);

  const combinedResults = results.map((result, index) => {
    const typeIndex = Math.floor(index / gradeValue.length);
    const gradeIndex = index % gradeValue.length;
    const type = workTypeValue[typeIndex];
    const grade = gradeValue[gradeIndex];

    return {
      query: { type, grade },
      data: result,
    };
  });

  return combinedResults;
}

export async function work(id: number) {
  return await prisma.work_list.findUnique({
    where: { id },
    select: {
      title: true,
      images: true,
      artist_name: true,
      type_detail: true,
      desc: true,
      yt_url: true,
      artist: {
        select: {
          name: true,
          grade: true,
          works: {
            select: {
              id: true,
              thumbnail: true,
              title: true,
            },
          },
          artist_sns: {
            select: {
              platform: true,
              url: true,
            },
          },
        },
      },
    },
  });
}

export async function workForMetadata(id: number) {
  return await prisma.work_list.findUnique({
    where: { id },
    select: {
      title: true,
      desc: true,
      thumbnail: true,
    },
  });
}
