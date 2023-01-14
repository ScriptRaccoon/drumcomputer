export function isPositiveInteger(n: number) {
	return n >= 1 && n == Math.floor(n);
}

export function switchedArray<T>(elem: T, arr: T[]) {
	if (arr.includes(elem)) {
		return arr.filter((e) => e != elem);
	} else {
		return [...arr, elem];
	}
}
