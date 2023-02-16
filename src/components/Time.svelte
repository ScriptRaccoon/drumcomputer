<script lang="ts">
	import {
		timelineScrolls,
		currentBeat,
		currentTime,
		playState,
	} from "@/ts/stores";
	import { instruments } from "@/ts/instruments";

	export let time: number;

	let timeElement: HTMLElement;

	$: isCurrent = $currentTime === time;
	$: if ($playState == "playing" && isCurrent && $timelineScrolls) {
		timeElement?.scrollIntoView({
			inline: "center",
		});
	}
</script>

{#if time < $currentBeat.notes.length}
	<div bind:this={timeElement} class="time" class:isCurrent>
		{#each instruments as instrument}
			<input
				class="note"
				type="checkbox"
				value={instrument.key}
				bind:group={$currentBeat.notes[time]}
			/>
		{/each}
	</div>
{/if}

<style lang="scss">
	.time {
		display: flex;
		flex-direction: column;
		row-gap: 0.125rem;
	}

	.time.isCurrent .note {
		&:checked {
			background-color: var(--note-color-on-current);
		}
		&:not(:checked) {
			background-color: var(--note-color-off-current);
		}
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
</style>
