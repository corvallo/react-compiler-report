import type { Store } from "./types";

export const store: Store = {
  all: { success: [], error: [], other: [] },
  batch: { success: [], error: [], other: [] },
  batchId: 0,
};

export function resetBatch() {
  store.batch = { success: [], error: [], other: [] };
  store.batchId++;
}
