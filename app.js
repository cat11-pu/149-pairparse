// app.js：渲染结果
import { splitPairs } from "./split.js";
import { parsePairs } from "./pairs.js";

export function render(spec) {
  const text = spec.text || "";
  const view = parsePairs(text);
  const keys = view.keys || [];
  const values = view.values || [];
  return { keys: keys, values: values, count: keys.length, duplicates: view.duplicates || [],
           longest: values.reduce((best, item) => Math.max(best, String(item).length), 0),
           segments: splitPairs(text).length };
}
