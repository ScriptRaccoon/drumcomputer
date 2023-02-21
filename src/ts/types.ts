import type { instrumentKey } from "@/ts/instruments";

export type playStates = "stopped" | "playing" | "paused";

export type beat = instrumentKey[][];

export type track = {
	beats: beat[];
	speed: number;
	subdivisions: number;
};

export type dialogStateType = {
	open: boolean;
	type: "alert" | "confirm";
	contents: string[];
	action?: () => void;
};
