<script lang="ts">
	import { currentBeat, currentTime } from "@/ts/stores";
	import type { instrument } from "@/ts/types";
	import { switchedArray } from "@/ts/utils";
	export let time: number;
	export let instrument: instrument;

	$: checked = $currentBeat.notes[time].includes(instrument.name);

	function handleChange() {
		$currentBeat.notes[time] = switchedArray(
			instrument.name,
			$currentBeat.notes[time]
		);
	}
</script>

<input
	class="note"
	type="checkbox"
	{checked}
	class:current={$currentTime == time}
	on:change={handleChange}
/>

<style lang="scss">
	.note {
		appearance: none;
		-webkit-appearance: none;
		cursor: pointer;
		width: min(40px, 10vw);
		aspect-ratio: 1;
		border-radius: 10%;
		background-color: var(--note-color-off);
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
