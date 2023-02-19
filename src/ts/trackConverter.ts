import type { track, beat } from "@/ts/types";
import { instrumentKeys } from "@/ts/types";
import { chunkArray, stringIsPositiveInteger } from "@/ts/utils";

export function convertTrackToParams(track: track) {
	const notesAsString = track.beats
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
		.map((beat) => beat.split(""));
	const beats = chunkArray(notesArray, division);
	if (!beats) return;
	if (checkBeats(beats)) {
		return { speed, division, beats };
	}
}

function checkBeats(beats: string[][][]): beats is beat[] {
	return beats.every((beat) =>
		beat.every((column) =>
			column.every((char) =>
				(instrumentKeys as any as string[]).includes(char)
			)
		)
	);
}
