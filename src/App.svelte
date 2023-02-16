<script lang="ts">
	import { onMount } from "svelte";
	import Header from "@/components/Header.svelte";
	import Menu from "@/components/Menu.svelte";
	import Timeline from "@/components/Timeline.svelte";
	import Dialog from "@/components/Dialog.svelte";

	import {
		currentBeat,
		currentTime,
		dialogState,
		playState,
		currentNotes,
	} from "./ts/stores";

	import { convertURLParamsToBeat } from "@/ts/beatConverter";
	import { instruments } from "@/ts/instruments";
	import StatusBar from "./components/StatusBar.svelte";

	function startMusic() {
		$playState = "playing";
		playMusic();
	}

	function stopMusic() {
		$playState = "stopped";
		$currentTime = 0;
	}

	function pauseMusic() {
		$playState = "paused";
	}

	function playMusic() {
		if ($playState !== "playing") return;
		playNotes();
		incrementCurrentTime();
		setTimeout(playMusic, $currentBeat.noteDuration);
	}

	function playNotes() {
		for (const instrument of instruments) {
			if ($currentNotes.includes(instrument.key)) {
				instrument.audioPlayer.play();
			}
		}
	}

	function incrementCurrentTime() {
		$currentTime++;
		if ($currentTime >= $currentBeat.notes.length) {
			$currentTime = 0;
		}
	}

	onMount(loadBeatFromURL);

	function loadBeatFromURL() {
		const search = window.location.search;
		if (!search) return;
		const params = new URLSearchParams(search);
		const beatFromURL = convertURLParamsToBeat(params);
		if (beatFromURL) {
			$currentBeat = beatFromURL;
		} else {
			$dialogState = {
				open: true,
				type: "alert",
				contents: ["Error: Beat could not be read from URL"],
			};
		}
	}
</script>

<Header />

<main>
	<Menu
		on:play={startMusic}
		on:stop={stopMusic}
		on:pause={pauseMusic}
	/>
	<StatusBar />
	<Timeline />
</main>

<Dialog />

<style lang="scss">
	@use "./scss/mixins" as *;
	main {
		@include flex-center(column);
	}
</style>
