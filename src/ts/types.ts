export type playStates = "stopped" | "playing" | "paused";

export type track = {
	beats: beat[];
	speed: number;
	division: number;
};

export type beat = instrumentKey[][];

export type dialogStateType = {
	open: boolean;
	type: "alert" | "confirm";
	contents: string[];
	action?: () => void;
};

// prettier-ignore
export const instrumentKeys = ["c","r","o","h","d","s","t","m","b"] as const;

export type instrumentKey = typeof instrumentKeys[number];
