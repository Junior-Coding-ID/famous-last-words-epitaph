import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { join } from "node:path";

const TEXT = "Here lies a man who said he'd sleep when he was dead. The universe took him at his word — early.";

if (TEXT.length < 1 || TEXT.length > 150) {
  throw new Error(`TEXT must be 1-150 characters, got ${TEXT.length}`);
}
if (TEXT.includes("\n") || TEXT.includes("\r")) {
  throw new Error("TEXT must be a single line");
}

const outDir = process.env.MAKEFUN_OUTPUT ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, TEXT + "\n", "utf8");
const back = readFileSync(outPath, "utf8");
if (back !== TEXT + "\n") {
  throw new Error("verification failed: entry.txt does not match TEXT");
}
if (Buffer.byteLength(back, "utf8") !== Buffer.byteLength(TEXT + "\n", "utf8")) {
  throw new Error("verification failed: entry.txt byte length does not match TEXT");
}
console.log(`Wrote ${outPath} (${TEXT.length} chars, ${Buffer.byteLength(TEXT, "utf8")} bytes)`);
