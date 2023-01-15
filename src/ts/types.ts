import type { AudioController } from "./AudioController";

export type instrumentName = "H" | "B" | "S";

export type instrument = {
	name: instrumentName;
	longName: string;
	audioPlayer: AudioController;
};

export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	name: string;
	notes: instrumentName[][];
	noteDuration: number;
};
