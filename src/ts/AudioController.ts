// https://blog.cotten.io/playing-audio-resources-simultaneously-in-javascript-546ec4d6216a

import type { instrumentName } from "@/ts/types";

export class AudioController {
	name: instrumentName;
	#channels: HTMLAudioElement[];
	#currentChannel: number;

	constructor(
		name: instrumentName,
		audioSource: string,
		channelNumber: number = 10
	) {
		this.name = name;
		this.#channels = new Array(channelNumber)
			.fill(null)
			.map(() => new Audio(audioSource));
		this.#currentChannel = 0;
	}

	play() {
		this.#channels[this.#currentChannel].play();
		this.#currentChannel++;
		if (this.#currentChannel == this.#channels.length)
			this.#currentChannel = 0;
	}
}
