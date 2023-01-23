import type { playStates, beat } from "./types";
import { writable } from "svelte/store";
import { exampleBeat } from "@/ts/exampleBeat";

export const currentBeat = writable<beat>(exampleBeat);
export const currentTime = writable(0);
export const playState = writable<playStates>("stopped");
export const durationError = writable<boolean>(false);
export const showConfirm = writable<boolean>(false);
export const confirmText = writable("");
export const confirmAction = writable<() => void>(undefined);
export const showAlert = writable<boolean>(false);
export const alertTexts = writable<string[]>([]);

export function makeConfirm(txt: string, action: () => void) {
	showConfirm.set(true);
	confirmText.set(txt);
	confirmAction.set(action);
}

export function makeAlert(...txts: string[]) {
	showAlert.set(true);
	alertTexts.set(txts);
}

export const beatScrolls = writable<boolean>(true);
