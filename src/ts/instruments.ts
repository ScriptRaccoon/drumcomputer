import type { instrument } from "@/ts/types";
import { AudioController } from "@/ts/AudioController";

export const instruments: instrument[] = [
	{
		name: "HH",
		soundFile: "fx/Hi-Hat-Closed-Hit-A2.mp3",
	},
	{
		name: "S",
		soundFile: "fx/Snare-Drum-Hit-Level-4a.mp3",
	},
	{
		name: "B",
		soundFile: "fx/Bass-Drum-Hit-Level-4a.mp3",
	},
];

export const audioControls = instruments.map(
	(instrument) =>
		new AudioController(instrument.name, instrument.soundFile)
);
