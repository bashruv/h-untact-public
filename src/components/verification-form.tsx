"use client";

import { ChangeEvent, useEffect, useRef } from "react";
import { InquirySubmitButton } from "./submit-button";
import { useRouter, useSearchParams } from "next/navigation";
import { useFormState } from "react-dom";
import { formInitialState } from "@/constants";
import { postVerification } from "@/api/form";
import { Turnstile } from "@marsidev/react-turnstile";
import { getErrorDesc } from "@/utils";

export function VerificationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction] = useFormState(postVerification, formInitialState);

  useEffect(() => {
    if (state.success) {
      router.push(state.returnUrl as string);
    }
  }, [state, router]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const { files } = e.target;

    if (files && files.length === 1) {
      const fileSize = files[0].size;
      const uploadLimit = 10485760; // 10MB

      if (fileSize > uploadLimit) {
        alert("용량이 초과되었습니다. 첨부 최대 용량은 10MB입니다.");
        formRef.current!.reset();
      }
    }
  }

  return (
    <form action={formAction} ref={formRef} className="flex flex-col gap-4">
      <p className="text-16px text-red-light">
        최대 10MB까지 첨부가 가능합니다.
        <br />
        이미지 / PDF만 허용됩니다.
        <br />
        첨부된 파일은 본인 확인 완료 즉시 삭제됩니다.
      </p>
      <input
        type="file"
        name="file"
        onChange={handleFileChange}
        accept="image/*, application/pdf"
        required
        className="mb-4"
      />
      <input
        type="text"
        name="token"
        readOnly
        hidden
        value={searchParams.get("token") as string}
      />
      {state.success === false && state.message && (
        <p className="text-center text-18px font-bold text-red-primary">
          {getErrorDesc(state.message)}
        </p>
      )}
      <Turnstile
        siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_KEY || ""}
      />
      <InquirySubmitButton />
    </form>
  );
}
