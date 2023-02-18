import type { beat } from "@/ts/types";
import { chunkArray, stringIsPositiveInteger } from "./utils";

export function convertBeatToParams(beat: beat) {
	const notesAsString = beat.blocks
		.flat()
		.map((time) => time.join(""))
		.join("-");
	return (
		`?speed=${beat.speed}` +
		`&division=${beat.division}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLParamsToBeat(
	urlParams: URLSearchParams
): beat | undefined {
	const speedString = urlParams.get("speed");
	const divisionString = urlParams.get("division");
	const notesString = urlParams.get("notes");
	const valid =
		speedString &&
		divisionString &&
		notesString &&
		stringIsPositiveInteger(speedString) &&
		stringIsPositiveInteger(divisionString);
	if (!valid) return;
	const speed = parseInt(speedString);
	const division = parseInt(divisionString);
	const notesArray = notesString
		.toLowerCase()
		.split("-")
		.map((block) => block.split(""));
	const blocks = chunkArray(notesArray, division);
	if (!blocks) return;
	return { speed, division, blocks };
}
