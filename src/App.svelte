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
		currentBlockIndex,
		blockLength,
		showSettings,
	} from "./ts/stores";

	import { convertURLParamsToBeat } from "@/ts/beatConverter";
	import { Instrument } from "@/ts/Instrument";
	import Settings from "./components/Settings.svelte";

	function startMusic() {
		$playState = "playing";
		playMusic();
	}

	function stopMusic() {
		$playState = "stopped";
		$currentBlockIndex = 0;
		$currentTime = 0;
	}

	function pauseMusic() {
		$playState = "paused";
	}

	function playMusic() {
		if ($playState !== "playing") return;
		playNotes();
		incrementTime();
		setTimeout(playMusic, $currentBeat.noteDuration);
	}

	function playNotes() {
		const currentNotes =
			$currentBeat.blocks[$currentBlockIndex][$currentTime];
		const playingInstruments = Instrument.list.filter(
			(instrument) => currentNotes.includes(instrument.key)
		);
		playingInstruments.forEach((instrument) => instrument.play());
	}

	function incrementTime() {
		$currentTime++;
		if ($currentTime >= $blockLength) {
			$currentTime = 0;
			$currentBlockIndex++;
			if ($currentBlockIndex == $currentBeat.blocks.length) {
				$currentBlockIndex = 0;
			}
		}
	}

	function loadBeatFromURL() {
		const search = window.location.search;
		if (!search) return;
		const params = new URLSearchParams(search.toLowerCase());
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

	onMount(() => {
		Instrument.loadAll();
		loadBeatFromURL();
	});
</script>

<Header />

{#if $showSettings}
	<Settings />
{:else}
	<main>
		<Menu {startMusic} {stopMusic} {pauseMusic} />
		<Timeline />
	</main>
{/if}

<Dialog />

<style lang="scss">
	@use "./scss/mixins" as *;
	main {
		@include flex-center(column);
	}
</style>
