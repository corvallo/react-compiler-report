import fs from "node:fs";
import path from "node:path";
import { safeJsonStringify } from "../utils";

export function writeJsonReport(outputDir: string, fileName: string, data: any) {
  fs.mkdirSync(outputDir, { recursive: true });
  const p = path.join(outputDir, fileName);
  fs.writeFileSync(p, safeJsonStringify(data), "utf8");
  return p;
}
