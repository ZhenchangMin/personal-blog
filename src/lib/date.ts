export function dateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

export function formatDate(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  return `${year} · ${month} · ${day}`;
}

export function formatMonthDay(date: Date) {
  return `${String(date.getUTCMonth() + 1).padStart(2, '0')}.${String(date.getUTCDate()).padStart(2, '0')}`;
}

export function formatMonth(date: Date, locale: 'en' | 'zh' = 'en') {
  return new Intl.DateTimeFormat(locale === 'en' ? 'en-US' : 'zh-CN', {
    month: 'long',
    timeZone: 'UTC',
  }).format(date);
}

export function sortNewest<T extends { data: { date: Date } }>(entries: T[]) {
  return [...entries].sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
