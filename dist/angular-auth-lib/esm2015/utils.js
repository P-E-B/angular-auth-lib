export function get(object, path, defaultValue = null) {
    const nestedKeys = path.split('.');
    let currentPathValue = object;
    for (let key of nestedKeys) {
        currentPathValue = currentPathValue[key] || null;
        if (typeof currentPathValue !== 'object' && currentPathValue !== null) {
            return currentPathValue;
        }
        else if (currentPathValue === null) {
            return defaultValue || null;
        }
    }
    return defaultValue || null;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9hbmd1bGFyLWF1dGgtbGliLyIsInNvdXJjZXMiOlsidXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxVQUFVLEdBQUcsQ0FBQyxNQUFjLEVBQUUsSUFBWSxFQUFFLGVBQW9CLElBQUk7SUFDdEUsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNuQyxJQUFJLGdCQUFnQixHQUFHLE1BQU0sQ0FBQztJQUM5QixLQUFLLElBQUksR0FBRyxJQUFJLFVBQVUsRUFBRTtRQUN4QixnQkFBZ0IsR0FBRyxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUM7UUFDakQsSUFBSSxPQUFPLGdCQUFnQixLQUFLLFFBQVEsSUFBSSxnQkFBZ0IsS0FBSyxJQUFJLEVBQUU7WUFDbkUsT0FBTyxnQkFBZ0IsQ0FBQztTQUMzQjthQUFNLElBQUksZ0JBQWdCLEtBQUssSUFBSSxFQUFFO1lBQ2xDLE9BQU8sWUFBWSxJQUFJLElBQUksQ0FBQztTQUMvQjtLQUNKO0lBQ0QsT0FBTyxZQUFZLElBQUksSUFBSSxDQUFDO0FBQ2hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZnVuY3Rpb24gZ2V0KG9iamVjdDogT2JqZWN0LCBwYXRoOiBzdHJpbmcsIGRlZmF1bHRWYWx1ZTogYW55ID0gbnVsbCk6IGFueSB7XG4gICAgY29uc3QgbmVzdGVkS2V5cyA9IHBhdGguc3BsaXQoJy4nKTtcbiAgICBsZXQgY3VycmVudFBhdGhWYWx1ZSA9IG9iamVjdDtcbiAgICBmb3IgKGxldCBrZXkgb2YgbmVzdGVkS2V5cykge1xuICAgICAgICBjdXJyZW50UGF0aFZhbHVlID0gY3VycmVudFBhdGhWYWx1ZVtrZXldIHx8IG51bGw7XG4gICAgICAgIGlmICh0eXBlb2YgY3VycmVudFBhdGhWYWx1ZSAhPT0gJ29iamVjdCcgJiYgY3VycmVudFBhdGhWYWx1ZSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRQYXRoVmFsdWU7XG4gICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFBhdGhWYWx1ZSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZSB8fCBudWxsO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBkZWZhdWx0VmFsdWUgfHwgbnVsbDtcbn1cbiJdfQ==