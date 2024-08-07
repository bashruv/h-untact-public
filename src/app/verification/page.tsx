import { verifyToken } from "@/api/redis";
import { VerificationForm } from "@/components/verification-form";

function ValidTokenPage() {
  return (
    <div className="flex flex-col gap-4">
      <div>
        <p className="text-18px">
          인증 절차를 위해서는 아래 내역 중 하나를 첨부하여야 합니다.
        </p>
        <ul className="my-8 flex flex-col gap-4 text-16px">
          <li>
            - 학생증
            <br />
            (카드 색 / 사진 / 이름이 포함되어야 하며, 그 외의 정보는 마스킹해도
            됩니다.)
          </li>
          <li>
            - 졸업증명서
            <br />
            (주민번호 뒷자리는 비공개로 설정하여 주시길 바랍니다.)
          </li>
        </ul>
        <VerificationForm />
      </div>
    </div>
  );
}

function InvalidTokenPage() {
  return (
    <div>
      <p className="text-18px">
        인증 페이지가 만료되었거나, 유효하지 않습니다.
      </p>
      <br />
      <p>
        해당 페이지는 메일 발송시점을 기준으로 24시간을 초과하였거나,
        <br />
        문의 전송 과정 중 문제가 발생할 경우 표시됩니다.
        <br />
        번거로우시겠지만, 다시 한 번 문의 부탁드리겠습니다.
      </p>
      <br />
      <p>
        해당 문제가 지속적으로 발생하는 경우
        <br />
        <a
          href={`mailto:${process.env.MAIL_RECEIVER}`}
          className="text-green-light underline"
        >
          {process.env.MAIL_RECEIVER}
        </a>
        로 메일을 보내주시길 바랍니다.
      </p>
    </div>
  );
}

export default async function VerificationPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (searchParams && searchParams.token) {
    const isValidToken = await verifyToken(searchParams.token);
    return isValidToken ? <ValidTokenPage /> : <InvalidTokenPage />;
  } else {
    return <InvalidTokenPage />;
  }
}
