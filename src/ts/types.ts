export type instrumentName = "HH" | "B" | "S";

export type instrument = {
	name: instrumentName;
	soundFile: string;
};

export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	notes: instrumentName[][];
	noteDuration: number;
};
