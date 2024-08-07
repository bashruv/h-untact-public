import { getInquiryType } from "@/utils";

export const gradeValue = [3, 2, 1];

export const workTypeValue = ["D", "I", "M"];

export const formInitialState: {
  success: boolean | null;
  message: string | null;
  returnUrl: string | null;
} = {
  success: null,
  message: null,
  returnUrl: null,
};

export function requestCompleteHTMLTemplate({
  type,
  email,
  title,
  desc,
}: InquiryValues) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Request Complete | H.Untact</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0">
    <table
      align="center"
      style="font-family: sans-serif"
      cellpadding="0"
      cellspacing="0"
      width="600px"
    >
      <tr>
        <td>
          <img
            width="240"
            src="https://hello-untact-r2.bashruv.dev/public/h-untact-logo-full.svg"
            alt="H.Untact Logo"
          />
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="
                  font-weight: 700;
                  font-size: 24px;
                  padding-left: 12px;
                  padding-top: 12px;
                  padding-bottom: 20px;
                "
              >
                H.Untact 문의 접수 완료 안내
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="
                  padding-left: 12px;
                  padding-bottom: 40px;
                  font-size: 14px;
                "
              >
                안녕하세요, H.Untact 인포메이션 센터입니다.
                <br />
                빠른 시일 내에 문의 주신 내용에 답신 드리도록 하겠습니다.
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="20%" style="padding-left: 12px; font-weight: 700">
                문의 타입
              </td>
              <td>${getInquiryType(type)}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="20%" style="padding-left: 12px; font-weight: 700">
                수신 이메일
              </td>
              <td>${email}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="20%" style="padding-left: 12px; font-weight: 700">
                제목
              </td>
              <td>${title}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td width="20%" style="padding-left: 12px; font-weight: 700">
                문의 내용
              </td>
              <td>${desc}</td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="padding-left: 12px; padding-top: 40px; font-size: 14px"
              >
                문의 확인 후 회신까지는 최대 72시간 소요되며,
                <br />
                만일 회신 문자가 도착하지 않은 경우
                <br />
                ${process.env.MAIL_RECEIVER}로 전달하여 주시길 바랍니다.
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="
                  padding-left: 12px;
                  padding-top: 40px;
                  font-weight: 700;
                  font-size: 18px;
                "
              >
                H.Untact 인포메이션 센터
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="padding-left: 12px; padding-top: 12px; font-size: 12px"
              >
                해당 메일은 자동으로 발송되는 메일입니다.
                <br />
                만일 본인이 문의를 전송한 것이 아닌 경우 무시하여 주시길
                바랍니다.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}

export function verifyRequiredHTMLTemplate(token: string) {
  return `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Request Complete | H.Untact</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="margin: 0; padding: 0">
    <table
      align="center"
      style="font-family: sans-serif"
      cellpadding="0"
      cellspacing="0"
      width="600px"
    >
      <tr>
        <td>
          <img
            width="240"
            src="https://hello-untact-r2.bashruv.dev/public/h-untact-logo-full.svg"
            alt="H.Untact Logo"
          />
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="
                  font-weight: 700;
                  font-size: 24px;
                  padding-left: 12px;
                  padding-top: 12px;
                  padding-bottom: 20px;
                "
              >
                H.Untact 문의 접수를 위한 추가 인증 안내
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="
                  padding-left: 12px;
                  padding-bottom: 40px;
                  font-size: 14px;
                "
              >
                안녕하세요, H.Untact 인포메이션 센터입니다.
                <br />
                문의 주신 내용을 처리하기 위해 추가 본인인증이 필요합니다.
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="
                  padding-left: 12px;
                  padding-bottom: 20px;
                  font-size: 14px;
                "
              >
                아래 링크를 클릭하여 본인인증을 진행하여 주시길 바랍니다.
                <br />
                <a href="https://h-untact.ruvz.sh/verification?token=${token}" target="_blank">본인인증하기</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="
                  padding-left: 12px;
                  padding-bottom: 20px;
                  font-size: 14px;
                "
              >
                위 링크가 클릭되지 않을 경우, 아래 URL을 복사하여 사용중인
                브라우저에 붙어넣어 주시길 바랍니다.
                <br />
                https://h-untact.ruvz.sh/verification?token=${token}
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="padding-left: 12px; padding-top: 40px; font-size: 14px"
              >
                위 링크는 최대 24시간동안 유효하며,
                <br />
                유효시간 내 본인인증이 완료되지 않을 경우 문의 내용은
                삭제됩니다.
                <br />
                <br />
                만일 본인인증 절차 진행 중 문제가 발생하였을 경우,
                <br />
                h-untact@bashruv.dev로 전달하여 주시길 바랍니다.
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="
                  padding-left: 12px;
                  padding-top: 40px;
                  font-weight: 700;
                  font-size: 18px;
                "
              >
                H.Untact 인포메이션 센터
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td>
          <table cellpadding="0" cellspacing="0" width="100%">
            <tr>
              <td
                style="padding-left: 12px; padding-top: 12px; font-size: 12px"
              >
                해당 메일은 자동으로 발송되는 메일입니다.
                <br />
                만일 본인이 문의를 전송한 것이 아닌 경우 무시하여 주시길
                바랍니다.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
}
