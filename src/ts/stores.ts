import type { playStates, beat, dialogStateType } from "./types";
import { writable } from "svelte/store";
import { exampleBeat } from "@/ts/exampleBeat";

export const currentBeat = writable<beat>(exampleBeat);
export const currentTime = writable(0);
export const playState = writable<playStates>("stopped");

export const dialogState = writable<dialogStateType>({
	open: false,
	type: "alert",
	contents: [],
});

export const beatScrolls = writable<boolean>(true);
