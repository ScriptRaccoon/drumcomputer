<script lang="ts">
	import { onMount } from "svelte";
	import Header from "@/lib/Header.svelte";
	import Menu from "@/lib/Menu.svelte";
	import Beat from "@/lib/Beat.svelte";
	import Form from "@/lib/Form.svelte";
	import Confirm from "@/lib/Confirm.svelte";
	import Alert from "@/lib/Alert.svelte";

	import {
		currentBeat,
		currentTime,
		makeAlert,
		playState,
	} from "./ts/stores";

	import { convertURLToBeat } from "@/ts/beatConverter";
	import { instruments } from "@/ts/instruments";

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
			makeAlert("Error: Beat could not be read from URL");
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
	<Form />
	<Beat />
</main>

<Confirm />
<Alert />

<style lang="scss">
	@use "./scss/mixins" as *;
	main {
		@include flex-center(column);
	}
</style>
