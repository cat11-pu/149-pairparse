// split.js：按分号切分文本，空段报 E_BAD_PAIR
export function splitPairs(text) {
  const source = String(text);
  const segments = source.split(";");
  for (const segment of segments) {
    if (segment === "") {
      const error = new Error("empty pair segment");
      error.code = "E_BAD_PAIR";
      throw error;
    }
  }
  return segments;
}
