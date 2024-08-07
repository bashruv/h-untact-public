"use client";

import Image from "next/image";
import { ReactNode } from "react";
import { atom, useAtom } from "jotai";

import closeIcon from "@/assets/close.svg";
import questionIcon from "@/assets/question.svg";
import Link from "next/link";

const popupAtom = atom<{
  open: boolean;
  component: ReactNode;
  title?: string;
}>({
  open: false,
  component: null,
  title: undefined,
});

export function usePopup() {
  return useAtom(popupAtom);
}

export function Popup() {
  const [{ open, title, component }] = usePopup();

  return (
    open && (
      <div className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center p-8">
        <div className="flex h-full w-full flex-col border bg-grayscale-dark">
          <div className="flex items-center border-b">
            {title && <p className="pl-4 text-18px">{title}</p>}
            <Link
              href="/info"
              target="_blank"
              className="ml-auto flex h-14 w-14 items-center justify-center border-l border-r"
            >
              <Image src={questionIcon} alt="Question Icon" />
            </Link>
            <button className="flex h-14 w-14 items-center justify-center">
              <Image src={closeIcon} alt="Close Icon" width={20} height={20} />
            </button>
          </div>
          <div className="flex-1 *:h-full *:w-full">{component}</div>
        </div>
      </div>
    )
  );
}
