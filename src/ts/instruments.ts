import type { instrument } from "@/ts/types";
import { AudioPlayer } from "@/ts/AudioPlayer";

export const instruments: instrument[] = [
	{
		name: "H",
		longName: "Hi Hat",
		audioPlayer: new AudioPlayer("fx/Hi-Hat-Closed-Hit-A2.mp3"),
	},
	{
		name: "S",
		longName: "Snare",
		audioPlayer: new AudioPlayer(
			"fx/Snare-Drum-Hit-Level-4a.mp3"
		),
	},
	{
		name: "B",
		longName: "Bass drum",
		audioPlayer: new AudioPlayer("fx/Bass-Drum-Hit-Level-4a.mp3"),
	},
];

export const instrumentNames: string[] = instruments.map(
	(i) => i.name
);
