// pairs.js：解析（基线：一律给空表）
import { splitPairs } from "./split.js";

function badPair(message) {
  const error = new Error(message);
  error.code = "E_BAD_PAIR";
  return error;
}

export function parsePairs(text) {
  const segments = splitPairs(text);
  const indexByKey = new Map();
  const keys = [];
  const values = [];
  const duplicates = [];

  for (const segment of segments) {
    const cut = segment.indexOf("=");
    if (cut === -1 || cut === 0) {
      throw badPair("bad pair: " + segment);
    }
    const key = segment.slice(0, cut);
    const value = segment.slice(cut + 1);
    if (value === "") {
      throw badPair("empty value for key: " + key);
    }

    const slot = indexByKey.get(key);
    if (slot === undefined) {
      indexByKey.set(key, { index: keys.length, repeated: false });
      keys.push(key);
      values.push(value);
    } else {
      values[slot.index] = value;
      if (!slot.repeated) {
        slot.repeated = true;
        duplicates.push(key);
      }
    }
  }

  return { keys: keys, values: values, duplicates: duplicates };
}
