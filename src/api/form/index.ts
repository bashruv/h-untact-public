"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { turnstileVerify } from "../turnstile";
import { sendDiscordWebhook } from "../webhook/discord";
import { sendMail } from "../email";
import {
  requestCompleteHTMLTemplate,
  verifyRequiredHTMLTemplate,
} from "@/constants";
import { createVerifyToken, extractToken, removeToken } from "../redis";
import { uploadR2 } from "../r2";

export async function getSearch(formData: FormData) {
  "use server";

  const searchValue = formData.get("searchValue") as string;

  revalidatePath("/archive");

  if (!searchValue) {
    redirect("/archive");
  } else {
    redirect(`/archive?q=${encodeURIComponent(searchValue)}`);
  }
}

export async function postInquiry(_: FormState, formData: FormData) {
  const turnstileRes = formData.get("cf-turnstile-response");

  if (!turnstileRes) {
    return {
      success: false,
      message: "invalid_challenge_token",
      returnUrl: null,
    };
  }

  const isTurnsilteVerified = await turnstileVerify(turnstileRes as string);

  if (!isTurnsilteVerified) {
    return {
      success: false,
      message: "challenge_verify_failed",
      returnUrl: null,
    };
  }

  const values = {
    type: formData.get("type") as string,
    email: formData.get("email") as string,
    title: formData.get("title") as string,
    desc: formData.get("desc") as string,
  };

  if (!values.type) {
    return {
      success: false,
      message: "invalid_type",
      returnUrl: null,
    };
  }

  if (!values.email) {
    return {
      success: false,
      message: "invalid_email",
      returnUrl: null,
    };
  }

  if (!values.title) {
    return {
      success: false,
      message: "invalid_title",
      returnUrl: null,
    };
  }

  if (!values.desc) {
    return {
      success: false,
      message: "invalid_desc",
      returnUrl: null,
    };
  }

  // 개인정보 계열 타입 아닌 경우
  if (values.type !== "privacy") {
    const isWebhookSended = await sendDiscordWebhook(values);

    if (!isWebhookSended) {
      return {
        success: false,
        message: "webhook_send_failed",
        returnUrl: null,
      };
    }

    const isMailSended = await sendMail(
      values.email,
      "[H.Untact] 문의 접수 완료",
      requestCompleteHTMLTemplate(values),
    );

    if (!isMailSended) {
      return {
        success: false,
        message: "mail_send_failed",
        returnUrl: null,
      };
    }

    return {
      success: true,
      message: "OK",
      returnUrl: "/info/complete?status=sended",
    };
    // 개인정보 계열 타입일 경우
  } else {
    const verifyToken = await createVerifyToken(values);

    if (!verifyToken) {
      return {
        success: false,
        message: "token_create_failed",
        returnUrl: null,
      };
    }

    const isMailSended = await sendMail(
      values.email,
      "[H.Untact] 2차 인증 요청 안내",
      verifyRequiredHTMLTemplate(verifyToken),
    );

    if (!isMailSended) {
      return {
        success: false,
        message: "mail_send_failed",
        returnUrl: null,
      };
    }

    return {
      success: true,
      message: "OK",
      returnUrl: "/info/complete?status=pending",
    };
  }
}

export async function postVerification(_: FormState, formData: FormData) {
  const turnstileRes = formData.get("cf-turnstile-response");

  if (!turnstileRes) {
    return {
      success: false,
      message: "invalid_challenge_token",
      returnUrl: null,
    };
  }

  const isTurnsilteVerified = await turnstileVerify(turnstileRes as string);

  if (!isTurnsilteVerified) {
    return {
      success: false,
      message: "challenge_verify_failed",
      returnUrl: null,
    };
  }

  const file = formData.get("file");
  const token = formData.get("token");

  if (!file) {
    return {
      success: false,
      message: "invalid_file",
      returnUrl: null,
    };
  }

  if (!token) {
    return {
      success: false,
      message: "invalid_token",
      returnUrl: null,
    };
  }

  const res = await uploadR2(file as File);

  if (res && res.$metadata.httpStatusCode !== 200) {
    return {
      success: false,
      message: "file_upload_failed",
      returnUrl: null,
    };
  }

  const values = await extractToken(token as string);

  const isDeleted = await removeToken(token as string);

  if (!isDeleted) {
    return {
      success: false,
      message: "token_delete_failed",
      returnUrl: null,
    };
  }

  const isWebhookSended = await sendDiscordWebhook({
    ...values,
    fileName: res?.fileName,
  });

  if (!isWebhookSended) {
    return {
      success: false,
      message: "webhook_send_failed",
      returnUrl: null,
    };
  }

  const isMailSended = await sendMail(
    values.email,
    "[H.Untact] 문의 접수 완료",
    requestCompleteHTMLTemplate(values),
  );

  if (!isMailSended) {
    return {
      success: false,
      message: "mail_send_failed",
      returnUrl: null,
    };
  }

  return {
    success: true,
    message: "OK",
    returnUrl: "/info/complete?status=sended",
  };
}
