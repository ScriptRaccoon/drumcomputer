import type { beat, instrumentName } from "@/ts/types";
import { instrumentNames } from "./instruments";

export function convertBeatToString(beat: beat) {
	const notesAsString = beat.notes
		.map((time) => time.join(""))
		.join("-");
	return (
		`?name=${beat.name}` +
		`&noteDuration=${beat.noteDuration}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLToBeat(
	urlParams: URLSearchParams
): beat | undefined {
	const name = urlParams.get("name");
	const noteDurationString = urlParams.get("noteDuration");
	const notesString = urlParams.get("notes");
	if (!name || !noteDurationString || !notesString) return;
	const noteDuration = parseInt(noteDurationString);
	const notes = notesString
		?.split("-")
		.map((time) => time.split(""));
	if (
		notes.every((time): time is instrumentName[] =>
			time.every((note) => instrumentNames.includes(note))
		)
	)
		return { name, noteDuration, notes };

	return;
}
