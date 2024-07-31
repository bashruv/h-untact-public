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

export function randomString() {
  const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
  const stringLength = 6;

  let randomstring = "";

  for (let i = 0; i < stringLength; i++) {
    const rnum = Math.floor(Math.random() * chars.length);
    randomstring += chars.substring(rnum, rnum + 1);
  }

  return randomstring;
}

export const gradeValue = [3, 2, 1];

export const workTypeValue = ["D", "I", "M"];

export function generateNodeID(type: string, grade: string) {
  return `${type}-${grade}`;
}
