import { useFormStatus } from "react-dom";

export function InquirySubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="h-12 border bg-grayscale-white text-grayscale-dark disabled:animate-pulse disabled:bg-grayscale-deep"
    >
      {pending ? "문의 발송 중..." : "문의 발송"}
    </button>
  );
}
