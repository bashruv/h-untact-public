import { redirect } from "next/navigation";

export default function CompletePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!(searchParams && searchParams.status)) {
    redirect("/info");
  }

  if (searchParams.status === "sended") {
    return (
      <div>
        <p className="text-18px">문의가 발송되었습니다.</p>
        <br />
        <p>
          확인 및 답신까지는 최대 72시간 소요됩니다.
          <br />
          만일 메일이 도착하지 않았을 경우, 스팸메일함을 확인하여 주시길
          바랍니다.
        </p>
        <br />
        <p>
          그럼에도 도착하지 않았을 경우 번거로우시겠지만
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

  if (searchParams.status === "pending") {
    return (
      <div>
        <p className="text-18px">문의 처리를 위해서는 본인인증이 필요합니다.</p>
        <br />
        <p>
          작성하여 주신 메일주소의 메일함을 확인하여 주시길 바랍니다.
          <br />
          만일 메일이 도착하지 않았을 경우, 스팸메일함을 확인하여 주시길
          바랍니다.
        </p>
        <br />
        <p>
          그럼에도 도착하지 않았을 경우 번거로우시겠지만
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
}
