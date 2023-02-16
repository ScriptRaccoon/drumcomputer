import type { beat, instrumentKey } from "@/ts/types";
import { instrumentKeys } from "./instruments";

export function convertBeatToParams(beat: beat) {
	const notesAsString = beat.notes
		.map((time) => time.join(""))
		.join("-");
	return (
		`?noteDuration=${beat.noteDuration}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLParamsToBeat(
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
		notes.every((time): time is instrumentKey[] =>
			time.every((note) => instrumentKeys.includes(note))
		)
	) {
		return { noteDuration, notes };
	}

	return;
}
