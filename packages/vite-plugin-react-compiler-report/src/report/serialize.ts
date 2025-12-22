import { store } from "../core/store";

export function buildReportData() {
  return {
    generatedAt: new Date().toISOString(),
    totals: {
      failed: store.all.error.length,
      ok: store.all.success.length,
    },
    failed: [
      ...store.all.error.map(({ filename, event }) => {
        const d: any = (event as any).detail ?? {};
        return {
          filename,
          category: d.category ?? null,
          reason: d.reason ?? null,
          description: d.description ?? null,
          loc: d.loc?.start ? `L${d.loc.start.line}:${d.loc.start.column}` : null,
          suggestions: Array.isArray(d.suggestions) ? d.suggestions : [],
        };
      }),
    ],
    success: [...store.all.success.map(({ filename }) => ({ filename }))],
  };
}
