"use client";

import Link from "next/link";
import Image from "next/image";
import { Prisma } from "@prisma/client";
import { ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { archiveList } from "@/api/prisma/transaction";
import { generateNodeID, getWorkType } from "@/utils";
import { gradeValue, workTypeValue } from "@/constants";

import archive_grid from "@/styles/archive-grid.module.scss";

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
    function handleHeight() {
      if (wrapRef.current) {
        setHeight(wrapRef.current.clientHeight);
      }
    }
    window.addEventListener("resize", handleHeight);
    handleHeight();
    return () => window.removeEventListener("resize", handleHeight);
  }, [wrapRef]);

  return (
    <>
      <div
        id={generateNodeID(query.type, query.grade.toString())}
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
  const [type, setType] = useState(query.type);
  const [grade, setGrade] = useState(query.grade);

  const path = usePathname();
  const router = useRouter();
  const param = useSearchParams().get("q");

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
    router.replace(
      `${path}${param ? `?q=${encodeURIComponent(param)}` : ""}#${generateNodeID(type || query.type, grade || query.grade.toString())}`,
    );
  }

  useEffect(() => {
    setType(query.type);
  }, [query.type]);

  useEffect(() => {
    setGrade(query.grade);
  }, [query.grade]);

  return (
    <div className={archive_grid.head}>
      <select
        value={grade}
        onChange={(e) => {
          if (e.currentTarget.value !== grade.toString()) {
            handleHref({ grade: e.currentTarget.value });
            e.currentTarget.value = grade.toString();
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
        value={type}
        onChange={(e) => {
          if (e.currentTarget.value !== type) {
            handleHref({ type: e.currentTarget.value });
            e.currentTarget.value = type;
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
