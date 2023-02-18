import type { beat } from "@/ts/types";
import { chunkArray, stringIsPositiveInteger } from "./utils";

export function convertBeatToParams(beat: beat) {
	const notesAsString = beat.blocks
		.flat()
		.map((time) => time.join(""))
		.join("-");
	return (
		`?noteduration=${beat.noteDuration}` +
		`&blocklength=${beat.blockLength}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLParamsToBeat(
	urlParams: URLSearchParams
): beat | undefined {
	const noteDurationString = urlParams.get("noteduration");
	const blockLengthString = urlParams.get("blocklength");
	const notesString = urlParams.get("notes");
	const valid =
		noteDurationString &&
		blockLengthString &&
		notesString &&
		stringIsPositiveInteger(noteDurationString) &&
		stringIsPositiveInteger(blockLengthString);
	if (!valid) return;
	const noteDuration = parseInt(noteDurationString);
	const blockLength = parseInt(blockLengthString);
	const notesArray = notesString
		.toLowerCase()
		.split("-")
		.map((block) => block.split(""));
	const blocks = chunkArray(notesArray, blockLength);
	if (!blocks) return;
	return { noteDuration, blockLength, blocks };
}
