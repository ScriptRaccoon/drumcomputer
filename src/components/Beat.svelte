<script lang="ts">
	import { fade } from "svelte/transition";
	import { Instrument } from "@/ts/Instrument";
	import type { beat } from "@/ts/types";
	import {
		currentBeatIndex,
		currentTime,
		playState,
		timelineScrolls,
	} from "@/ts/stores";
	export let beat: beat = [];
	export let beatIndex: number = 0;

	const columns: HTMLElement[] = [];

	const scrollOptions: ScrollIntoViewOptions = { inline: "center" };

	$: scrollToColumn($currentBeatIndex, $currentTime);

	function scrollToColumn(index: number, time: number) {
		const column = columns[time];
		const scrolls =
			beatIndex == index &&
			$playState == "playing" &&
			$timelineScrolls;
		if (scrolls) column?.scrollIntoView(scrollOptions);
	}
</script>

<div class="beat" transition:fade={{ duration: 150 }}>
	{#each beat as _, timeIndex}
		{@const timeCode = `${beatIndex + 1}.${timeIndex + 1}`}
		<div class="column" bind:this={columns[timeIndex]}>
			{#each Instrument.list as instrument}
				<input
					aria-label="{instrument.name} at {timeCode}"
					class="note"
					type="checkbox"
					value={instrument.key}
					bind:group={beat[timeIndex]}
					class:current={beatIndex == $currentBeatIndex &&
						timeIndex == $currentTime}
				/>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.beat {
		display: flex;
		column-gap: 0.125rem;
	}

	.column {
		display: flex;
		flex-direction: column;
		row-gap: 0.125rem;
	}

	.note {
		appearance: none;
		-webkit-appearance: none;
		cursor: pointer;
		width: var(--note-size);
		aspect-ratio: 1;
		border-radius: 10%;
		background-color: var(--note-color-off);
		print-color-adjust: exact;
		&:checked {
			background-color: var(--note-color-on);
		}
		&:focus-visible {
			outline: 0.1rem solid white;
		}
	}

	.note.current {
		&:checked {
			background-color: var(--note-color-on-current);
		}
		&:not(:checked) {
			background-color: var(--note-color-off-current);
		}
	}
</style>
