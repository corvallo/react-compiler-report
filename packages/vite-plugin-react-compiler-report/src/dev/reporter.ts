import { store, resetBatch } from "../core/store";
import { color as c, groupKey, locationString } from "../utils";

export function createDevReporter() {
  let timer: NodeJS.Timeout | null = null;
  
  const DEBOUNCE_MS = 150;
  const MAX_FAILURES = 50;

  function flush() {
    const failures = store.batch.error;
    const successes = store.batch.success;
    
    if (!failures.length && !successes.length) {
      resetBatch();
      return;
    }

  
    const parts = [
       c.bold("React Compiler (dev)"),
       c.gray(" • ")
    ];

    if (successes.length > 0) {
      parts.push(c.green(`✓ ${successes.length} compiled`));
    }
    if (failures.length > 0) {
      if (successes.length > 0) parts.push(c.gray(" | "));
      parts.push(c.red(`✕ ${failures.length} failed`));
    }

    console.log("\n" + parts.join("") + "\n");

    if (!failures.length) {
      resetBatch();
      return;
    }

    if (failures.length > MAX_FAILURES) {
      console.log(c.dim(`Too many failures to print (${failures.length}).\n`));
      resetBatch();
      return;
    }

    const groups = new Map<string, typeof failures>();
    for (const it of failures) {
      const k = groupKey(it.event);
      const arr = groups.get(k);
      if (arr) arr.push(it);
      else groups.set(k, [it]);
    }

    for (const [k, items] of groups) {
      const [cat, reason] = k.split("::");
      console.log(c.yellow(cat) + c.gray(" • ") + c.red(reason) + c.gray(` (${items.length})`));

      for (const it of items) {
        const d: any = (it.event as any).detail ?? {};
        const loc = locationString(it.event);

        console.log("  " + c.red("✕") + " " + it.filename + (loc ? " " + c.gray(loc) : ""));
        if (d.description) console.log("     " + c.dim(d.description));
        if (Array.isArray(d.suggestions) && d.suggestions.length) {
          console.log("     " + c.gray("Suggestions:"));
          for (const s of d.suggestions) console.log("       - " + s);
        }
      }
      console.log("");
    }

    resetBatch();
  }

  function schedule() {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      flush();
    }, DEBOUNCE_MS);
  }

  function stop() {
    if (timer) clearTimeout(timer);
    timer = null;
  }

  return { schedule, stop };
}
