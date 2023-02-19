<script lang="ts">
	import { onMount } from "svelte";
	import Header from "@/components/Header.svelte";
	import Menu from "@/components/Menu.svelte";
	import Timeline from "@/components/Timeline.svelte";
	import Dialog from "@/components/Dialog.svelte";

	import {
		currentTrack,
		currentTime,
		dialogState,
		playState,
		currentBlockIndex,
		showSettings,
		blockAmount,
		noteDuration,
	} from "./ts/stores";

	import { convertURLParamsToTrack } from "@/ts/trackConverter";
	import { Instrument } from "@/ts/Instrument";
	import Settings from "./components/Settings.svelte";
	import { scrollLeft } from "./ts/utils";

	let timelineElement: HTMLElement;

	function startMusic() {
		$playState = "playing";
		playMusic();
	}

	function stopMusic() {
		$playState = "stopped";
		$currentBlockIndex = 0;
		$currentTime = 0;
		scrollLeft(timelineElement);
	}

	function pauseMusic() {
		$playState = "paused";
	}

	function playMusic() {
		if ($playState !== "playing") return;
		playNotes();
		incrementTime();
		setTimeout(playMusic, $noteDuration);
	}

	function playNotes() {
		const currentNotes =
			$currentTrack.blocks[$currentBlockIndex][$currentTime];
		const playingInstruments = Instrument.list.filter(
			(instrument) => currentNotes.includes(instrument.key)
		);
		playingInstruments.forEach((instrument) => instrument.play());
	}

	function incrementTime() {
		$currentTime++;
		if ($currentTime >= $currentTrack.division) {
			$currentTime = 0;
			$currentBlockIndex++;
			if ($currentBlockIndex == $blockAmount) {
				$currentBlockIndex = 0;
			}
		}
	}

	function loadTrackFromURL() {
		const search = window.location.search;
		if (!search) return;
		const params = new URLSearchParams(search.toLowerCase());
		const trackFromURL = convertURLParamsToTrack(params);
		if (trackFromURL) {
			$currentTrack = trackFromURL;
		} else {
			$dialogState = {
				open: true,
				type: "alert",
				contents: ["Error: Track could not be read from URL"],
			};
		}
	}

	onMount(() => {
		Instrument.loadAll();
		loadTrackFromURL();
	});
</script>

<Header />

{#if $showSettings}
	<Settings />
{:else}
	<main>
		<Menu {startMusic} {stopMusic} {pauseMusic} />
		<Timeline bind:timelineElement />
	</main>
{/if}

<Dialog />

<style lang="scss">
	@use "./scss/mixins" as *;
	main {
		@include flex-center(column);
	}
</style>
