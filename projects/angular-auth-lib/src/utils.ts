export function get(object: Object, path: string, defaultValue: any = null): any {
    const nestedKeys = path.split('.');
    let currentPathValue = object;
    for (let key of nestedKeys) {
        currentPathValue = currentPathValue[key] || null;
        if (typeof currentPathValue !== 'object' && currentPathValue !== null) {
            return currentPathValue;
        } else if (currentPathValue === null) {
            return defaultValue || null;
        }
    }
    return defaultValue || null;
}
