export function applyProxy(arg0: string | URL, arg1?: string | URL): string {
  return _applyProxy(new URL(arg0, arg1));
}
function _applyProxy(url: URL): string {
  return `https://api.allorigins.win/raw?url=${encodeURIComponent(
    url.toString()
  )}`;
}
