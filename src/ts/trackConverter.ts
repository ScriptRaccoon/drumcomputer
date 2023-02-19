import type { track, block } from "@/ts/types";
import { instrumentKeys } from "@/ts/types";
import { chunkArray, stringIsPositiveInteger } from "@/ts/utils";

export function convertTrackToParams(track: track) {
	const notesAsString = track.blocks
		.flat()
		.map((time) => time.join(""))
		.join("-");
	return (
		`?speed=${track.speed}` +
		`&division=${track.division}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLParamsToTrack(
	urlParams: URLSearchParams
): track | undefined {
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
	if (checkBlocks(blocks)) {
		return { speed, division, blocks };
	}
}

function checkBlocks(blocks: string[][][]): blocks is block[] {
	return blocks.every((block) =>
		block.every((column) =>
			column.every((char) =>
				(instrumentKeys as any as string[]).includes(char)
			)
		)
	);
}
