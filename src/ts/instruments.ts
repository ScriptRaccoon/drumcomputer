import type { instrument } from "@/ts/types";
import { AudioPlayer } from "@/ts/AudioPlayer";

export const instruments: instrument[] = [
	{
		name: "C",
		longName: "Crash",
		audioPlayer: new AudioPlayer("fx/Crash-Cymbal-Hit-C.mp3"),
	},
	{
		name: "R",
		longName: "Ride",
		audioPlayer: new AudioPlayer("fx/Ride-Cymbal-Hit-A.mp3"),
	},
	{
		name: "O",
		longName: "Open Hi Hat",
		audioPlayer: new AudioPlayer("fx/Hi-Hat-Open-Hit-A2.mp3"),
	},
	{
		name: "H",
		longName: "Hi Hat",
		audioPlayer: new AudioPlayer("fx/Hi-Hat-Closed-Hit-A2.mp3"),
	},
	{
		name: "D",
		longName: "Sticks",
		audioPlayer: new AudioPlayer("fx/Drum-Sticks-Hit-C.mp3"),
	},
	{
		name: "S",
		longName: "Snare",
		audioPlayer: new AudioPlayer(
			"fx/Snare-Drum-Hit-Level-5a.mp3"
		),
	},
	{
		name: "T",
		longName: "Small Tom",
		audioPlayer: new AudioPlayer(
			"fx/Small-Tom-Drum-Hit-Level-4B.mp3"
		),
	},
	{
		name: "M",
		longName: "Medium Tom",
		audioPlayer: new AudioPlayer(
			"fx/Medium-Tom-Drum-Hit-Level-4B.mp3"
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
