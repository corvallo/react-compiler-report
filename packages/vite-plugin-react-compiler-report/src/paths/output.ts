import path from "node:path";

export function resolveOutputDir(outputDir?: string) {
  const p = outputDir ?? ".react-compiler/report";
  return path.isAbsolute(p) ? p : path.resolve(process.cwd(), p);
}
