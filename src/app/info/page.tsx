"use client";

import { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import { Turnstile } from "@marsidev/react-turnstile";

import { postInquiry } from "@/api/form";
import { InquirySubmitButton } from "@/components/submit-button";
import { useRouter } from "next/navigation";
import { formInitialState } from "@/constants";
import { getErrorDesc } from "@/utils";

export default function InfoPage() {
  const router = useRouter();
  const [typeSelected, setTypeSelected] = useState(false);
  const [state, formAction] = useFormState(postInquiry, formInitialState);

  useEffect(() => {
    if (state.success) {
      router.push(state.returnUrl as string);
    }
  }, [state, router]);

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <p className="mb-2 text-18px">무엇을 도와드릴까요?</p>
        <div className="border px-2">
          <select
            defaultValue={"default"}
            name="type"
            className="h-12 w-full bg-grayscale-dark text-18px focus:outline-none"
            onChange={() => {
              setTypeSelected(true);
            }}
          >
            <option value="default" disabled>
              도움이 필요한 사항을 선택해주세요
            </option>
            <option value="privacy">
              (추가 인증 필요) 개인정보 정정 / 삭제 문의
            </option>
            <option value="exhibition">전시회 관련 문의</option>
            <option value="bug">웹페이지 오류 / 버그 제보</option>
            <option value="etc">기타</option>
          </select>
        </div>
      </div>
      {typeSelected && (
        <>
          <div className="flex flex-col">
            <p className="mb-2 text-18px">
              아래 내용 작성 후 전송버튼을 눌러주세요
            </p>
            <input
              className="h-12 rounded-none border bg-grayscale-dark px-3"
              placeholder="이메일 (해당 메일로 처리 내역이 전송됩니다.)"
              name="email"
              type="email"
              required
            />
            <input
              className="h-12 rounded-none border border-t-0 bg-grayscale-dark px-3"
              placeholder="제목"
              name="title"
              required
            />
            <textarea
              className="h-96 rounded-none border border-t-0 bg-grayscale-dark px-3 py-2"
              placeholder={`내용 (최대한 상세하게 작성하여 주시길 바랍니다.)\n\n주의!\n중요 개인정보를 작성하게 될 경우 문의가 거절될 수 있습니다.\n부득이하게 개인정보가 필요하다고 판단될 경우 추후 이메일로 안내될 예정입니다.`}
              name="desc"
              required
            />
          </div>
          {state.success === false && state.message && (
            <p className="text-center text-18px font-bold text-red-primary">
              {getErrorDesc(state.message)}
            </p>
          )}
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_KEY || ""}
            className="mx-auto"
          />
          <InquirySubmitButton />
        </>
      )}
    </form>
  );
}
