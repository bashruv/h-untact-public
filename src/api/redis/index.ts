import { generateToken } from "@/utils";
import { createClient } from "redis";
import { promisify } from "util";
import { deflate, inflate } from "zlib";

const deflateAsync = promisify(deflate);
const inflateAsync = promisify(inflate);

const client = createClient({
  password: process.env.REDIS_PASSWORD,
  socket: {
    host: process.env.REDIS_HOST,
    port: Number(process.env.REDIS_PORT),
  },
});

export async function createVerifyToken(data: InquiryValues) {
  const token = generateToken();

  try {
    const compressedData = await deflateAsync(JSON.stringify(data));
    await client.connect();
    await client.setEx(token, 86400, compressedData.toString("base64"));

    await client.disconnect();
    return token;
  } catch {
    return null;
  }
}

export async function verifyToken(token: string) {
  try {
    await client.connect();
    const data = await client.get(token);

    await client.disconnect();

    if (!data) return false;
    return true;
  } catch {
    return false;
  }
}

export async function extractToken(token: string) {
  try {
    await client.connect();
    const data = await client.get(token);
    await client.disconnect();

    if (!data) return null;

    const buffer = await inflateAsync(Buffer.from(data, "base64"));

    return JSON.parse(buffer.toString());
  } catch {
    return null;
  }
}

export async function removeToken(token: string) {
  try {
    await client.connect();
    await client.del(token);
    await client.disconnect();

    return true;
  } catch {
    return false;
  }
}

export async function cronRedisDB() {
  try {
    await client.ping();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
