import type { playStates, beat, alertStates } from "./types";
import { writable } from "svelte/store";
import { exampleBeat } from "@/ts/exampleBeat";

export const currentBeat = writable<beat>(exampleBeat);
export const currentTime = writable(0);
export const playState = writable<playStates>("stopped");

export const alertTexts = writable<string[]>([]);
export const alertState = writable<alertStates>(null);
export const alertAction = writable(() => {});

export function setConfirm(action: () => void, ...txts: string[]) {
	alertState.set("confirm");
	alertTexts.set(txts);
	alertAction.set(action);
}

export function setAlert(...txts: string[]) {
	alertState.set("alert");
	alertTexts.set(txts);
}

export const beatScrolls = writable<boolean>(true);
