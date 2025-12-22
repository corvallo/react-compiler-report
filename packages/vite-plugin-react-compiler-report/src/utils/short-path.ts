export function shortPath(filename: string): string {
  const cwd = process.cwd().replaceAll("\\", "/");
  const f = filename.replaceAll("\\", "/");
  return f.startsWith(cwd) ? "." + f.slice(cwd.length) : filename;
}
