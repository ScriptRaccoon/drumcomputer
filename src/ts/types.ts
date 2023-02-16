import type { AudioPlayer } from "@/ts/AudioPlayer";

// prettier-ignore
export type instrumentKey =
	"C" | "R" | "H" | "O" | "B" |
	"S" | "D" | "T" | "M";

export type instrument = {
	key: instrumentKey;
	name: string;
	audioPlayer: AudioPlayer;
};

export type playStates = "stopped" | "playing" | "paused";

export type beat = {
	notes: instrumentKey[][];
	noteDuration: number;
};

export type dialogStateType = {
	open: boolean;
	type: "alert" | "confirm";
	contents: string[];
	action?: () => void;
};
