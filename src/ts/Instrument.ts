import { AudioPlayer } from "@/ts/AudioPlayer";
import type { instrumentKey } from "@/ts/instruments";

export class Instrument {
	key: instrumentKey;
	name: string;
	#audioPlayer: AudioPlayer;

	static list: Instrument[] = [];
	static keys: string[] = [];

	constructor(key: instrumentKey, name: string, path: string) {
		this.key = key;
		this.name = name;
		this.#audioPlayer = new AudioPlayer(path);
		Instrument.list.push(this);
		Instrument.keys.push(key);
	}

	play() {
		this.#audioPlayer.play();
	}

	load() {
		this.#audioPlayer.load();
	}

	static loadAll() {
		Instrument.list.every((instrument) => instrument.load());
	}
}
