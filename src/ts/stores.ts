import type { playStates, track, dialogStateType } from "./types";
import { writable, derived } from "svelte/store";
import { exampleTrack } from "@/ts/exampleTrack";

export const currentTrack = writable<track>(exampleTrack);
export const currentTime = writable<number>(0);
export const currentBlockIndex = writable<number>(0);
export const noteDuration = derived(
	currentTrack,
	(track) => 60000 / (track.division * track.speed)
);
export const blockAmount = derived(
	currentTrack,
	(track) => track.blocks.length
);

export const playState = writable<playStates>("stopped");

export const dialogState = writable<dialogStateType>({
	open: false,
	type: "alert",
	contents: [],
});

export const timelineScrolls = writable<boolean>(true);

export const showSettings = writable<boolean>(false);
