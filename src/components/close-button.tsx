"use client";

import Image from "next/image";

import closeIcon from "@/assets/close.svg";

export function CloseButton() {
  function handleClose() {
    window.open("about:blank", "_self");
    window.close();
  }

  return (
    <button onClick={handleClose}>
      <Image src={closeIcon} alt="Close Icon" width={20} height={20} />
    </button>
  );
}
