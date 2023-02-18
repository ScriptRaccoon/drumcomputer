<script lang="ts">
	import { Instrument } from "@/ts/Instrument";
	import type { block } from "@/ts/types";
	import {
		currentBlockIndex,
		currentTime,
		playState,
		timelineScrolls,
	} from "@/ts/stores";
	export let block: block = [];
	export let blockIndex: number = 0;

	const columns: HTMLElement[] = [];

	$: if (
		$playState == "playing" &&
		$timelineScrolls &&
		blockIndex == $currentBlockIndex
	) {
		columns[$currentTime]?.scrollIntoView({
			inline: "center",
		});
	}
</script>

<div class="block">
	{#each block as _, timeIndex}
		{@const timeCode = `${blockIndex + 1}.${timeIndex + 1}`}
		<div class="column" bind:this={columns[timeIndex]}>
			{#each Instrument.list as instrument}
				<input
					aria-label="{instrument.name} at {timeCode}"
					class="note"
					type="checkbox"
					value={instrument.key}
					bind:group={block[timeIndex]}
					class:current={blockIndex == $currentBlockIndex &&
						timeIndex == $currentTime}
				/>
			{/each}
		</div>
	{/each}
</div>

<style lang="scss">
	.block {
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
