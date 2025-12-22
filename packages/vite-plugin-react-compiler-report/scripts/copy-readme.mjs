import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "../../..");
const pkgDir = path.resolve(__dirname, "..");

const src = path.join(root, "README.md");
const dst = path.join(pkgDir, "README.md");

if (fs.existsSync(src)) {
  fs.copyFileSync(src, dst);
  console.log("✓ README.md copied to package root");
} else {
  console.warn("⚠ Root README.md not found at", src);
}
