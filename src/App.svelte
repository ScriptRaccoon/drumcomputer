<script lang="ts">
	import { onMount } from "svelte";
	import Header from "@/components/layout/Header.svelte";
	import Menu from "@/components/Menu.svelte";
	import Beat from "@/components/Beat.svelte";
	import Alert from "@/components/ui/Alert.svelte";

	import {
		currentBeat,
		currentTime,
		setAlert,
		playState,
	} from "./ts/stores";

	import { convertURLToBeat } from "@/ts/beatConverter";
	import { instruments } from "@/ts/instruments";
	import StatusBar from "./components/StatusBar.svelte";

	function startMusic() {
		$playState = "playing";
		playNotes();
	}

	function stopMusic() {
		$playState = "stopped";
		$currentTime = 0;
	}

	function pauseMusic() {
		$playState = "paused";
	}

	function playNotes() {
		if ($playState !== "playing") return;
		const currentNotes = $currentBeat.notes[$currentTime];
		for (const instrument of instruments) {
			if (currentNotes.includes(instrument.name)) {
				instrument.audioPlayer.play();
			}
		}
		incrementTime();
		setTimeout(playNotes, $currentBeat.noteDuration);
	}

	function incrementTime() {
		$currentTime++;
		if ($currentTime >= $currentBeat.notes.length) {
			$currentTime = 0;
		}
	}

	onMount(() => {
		if (window.location.search.length == 0) return;
		const beatFromURL = convertURLToBeat(
			new URLSearchParams(window.location.search)
		);
		if (beatFromURL) {
			$currentBeat = beatFromURL;
		} else {
			setAlert(
				"alert",
				() => {},
				"Error: Beat could not be read from URL"
			);
		}
	});
</script>

<Header />

<main>
	<Menu
		on:play={startMusic}
		on:stop={stopMusic}
		on:pause={pauseMusic}
	/>
	<StatusBar />
	<Beat />
</main>

<Alert />

<style lang="scss">
	@use "./scss/mixins" as *;
	main {
		@include flex-center(column);
	}
</style>
