import type { AudioPlayer } from "@/ts/AudioPlayer";

export type instrumentName = "R" | "H" | "OH" | "B" | "S" | "D";

export type instrument = {
	name: instrumentName;
	longName: string;
	audioPlayer: AudioPlayer;
};

export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	name: string;
	notes: instrumentName[][];
	noteDuration: number;
};
