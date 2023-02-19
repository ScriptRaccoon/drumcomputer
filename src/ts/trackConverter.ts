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
		`&subdivisions=${track.subdivisions}` +
		`&notes=${notesAsString}`
	);
}

export function convertURLParamsToTrack(
	urlParams: URLSearchParams
): track | undefined {
	const speedString = urlParams.get("speed");
	const subdivisionsString = urlParams.get("subdivisions");
	const notesString = urlParams.get("notes");
	const valid =
		speedString &&
		subdivisionsString &&
		notesString &&
		stringIsPositiveInteger(speedString) &&
		stringIsPositiveInteger(subdivisionsString);
	if (!valid) return;
	const speed = parseInt(speedString);
	const subdivisions = parseInt(subdivisionsString);
	const notesArray = notesString
		.toLowerCase()
		.split("-")
		.map((beat) => beat.split(""));
	const beats = chunkArray(notesArray, subdivisions);
	if (!beats) return;
	if (checkBeats(beats)) {
		return { speed, subdivisions, beats };
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
