<script lang="ts">
	import { currentBeat, currentTime } from "@/ts/stores";
	import { instruments } from "@/ts/instruments";
	export let time: number;
</script>

<div class="time">
	{#each instruments as instrument}
		<input
			class="note"
			type="checkbox"
			value={instrument.name}
			bind:group={$currentBeat.notes[time]}
			class:current={$currentTime == time}
		/>
	{/each}
</div>

<style lang="scss">
	.time {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
	.note {
		appearance: none;
		-webkit-appearance: none;
		cursor: pointer;
		width: min(40px, 10vw);
		aspect-ratio: 1;
		border-radius: 10%;
		background-color: var(--note-color-off);
		print-color-adjust: exact;
		&:checked {
			background-color: var(--note-color-on);
		}
		&:focus-visible {
			z-index: 10;
			outline: 1px solid white;
		}
		&.current {
			filter: brightness(1.4);
		}
	}
</style>
