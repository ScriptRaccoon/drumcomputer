import type { instrument } from "@/ts/types";
import { AudioController } from "@/ts/AudioController";

export const instruments: instrument[] = [
	{
		name: "H",
		longName: "Hi Hat",
		audioPlayer: new AudioController(
			"fx/Hi-Hat-Closed-Hit-A2.mp3"
		),
	},
	{
		name: "S",
		longName: "Snare",
		audioPlayer: new AudioController(
			"fx/Snare-Drum-Hit-Level-4a.mp3"
		),
	},
	{
		name: "B",
		longName: "Bass drum",
		audioPlayer: new AudioController(
			"fx/Bass-Drum-Hit-Level-4a.mp3"
		),
	},
];

export const instrumentNames: string[] = instruments.map(
	(i) => i.name
);
