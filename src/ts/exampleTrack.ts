import type { track } from "@/ts/types";

export const exampleTrack: track = {
	speed: 120,
	subdivisions: 4,
	beats: [
		[["h", "d", "b"], ["d"], ["h", "b"], ["d"]],
		[["h", "s"], ["d"], ["o", "h", "d"], ["b"]],
		[["h", "d"], [], ["h", "b"], []],
		[["h", "s"], [], ["o", "h"], []],
		[["h", "b"], ["d"], ["h", "b"], ["d"]],
		[["h", "s"], [], ["o", "h"], ["b"]],
		[["s"], ["s"], [], ["s"]],
		[["t", "b"], ["t"], ["m"], []],
	],
};
