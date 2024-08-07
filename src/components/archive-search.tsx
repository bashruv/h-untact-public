import Link from "next/link";
import Image from "next/image";

import { getSearch } from "@/api/form";
import searchIcon from "@/assets/search.svg";
import questionIcon from "@/assets/question.svg";
import { HUntactArrow } from "@/assets/h-untact-arrow";

export function ArchiveSearch({ params }: { params: string | undefined }) {
  return (
    <div className="fixed bottom-0 flex w-full border">
      <Link href="/" className="group bg-grayscale-dark">
        <HUntactArrow className="-mb-px -ml-px -mt-px *:fill-grayscale-dark *:transition-colors *:delay-500 group-hover:*:fill-grayscale-pure-white group-hover:*:delay-0" />
        <div className="absolute bottom-0 top-0 ml-[50px] w-0 bg-grayscale-pure-white transition-all duration-500 group-hover:w-[calc(100vw-52px)] group-hover:delay-150" />
      </Link>
      <form className="flex flex-1" action={getSearch}>
        <input
          className="w-full bg-grayscale-dark px-4 pb-px text-18px focus:outline-none"
          placeholder="작가 또는 작품명 검색..."
          name="searchValue"
          defaultValue={params}
        />
        <button className="flex-shrink-0 border-l" type="submit">
          <Image src={searchIcon} alt="Search Icon" />
        </button>
      </form>
      <Link href="/info" target="_blank" className="flex-shrink-0 border-l">
        <Image src={questionIcon} alt="Question Icon" />
      </Link>
    </div>
  );
}
