// pairs.js：解析分号分隔的键值对，第一个等号切分，重复键后值覆盖前值
import { splitPairs } from "./split.js";

export function parsePairs(text) {
  const segments = splitPairs(text);
  const keys = [];
  const values = [];
  const duplicates = [];
  const indexByKey = new Map();

  for (const segment of segments) {
    const cut = segment.indexOf("=");
    if (cut <= 0 || cut === segment.length - 1) {
      const error = new Error("malformed pair: " + segment);
      error.code = "E_BAD_PAIR";
      throw error;
    }
    const key = segment.slice(0, cut);
    const value = segment.slice(cut + 1);

    const spot = indexByKey.get(key);
    if (spot === undefined) {
      indexByKey.set(key, keys.length);
      keys.push(key);
      values.push(value);
    } else {
      values[spot] = value;
      if (!duplicates.includes(key)) {
        duplicates.push(key);
      }
    }
  }

  return { keys: keys, values: values, duplicates: duplicates };
}
