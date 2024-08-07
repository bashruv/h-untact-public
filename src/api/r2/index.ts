import { generateToken } from "@/utils";
import {
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from "@aws-sdk/client-s3";

const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
  },
});

export async function uploadR2(file: File) {
  try {
    const fileBuffer = await (file as File).arrayBuffer();
    const fileName = `${Date.now()}-${generateToken(3)}`;

    const uploadParams: PutObjectCommandInput = {
      Bucket: process.env.R2_BUCKET_NAME,
      Key: fileName,
      Body: Buffer.from(fileBuffer),
      ContentType: file.type,
      ACL: "private",
    };

    const data = await r2.send(new PutObjectCommand(uploadParams));

    return { ...data, fileName };
  } catch {
    return null;
  }
}
