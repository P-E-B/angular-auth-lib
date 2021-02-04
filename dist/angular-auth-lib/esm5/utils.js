import { __values } from "tslib";
export function get(object, path, defaultValue) {
    var e_1, _a;
    if (defaultValue === void 0) { defaultValue = null; }
    var nestedKeys = path.split('.');
    var currentPathValue = object;
    try {
        for (var nestedKeys_1 = __values(nestedKeys), nestedKeys_1_1 = nestedKeys_1.next(); !nestedKeys_1_1.done; nestedKeys_1_1 = nestedKeys_1.next()) {
            var key = nestedKeys_1_1.value;
            currentPathValue = currentPathValue[key] || null;
            if (typeof currentPathValue !== 'object' && currentPathValue !== null) {
                return currentPathValue;
            }
            else if (currentPathValue === null) {
                return defaultValue || null;
            }
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (nestedKeys_1_1 && !nestedKeys_1_1.done && (_a = nestedKeys_1.return)) _a.call(nestedKeys_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return defaultValue || null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsidXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBYyxFQUFFLElBQVksRUFBRSxZQUF3Qjs7SUFBeEIsNkJBQUEsRUFBQSxtQkFBd0I7SUFDdEUsSUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQzs7UUFDOUIsS0FBZ0IsSUFBQSxlQUFBLFNBQUEsVUFBVSxDQUFBLHNDQUFBLDhEQUFFO1lBQXZCLElBQUksR0FBRyx1QkFBQTtZQUNSLGdCQUFnQixHQUFHLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQztZQUNqRCxJQUFJLE9BQU8sZ0JBQWdCLEtBQUssUUFBUSxJQUFJLGdCQUFnQixLQUFLLElBQUksRUFBRTtnQkFDbkUsT0FBTyxnQkFBZ0IsQ0FBQzthQUMzQjtpQkFBTSxJQUFJLGdCQUFnQixLQUFLLElBQUksRUFBRTtnQkFDbEMsT0FBTyxZQUFZLElBQUksSUFBSSxDQUFDO2FBQy9CO1NBQ0o7Ozs7Ozs7OztJQUNELE9BQU8sWUFBWSxJQUFJLElBQUksQ0FBQztBQUNoQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGdldChvYmplY3Q6IE9iamVjdCwgcGF0aDogc3RyaW5nLCBkZWZhdWx0VmFsdWU6IGFueSA9IG51bGwpOiBhbnkge1xuICAgIGNvbnN0IG5lc3RlZEtleXMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gICAgbGV0IGN1cnJlbnRQYXRoVmFsdWUgPSBvYmplY3Q7XG4gICAgZm9yIChsZXQga2V5IG9mIG5lc3RlZEtleXMpIHtcbiAgICAgICAgY3VycmVudFBhdGhWYWx1ZSA9IGN1cnJlbnRQYXRoVmFsdWVba2V5XSB8fCBudWxsO1xuICAgICAgICBpZiAodHlwZW9mIGN1cnJlbnRQYXRoVmFsdWUgIT09ICdvYmplY3QnICYmIGN1cnJlbnRQYXRoVmFsdWUgIT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBjdXJyZW50UGF0aFZhbHVlO1xuICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRQYXRoVmFsdWUgPT09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWUgfHwgbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZGVmYXVsdFZhbHVlIHx8IG51bGw7XG59XG4iXX0=