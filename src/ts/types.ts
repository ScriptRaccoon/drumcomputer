export type instrumentName = "H" | "B" | "S";

export type instrument = {
	name: instrumentName;
	longName: string;
	soundFile: string;
};

export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	name: string;
	notes: instrumentName[][];
	noteDuration: number;
};
