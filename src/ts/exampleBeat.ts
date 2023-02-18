import type { beat } from "@/ts/types";

export const exampleBeat: beat = {
	noteDuration: 110,
	blockLength: 4,
	blocks: [
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
