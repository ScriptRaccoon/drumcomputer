// inspired by:
// https://blog.cotten.io/playing-audio-resources-simultaneously-in-javascript-546ec4d6216a

export class AudioPlayer {
	#channels: HTMLAudioElement[];
	#currentChannel: number;

	constructor(audioSource: string, channelNumber: number = 10) {
		this.#channels = new Array(channelNumber)
			.fill(null)
			.map(() => new Audio(audioSource));
		this.#currentChannel = 0;
	}

	load() {
		this.#channels.every((channel) => channel.load());
	}

	play() {
		this.#channels[this.#currentChannel].play();
		this.#currentChannel++;
		if (this.#currentChannel == this.#channels.length)
			this.#currentChannel = 0;
	}
}
