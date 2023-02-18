import type { beat } from "@/ts/types";
import { Instrument } from "@/ts/Instrument";

export function convertBeatToParams(beat: beat) {
	const notesAsString = beat.notes
		.map((time) => time.join(""))
		.join("-");
	return (
		`?noteduration=${beat.noteDuration}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLParamsToBeat(
	urlParams: URLSearchParams
): beat | undefined {
	const noteDurationString = urlParams.get("noteduration");
	const notesString = urlParams.get("notes");
	if (!noteDurationString || !notesString) return;
	const noteDuration = parseInt(noteDurationString);
	const notes = notesString
		.toLowerCase()
		.split("-")
		.map((time) => time.split(""));
	if (notes.flat().every((key) => Instrument.keys.includes(key))) {
		return { noteDuration, notes };
	}

	return;
}
