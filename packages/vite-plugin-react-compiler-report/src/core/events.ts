type Listener = () => void;

const listeners = new Set<Listener>();

export function onCompilerEvent(cb: Listener) {
  listeners.add(cb);
  return () => listeners.delete(cb);
}

export function emitCompilerEvent() {
  for (const cb of listeners) cb();
}

export function clearCompilerEventListeners() {
  listeners.clear();
}
