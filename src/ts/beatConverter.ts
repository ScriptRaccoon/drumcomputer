import type { beat } from "@/ts/types";
import { chunkArray, stringIsPositiveInteger } from "./utils";

export function convertBeatToParams(beat: beat) {
	const notesAsString = beat.blocks
		.flat()
		.map((time) => time.join(""))
		.join("-");
	return (
		`?noteduration=${beat.noteDuration}` +
		`&division=${beat.division}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLParamsToBeat(
	urlParams: URLSearchParams
): beat | undefined {
	const noteDurationString = urlParams.get("noteduration");
	const divisionString = urlParams.get("division");
	const notesString = urlParams.get("notes");
	const valid =
		noteDurationString &&
		divisionString &&
		notesString &&
		stringIsPositiveInteger(noteDurationString) &&
		stringIsPositiveInteger(divisionString);
	if (!valid) return;
	const noteDuration = parseInt(noteDurationString);
	const division = parseInt(divisionString);
	const notesArray = notesString
		.toLowerCase()
		.split("-")
		.map((block) => block.split(""));
	const blocks = chunkArray(notesArray, division);
	if (!blocks) return;
	return { noteDuration, division, blocks };
}
