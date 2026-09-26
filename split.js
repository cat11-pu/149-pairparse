// split.js：按分号切分；出现空段即非法写法
export function splitPairs(text) {
  const segments = String(text).split(";");
  for (const segment of segments) {
    if (segment === "") {
      const error = new Error("empty pair segment");
      error.code = "E_BAD_PAIR";
      throw error;
    }
  }
  return segments;
}
