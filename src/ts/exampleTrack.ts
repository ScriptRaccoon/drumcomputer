import type { track } from "@/ts/types";

export const exampleTrack: track = {
	speed: 110,
	subdivisions: 4,
	beats: [
		[["h", "b"], [], ["h"], ["b"]],
		[["h", "s"], [], ["h"], ["s"]],
		[["h", "b"], ["h"], ["b"], ["h"]],
		[["h", "s"], [], ["o"], []],
	],
};
