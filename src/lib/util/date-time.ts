export const toISO = <T extends number | null>(
  timestamp: T,
): T extends number ? string : null => {
  const result = timestamp === null ? null : new Date(timestamp).toISOString();
  return result as T extends number ? string : null;
};
