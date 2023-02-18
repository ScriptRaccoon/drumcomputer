import { Instrument } from "@/ts/Instrument";

// prettier-ignore
export function defineInstruments() {
	new Instrument("c", "Crash", "fx/Crash-Cymbal-Hit-C.mp3");
	new Instrument("r", "Ride", "fx/Ride-Cymbal-Hit-A.mp3");
	new Instrument("o", "Open Hi Hat", "fx/Hi-Hat-Open-Hit-A2.mp3");
	new Instrument("h", "Hi Hat", "fx/Hi-Hat-Closed-Hit-A2.mp3");
	new Instrument("d", "Sticks", "fx/Drum-Sticks-Hit-C.mp3");
	new Instrument("s", "Snare", "fx/Snare-Drum-Hit-Level-5a.mp3");
	new Instrument("t","Small Tom", "fx/Small-Tom-Drum-Hit-Level-4B.mp3");
	new Instrument("m","Medium Tom","fx/Medium-Tom-Drum-Hit-Level-4B.mp3");
	new Instrument("b", "Bass drum", "fx/Bass-Drum-Hit-Level-4a.mp3");
}
