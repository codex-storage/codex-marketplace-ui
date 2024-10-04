export const Arrays = {
    toggle: <T>(arr: Array<T>, value: T) =>
        arr.includes(value) ? arr.filter(i => i !== value) : [...arr, value]
}