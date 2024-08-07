import crypto from "crypto";

export function getWorkType(type: string): string {
  switch (type) {
    case "D":
      return "디자인";
    case "I":
      return "일러스트레이션";
    case "M":
      return "모션그래픽";
    default:
      throw new Error("Invalid Work Type");
  }
}

export function generateToken(byte = 32) {
  return crypto.randomBytes(byte).toString("hex");
}

export function generateNodeID(type: string, grade: string) {
  return `${type}-${grade}`;
}

export function getInquiryType(type: string): string {
  switch (type) {
    case "privacy":
      return "개인정보 정정 / 삭제 문의";
    case "exhibition":
      return "전시회 관련 문의";
    case "bug":
      return "웹페이지 오류 / 버그 제보";
    case "etc":
      return "기타";
    default:
      throw new Error("Invalid Inquiry Type");
  }
}

export function getErrorDesc(error: string): string {
  switch (error) {
    case "invalid_challenge_token":
      return "캡차를 진행하여 주세요.";
    case "challenge_verify_failed":
      return "캡차 인증에 실패하였습니다. 잠시 후 다시 시도해주세요.";
    case "invalid_type":
      return "문의 타입을 지정해주세요.";
    case "invalid_email":
      return "이메일을 작성해주세요.";
    case "invalid_title":
      return "제목을 작성해주세요.";
    case "invalid_desc":
      return "문의 내용을 작성해주세요.";
    case "invalid_file":
      return "파일을 첨부해주세요.";
    case "invalid_token":
      return "오류가 발생하였습니다. 새로고침 후 다시 시도해주세요.";
    case "webhook_send_failed":
      return "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.";
    case "mail_send_failed":
      return "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.";
    case "token_create_failed":
      return "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.";
    case "token_delete_failed":
      return "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.";
    case "mail_send_failed":
      return "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.";
    case "file_upload_failed":
      return "오류가 발생하였습니다. 잠시 후 다시 시도해주세요.";
    default:
      throw new Error("Invalid Error Code");
  }
}
