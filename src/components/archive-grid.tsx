"use client";

import Link from "next/link";
import Image from "next/image";
import { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { Prisma } from "@prisma/client";

import { archiveList } from "@/lib/prisma/transaction";

import archive_grid from "@/styles/archive-grid.module.scss";
import { getWorkType, gradeValue, workTypeValue } from "@/utils";

type Archive =
  Prisma.PromiseReturnType<typeof archiveList> extends Array<infer U>
    ? U
    : never;

export function Root({ children }: { children: ReactNode }) {
  return <div className={archive_grid.root}>{children}</div>;
}

interface WrapProps {
  children: ReactNode;
  query: Archive["query"];
  lastWrap: boolean;
}

export function Wrap({ children, query, lastWrap }: WrapProps) {
  const [wrapHeight, setHeight] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (wrapRef.current) {
      setHeight(wrapRef.current.clientHeight);
    }
  }, [wrapHeight]);

  return (
    <>
      <div
        id={`${query.type}-${query.grade}`}
        className={archive_grid.wrap}
        ref={wrapRef}
      >
        {children}
      </div>
      {lastWrap && (
        <div
          style={{
            height: `calc(100vh - ${wrapHeight}px)`,
          }}
        />
      )}
    </>
  );
}

export function Head({ query }: { query: Archive["query"] }) {
  function handleSelectWidth() {
    switch (query.type) {
      case "D":
        return "90px";
      case "I":
        return "178px";
      case "M":
        return "132px";
    }
  }

  function handleHref({ type, grade }: { type?: string; grade?: string }) {
    window.location.href = `/archive#${type || query.type}-${grade || query.grade}`;
  }

  return (
    <div className={archive_grid.head}>
      <select
        defaultValue={query.grade}
        onChange={(e) => {
          if (e.currentTarget.value !== query.grade.toString()) {
            handleHref({ grade: e.currentTarget.value });
            e.currentTarget.value = query.grade.toString();
          }
        }}
        className="bg-transparent"
      >
        {gradeValue.map((val) => (
          <option key={val} value={val}>
            {val}학년
          </option>
        ))}
      </select>
      <select
        defaultValue={query.type}
        onChange={(e) => {
          if (e.currentTarget.value !== query.type) {
            handleHref({ type: e.currentTarget.value });
            e.currentTarget.value = query.type;
          }
        }}
        className="bg-transparent"
        style={{
          width: handleSelectWidth(),
        }}
      >
        {workTypeValue.map((val) => (
          <option key={val} value={val}>
            {getWorkType(val)}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Body({ children }: { children: ReactNode }) {
  return <div className={archive_grid.body}>{children}</div>;
}

type ItemProps = Archive["data"] extends Array<infer U> ? U : never;

export function Item(props: ItemProps) {
  const { id, thumbnail, title, artist, artist_name } = props;

  return (
    <Link
      href={`/archive/${id}`}
      target="_blank"
      className={archive_grid.item}
      key={id}
    >
      <Suspense fallback={<div className="animate-pulse" />}>
        <Image
          className={archive_grid.img}
          src={thumbnail}
          alt={title}
          width={500}
          height={500}
        />
      </Suspense>
      <div>
        <p className="text-16px">{title}</p>
        <p className="text-12px">{`${artist.grade}학년 ${artist_name || artist.name}`}</p>
      </div>
    </Link>
  );
}
