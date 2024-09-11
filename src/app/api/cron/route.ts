import { cronRedisDB } from "@/api/redis";
import { NextResponse } from "next/server";

export async function GET() {
  const cron = await cronRedisDB();

  if (cron) {
    return NextResponse.json({ message: "OK" }, { status: 200 });
  } else {
    return NextResponse.json({ error: "ERROR" }, { status: 500 });
  }
}
