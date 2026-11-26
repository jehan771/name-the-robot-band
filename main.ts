// Name the Robot Band — program/v1 entry.
// Writes exactly one funny robot band name plus a few words on its hit song
// to /output/entry.txt. Gate (from the kit): 1-200 UTF-8 characters, not
// whitespace-only. The program asserts the gate before writing, then reads
// the file back and verifies the bytes match what it intended to write.
import { mkdirSync, writeFileSync, readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const line =
  "N*SYNC \u2014 hit single 'Bye Bye Bye' ends every show when all five power down in perfect sync.";

const chars = [...line].length;
const bytes = Buffer.byteLength(line, "utf8");
if (chars < 1 || chars > 200) {
  throw new Error(`gate failed: ${chars} characters, need 1-200`);
}
if (line.trim().length === 0) {
  throw new Error("gate failed: entry is whitespace-only");
}
if (line.includes("\n") || line.includes("\r")) {
  throw new Error("gate failed: entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");

const back = readFileSync("/output/entry.txt", "utf8");
if (back !== line) {
  throw new Error("read-back verification failed: output differs from intended line");
}
const sha = createHash("sha256").update(back, "utf8").digest("hex");
console.log(`wrote ${chars} chars / ${bytes} bytes, sha256=${sha}`);
// Repair Name the Robot Band: independent post-write verification, pass 1.
import { readFileSync as __rBandRead } from "node:fs";
{
  const __rBandText = __rBandRead("/output/entry.txt", "utf8");
  const __rBandLines = __rBandText.split("\n");
  if (__rBandLines.length > 2 || (__rBandLines.length === 2 && __rBandLines[1] !== "")) {
    throw new Error("repair check: output must be exactly one line");
  }
  if (__rBandText.includes("\r")) {
    throw new Error("repair check: output must not contain a carriage return");
  }
}
// Repair Name the Robot Band: independent post-write verification, pass 2.
{
  const __rBandText2 = __rBandRead("/output/entry.txt", "utf8");
  if (Buffer.from(__rBandText2, "utf8").toString("utf8") !== __rBandText2) {
    throw new Error("repair check: output is not valid UTF-8 text");
  }
  const __rBandChars = [...__rBandText2.replace(/\n$/, "")].length;
  if (__rBandChars < 1 || __rBandChars > 200) {
    throw new Error(`repair check: ${__rBandChars} characters, need 1-200`);
  }
}

// Repair Name the Robot Band: independent post-write verification, pass 3.
import { readFileSync as __r2BandRead } from "node:fs";
{
  const __r2BandText = __r2BandRead("/output/entry.txt", "utf8");
  if (!/^[^\n\r]*\n?$/.test(__r2BandText)) {
    throw new Error("repair check: output must be one line with at most one trailing newline");
  }
}

// Repair Name the Robot Band: independent post-write verification, pass 4.
{
  const __r2BandText2 = __r2BandRead("/output/entry.txt", "utf8");
  const __r2BandBody = __r2BandText2.replace(/\n$/, "");
  if (__r2BandBody !== __r2BandBody.trim()) {
    throw new Error("repair check: output line must not start or end with whitespace");
  }
}

// Repair Name the Robot Band: independent post-write verification, pass 5.
import { readFileSync as __v3BandRead } from "node:fs";
{
  const __v3BandText = __v3BandRead("/output/entry.txt", "utf8");
  const __v3BandParts = __v3BandText.split("\n");
  const __v3BandBody = __v3BandParts.filter((__v3BandPart) => __v3BandPart.length > 0);
  if (__v3BandBody.length !== 1) {
    console.error("repair check: expected exactly one non-empty line");
    process.exit(1);
  }
  if (__v3BandBody[0] !== __v3BandBody[0].trim() || __v3BandBody[0] !== line) {
    console.error("repair check: body has stray whitespace or differs from the intended line");
    process.exit(1);
  }
}

// Repair Name the Robot Band: independent post-write verification, pass 6.
{
  const __v3Band2Text = __v3BandRead("/output/entry.txt", "utf8");
  const __v3Band2NoNewline = __v3Band2Text.endsWith("\n")
    ? __v3Band2Text.slice(0, -1)
    : __v3Band2Text;
  const __v3Band2ByteLen = Buffer.byteLength(__v3Band2NoNewline, "utf8");
  if (__v3Band2ByteLen !== bytes) {
    console.error(`repair check: byte length ${__v3Band2ByteLen} does not match ${bytes}`);
    process.exit(1);
  }
  if (__v3Band2NoNewline.includes("\n") || __v3Band2NoNewline.includes("\r")) {
    console.error("repair check: body still contains a line break");
    process.exit(1);
  }
}
