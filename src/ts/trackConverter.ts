import type { track, beat } from "@/ts/types";
import { chunkArray, stringIsPositiveInteger } from "@/ts/utils";
import { Instrument } from "@/ts/Instrument";
import { instrumentKeys } from "@/ts/instruments";

export function convertTrackToParams(track: track): URLSearchParams {
	const notesAsString = track.beats
		.flat()
		.map((time) => time.join(""))
		.join("-");
	const params = new URLSearchParams();
	params.set("speed", track.speed.toString());
	params.set("subdivisions", track.subdivisions.toString());
	params.set("notes", notesAsString);
	return params;
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
			column.every((key) =>
				(instrumentKeys as string[]).includes(key)
			)
		)
	);
}
