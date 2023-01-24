import type { AudioPlayer } from "@/ts/AudioPlayer";

export type instrumentName =
	| "C"
	| "R"
	| "H"
	| "O"
	| "B"
	| "S"
	| "D"
	| "T"
	| "M";

export type instrument = {
	name: instrumentName;
	longName: string;
	audioPlayer: AudioPlayer;
};

export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	notes: instrumentName[][];
	noteDuration: number;
};

export type alertStates = "alert" | "confirm" | null;
