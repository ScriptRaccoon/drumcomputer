import type { beat, instrumentName } from "@/ts/types";
import { instrumentNames } from "./instruments";

export function convertBeatToString(beat: beat) {
	const notesAsString = beat.notes
		.map((time) => time.join(""))
		.join("-");
	return (
		`?noteDuration=${beat.noteDuration}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLToBeat(
	urlParams: URLSearchParams
): beat | undefined {
	const noteDurationString = urlParams.get("noteDuration");
	const notesString = urlParams.get("notes");
	if (!noteDurationString || !notesString) return;
	const noteDuration = parseInt(noteDurationString);
	const notes = notesString
		?.split("-")
		.map((time) => time.split(""));
	if (
		notes.every((time): time is instrumentName[] =>
			time.every((note) => instrumentNames.includes(note))
		)
	)
		return { noteDuration, notes };

	return;
}
