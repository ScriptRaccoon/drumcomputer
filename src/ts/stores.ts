import type { playStates, beat, dialogStateType } from "./types";
import { writable, derived } from "svelte/store";
import { exampleBeat } from "@/ts/exampleBeat";

export const currentBeat = writable<beat>(exampleBeat);
export const currentTime = writable<number>(0);
export const currentBlockIndex = writable<number>(0);
export const blockAmount = derived(
	currentBeat,
	(beat) => beat.blocks.length
);

export const playState = writable<playStates>("stopped");

export const dialogState = writable<dialogStateType>({
	open: false,
	type: "alert",
	contents: [],
});

export const timelineScrolls = writable<boolean>(true);

export const showSettings = writable<boolean>(false);
