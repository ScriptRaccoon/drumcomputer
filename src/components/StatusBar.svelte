<script lang="ts">
	import {
		beatScrolls,
		currentBeat,
		currentTime,
	} from "@/ts/stores";

	$: noteNumber = $currentBeat.notes.length;
	$: decimalLength = noteNumber.toString().length;
	$: timeString = `${($currentTime + 1)
		.toString()
		.padStart(decimalLength, "0")}/${noteNumber}`;
</script>

<section aria-label="status">
	<span>
		<span class="label">Time</span>
		{timeString}
	</span>

	<span>
		<span class="label">Note duration</span>
		{$currentBeat.noteDuration} ms
	</span>

	<label>
		<span class="label">Scrolling</span>
		<input type="checkbox" bind:checked={$beatScrolls} />
	</label>
</section>

<style lang="scss">
	section {
		width: min(30rem, 100%);
		display: flex;
		justify-content: space-between;
		padding-block: 0.4rem;
	}
	.label {
		color: var(--dark-font-color);
	}
	input[type="checkbox"] {
		accent-color: var(--button-color);
	}
</style>
