import type { Item, ReactCompilerEvent } from "./types";
import { store } from "./store";
import { emitCompilerEvent } from "./events";
import { shortPath } from "../utils/short-path";

export const reactCompilerLogger = (filename: string, event: ReactCompilerEvent) => {
  const item: Item = { filename: shortPath(filename), event, time: Date.now() };

  if (event.kind === "CompileSuccess") {
    store.all.success.push(item);
    store.batch.success.push(item);
  } else if (event.kind === "CompileError") {
    store.all.error.push(item);
    store.batch.error.push(item);
  } else {
    store.all.other.push(item);
    store.batch.other.push(item);
  }

  emitCompilerEvent();
};
