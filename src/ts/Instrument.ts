import { AudioPlayer } from "@/ts/AudioPlayer";

export class Instrument {
	key: string;
	name: string;
	#audioPlayer: AudioPlayer;

	static list: Instrument[] = [];
	static keys: string[] = [];

	constructor(key: string, name: string, path: string) {
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
		this.list.every((instrument) => instrument.load());
	}
}
