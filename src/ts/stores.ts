import type { playStates, beat } from "./types";
import { writable } from "svelte/store";
import { exampleBeat } from "@/ts/exampleBeat";

export const currentBeat = writable<beat>(exampleBeat);
export const currentTime = writable(0);
export const playState = writable<playStates>("stopped");
export const showConfirm = writable<boolean>(false);
export const confirmText = writable("");
export const confirmAction = writable<() => void>(undefined);

export function makeConfirm(txt: string, action: () => void) {
	showConfirm.set(true);
	confirmText.set(txt);
	confirmAction.set(action);
}
