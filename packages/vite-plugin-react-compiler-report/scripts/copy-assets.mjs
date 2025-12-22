import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");

const src = path.join(root, "src/template/report-template.html");
const dstDir = path.join(root, "dist/template");
const dst = path.join(dstDir, "report-template.html");

if (fs.existsSync(src)) {
  fs.mkdirSync(dstDir, { recursive: true });
  fs.copyFileSync(src, dst);
  console.log("✓ Template copied to", dst);
} else {
  console.warn("⚠ Template not found at", src);
}
