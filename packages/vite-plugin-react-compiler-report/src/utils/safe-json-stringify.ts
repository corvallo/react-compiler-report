export function safeJsonStringify(obj: any): string {
  try {
    return JSON.stringify(obj);
  } catch {
    return JSON.stringify({ error: "Could not serialize report data." });
  }
}
