import { Instrument } from "@/ts/Instrument";

// prettier-ignore
export function defineInstruments() {
	new Instrument("C", "Crash", "fx/Crash-Cymbal-Hit-C.mp3");
	new Instrument("R", "Ride", "fx/Ride-Cymbal-Hit-A.mp3");
	new Instrument("O", "Open Hi Hat", "fx/Hi-Hat-Open-Hit-A2.mp3");
	new Instrument("H", "Hi Hat", "fx/Hi-Hat-Closed-Hit-A2.mp3");
	new Instrument("D", "Sticks", "fx/Drum-Sticks-Hit-C.mp3");
	new Instrument("S", "Snare", "fx/Snare-Drum-Hit-Level-5a.mp3");
	new Instrument("T","Small Tom", "fx/Small-Tom-Drum-Hit-Level-4B.mp3");
	new Instrument("M","Medium Tom","fx/Medium-Tom-Drum-Hit-Level-4B.mp3");
	new Instrument("B", "Bass drum", "fx/Bass-Drum-Hit-Level-4a.mp3");
}
