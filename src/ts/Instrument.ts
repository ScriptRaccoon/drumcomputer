import { AudioPlayer } from "@/ts/AudioPlayer";
import type { instrumentKey } from "./types";

export class Instrument {
	key: instrumentKey;
	name: string;
	path: string;
	#audioPlayer: AudioPlayer;

	static list: Instrument[] = [];
	static keys: string[] = [];

	constructor(key: instrumentKey, name: string, path: string) {
		this.key = key;
		this.name = name;
		this.path = path;
		this.#audioPlayer = new AudioPlayer(path);
		Instrument.list.push(this);
		Instrument.keys.push(key);
	}

	play() {
		this.#audioPlayer.play();
	}

	static loadAll(callback: () => void) {
		let counter = 0;

		Instrument.list.forEach((instrument) => {
			instrument.#audioPlayer.load(incrementCounter);
		});

		function incrementCounter() {
			counter++;
			if (counter == Instrument.list.length) {
				callback();
			}
		}
	}
}
