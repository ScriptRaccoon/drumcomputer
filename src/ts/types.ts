export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	blocks: block[];
	speed: number;
	division: number;
};

export type block = string[][];

export type dialogStateType = {
	open: boolean;
	type: "alert" | "confirm";
	contents: string[];
	action?: () => void;
};
