export function stringIsPositiveInteger(str: string): boolean {
	return (
		!!str && str == parseInt(str).toString() && parseInt(str) >= 1
	);
}

export function chunkArray<T>(
	arr: T[],
	length: number
): T[][] | undefined {
	if (arr.length % length != 0) {
		console.error("length does not fit");
	}
	let result: T[][] = [];
	for (let i = 0; i < arr.length; i += length) {
		const chunk = arr.slice(i, i + length);
		result.push(chunk);
	}
	return result;
}
