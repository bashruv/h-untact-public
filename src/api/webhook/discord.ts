import { getInquiryType } from "@/utils";

interface DiscordWebhookProps extends InquiryValues {
  fileName?: string;
}

export async function sendDiscordWebhook(data: DiscordWebhookProps) {
  const { email, title, desc, type, fileName } = data;

  const body = {
    content: `문의가 수신되었습니다. <@${process.env.DISCORD_ADMIN_ID}>`,
    embeds: [
      {
        title,
        description: `${desc}`,
        color: null,
        fields: [
          {
            name: "이메일 주소",
            value: email,
          },
          fileName && {
            name: "파일명",
            value: fileName,
          },
        ],
        author: {
          name: `${getInquiryType(type)}`,
        },
      },
    ],
  };

  try {
    const res = await fetch(process.env.DISCORD_WEBHOOK_URL || "", {
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
      method: "POST",
    });

    const outcome = await res.json();

    if (outcome.content) {
      return true;
    } else {
      return false;
    }
  } catch {
    return false;
  }
}
