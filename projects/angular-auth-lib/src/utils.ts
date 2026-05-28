/**
 * Minimal lodash-like `get`: safely reads a dot-notation `path` from `object`.
 *
 * Returns the first primitive value found along the path, or `defaultValue`
 * (falling back to `null`) when any segment is missing or the leaf is an
 * object. Behaviour is unchanged from the pre-v20 implementation; only the
 * typings have been tightened for TypeScript strict mode.
 *
 * @internal Not part of the public API surface.
 */
export function get<T>(object: unknown, path: string, defaultValue: T): T;
export function get(object: unknown, path: string): unknown;
export function get<T>(object: unknown, path: string, defaultValue: T | null = null): T | null {
  const nestedKeys = path.split('.');
  let currentPathValue: unknown = object;
  for (const key of nestedKeys) {
    const container = currentPathValue as Record<string, unknown> | null;
    currentPathValue =
      container !== null && Object.hasOwn(container, key) ? container[key] : null;
    if (typeof currentPathValue !== 'object' && currentPathValue !== null) {
      return currentPathValue as T;
    } else if (currentPathValue === null) {
      return defaultValue || null;
    }
  }
  return defaultValue || null;
}
