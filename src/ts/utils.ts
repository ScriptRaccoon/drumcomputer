export function stringIsPositiveInteger(str: string): boolean {
	return (
		!!str && str == parseInt(str).toString() && parseInt(str) >= 1
	);
}
