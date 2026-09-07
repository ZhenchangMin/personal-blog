const rawBase = import.meta.env.BASE_URL || '/';
const base = rawBase === '/' ? '' : rawBase.replace(/\/$/, '');

export function withBase(path = '/') {
  if (/^(?:https?:)?\/\//.test(path) || path.startsWith('data:') || path.startsWith('#')) return path;
  if (path === '/') return base ? `${base}/` : '/';
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}