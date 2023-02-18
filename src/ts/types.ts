export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	blocks: block[];
	noteDuration: number;
};

export type block = string[][];

export type dialogStateType = {
	open: boolean;
	type: "alert" | "confirm";
	contents: string[];
	action?: () => void;
};
