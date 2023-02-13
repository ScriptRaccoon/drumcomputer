import type { playStates, beat, dialogStates } from "./types";
import { writable } from "svelte/store";
import { exampleBeat } from "@/ts/exampleBeat";

export const currentBeat = writable<beat>(exampleBeat);
export const currentTime = writable(0);
export const playState = writable<playStates>("stopped");

export const dialogTexts = writable<string[]>([]);
export const dialogState = writable<dialogStates>(null);
export const dialogAction = writable(() => {});

export function setConfirm(action: () => void, ...txts: string[]) {
	dialogState.set("confirm");
	dialogTexts.set(txts);
	dialogAction.set(action);
}

export function setAlert(...txts: string[]) {
	dialogState.set("alert");
	dialogTexts.set(txts);
}

export const beatScrolls = writable<boolean>(true);
