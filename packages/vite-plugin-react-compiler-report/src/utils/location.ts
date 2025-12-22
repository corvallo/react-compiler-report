export function locationString(ev: any): string {
  const start = ev?.detail?.loc?.start;
  return start ? `L${start.line}:${start.column}` : "";
}
