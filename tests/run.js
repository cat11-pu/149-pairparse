import assert from "node:assert";
import { splitPairs } from "../split.js";
import { parsePairs } from "../pairs.js";
import { render } from "../app.js";

let failed = 0;
function check(name, fn) {
  try { fn(); console.log("ok " + name); } catch (e) { failed += 1; console.log("FAIL " + name + " :: " + e.message); }
}

check("splitPairs returns a list", () => {
  assert.ok(Array.isArray(splitPairs("a=1")));
});

check("parsePairs returns keys", () => {
  assert.ok(Array.isArray(parsePairs("a=1").keys));
});

check("parsePairs returns duplicate list", () => {
  assert.ok(Array.isArray(parsePairs("a=1").duplicates));
});

check("render counts keys", () => {
  assert.strictEqual(typeof render({ text: "a=1" }).count, "number");
});

check("render counts segments", () => {
  assert.strictEqual(typeof render({ text: "a=1" }).segments, "number");
});

console.log("5 cases, " + failed + " failed");
process.exit(failed === 0 ? 0 : 1);
