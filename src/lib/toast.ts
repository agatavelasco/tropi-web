export type ToastType = "error" | "success" | "info";

export interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

type Listener = (toasts: Toast[]) => void;

let toasts: Toast[] = [];
let nextId = 1;
const listeners = new Set<Listener>();

function notify() {
  listeners.forEach((l) => l([...toasts]));
}

function add(message: string, type: ToastType) {
  const id = nextId++;
  toasts = [...toasts, { id, message, type }];
  notify();
  setTimeout(() => {
    toasts = toasts.filter((t) => t.id !== id);
    notify();
  }, 4000);
}

export const toast = {
  error: (message: string) => add(message, "error"),
  success: (message: string) => add(message, "success"),
  info: (message: string) => add(message, "info"),
};

export function subscribe(listener: Listener) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}
