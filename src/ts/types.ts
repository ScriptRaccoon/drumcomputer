export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	notes: string[][];
	noteDuration: number;
};

export type dialogStateType = {
	open: boolean;
	type: "alert" | "confirm";
	contents: string[];
	action?: () => void;
};
