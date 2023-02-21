import { Instrument } from "@/ts/Instrument";

const instrumentData = [
	["c", "Crash", "fx/Crash-Cymbal-Hit-C.mp3"],
	["r", "Ride", "fx/Ride-Cymbal-Hit-A.mp3"],
	["o", "Open Hi Hat", "fx/Hi-Hat-Open-Hit-A2.mp3"],
	["h", "Hi Hat", "fx/Hi-Hat-Closed-Hit-A2.mp3"],
	["d", "Sticks", "fx/Drum-Sticks-Hit-C.mp3"],
	["s", "Snare", "fx/Snare-Drum-Hit-Level-5a.mp3"],
	["t", "Small Tom", "fx/Small-Tom-Drum-Hit-Level-4B.mp3"],
	["m", "Medium Tom", "fx/Medium-Tom-Drum-Hit-Level-4B.mp3"],
	["b", "Bass drum", "fx/Bass-Drum-Hit-Level-4a.mp3"],
] as const;

export const instrumentKeys = instrumentData.map((data) => data[0]);

export type instrumentKey = typeof instrumentKeys[number];

export function defineInstruments() {
	instrumentData.forEach(
		([key, name, src]) => new Instrument(key, name, src)
	);
}
