import type { instrument } from "@/ts/types";
import { AudioPlayer } from "@/ts/AudioPlayer";

export const instruments: instrument[] = [
	{
		key: "C",
		name: "Crash",
		audioPlayer: new AudioPlayer("fx/Crash-Cymbal-Hit-C.mp3"),
	},
	{
		key: "R",
		name: "Ride",
		audioPlayer: new AudioPlayer("fx/Ride-Cymbal-Hit-A.mp3"),
	},
	{
		key: "O",
		name: "Open Hi Hat",
		audioPlayer: new AudioPlayer("fx/Hi-Hat-Open-Hit-A2.mp3"),
	},
	{
		key: "H",
		name: "Hi Hat",
		audioPlayer: new AudioPlayer("fx/Hi-Hat-Closed-Hit-A2.mp3"),
	},
	{
		key: "D",
		name: "Sticks",
		audioPlayer: new AudioPlayer("fx/Drum-Sticks-Hit-C.mp3"),
	},
	{
		key: "S",
		name: "Snare",
		audioPlayer: new AudioPlayer(
			"fx/Snare-Drum-Hit-Level-5a.mp3"
		),
	},
	{
		key: "T",
		name: "Small Tom",
		audioPlayer: new AudioPlayer(
			"fx/Small-Tom-Drum-Hit-Level-4B.mp3"
		),
	},
	{
		key: "M",
		name: "Medium Tom",
		audioPlayer: new AudioPlayer(
			"fx/Medium-Tom-Drum-Hit-Level-4B.mp3"
		),
	},

	{
		key: "B",
		name: "Bass drum",
		audioPlayer: new AudioPlayer("fx/Bass-Drum-Hit-Level-4a.mp3"),
	},
];

export const instrumentKeys: string[] = instruments.map((i) => i.key);
