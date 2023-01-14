import { instrumentNames } from "@/ts/instruments";
import type { beat } from "@/ts/types";

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
	if (!noteDurationString || !notesString) return;
	const noteDuration = parseInt(noteDurationString);
	const notes = notesString
		?.split("-")
		.map((time) => time.split(""));
	if (
		notes.some((time) =>
			time.some((note) => !instrumentNames.includes(note))
		)
	)
		return;
	return { name, noteDuration, notes } as beat;
}
