export { cn } from "cn";

export function generateClientRefId(): string {
  const ts = Date.now().toString(36).slice(-4).toUpperCase();
  const seq = (Date.now() % 9000 + 1000).toString();
  return `YT-${ts}-${seq}`;
}
