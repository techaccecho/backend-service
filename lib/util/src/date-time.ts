export const toISO = <T extends number | null>(
  timestamp: T,
): T extends number ? string : null => {
  const result = timestamp === null ? null : new Date(timestamp).toISOString();
  return result as T extends number ? string : null;
};

export const toTimestamp = <T extends string | null>(date: string): T extends string ? number : null => {
  const result = date === null ? null : Date.parse(date);
  return result as T extends string ? number : null;
}

export const now = (): number => Date.now();
