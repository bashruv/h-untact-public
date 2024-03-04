import prisma from "@/src/lib/prisma";

export default function Home() {
  async function test() {
    const setusers = await prisma();
  }

  return <main></main>;
}
