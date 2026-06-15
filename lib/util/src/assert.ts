export const assertRequired: <T>(name: string, prop?: T | null) => asserts prop is T = (
  name,
  prop,
) => {
  if (prop == null) {
    throw new Error(`Missing required property '${name}'`);
  }
};

export const assertHasStringKey: <K extends string>(prop: unknown, key: K) => asserts prop is Record<K, string> = (prop, key) => {
  if (prop == null || typeof prop !== 'object' || !(key in prop)) {
    throw new Error(`Missing required property '${key}'`);
  }
}