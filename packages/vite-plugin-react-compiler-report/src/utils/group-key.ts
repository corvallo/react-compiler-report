export function groupKey(ev: any): string {
  const d = ev?.detail ?? {};
  return `${d.category ?? "Unknown"}::${d.reason ?? "Unknown"}`;
}
