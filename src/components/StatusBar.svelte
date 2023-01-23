<script lang="ts">
	import {
		beatScrolls,
		currentBeat,
		currentTime,
	} from "@/ts/stores";
	$: noteNumber = $currentBeat.notes.length;
	$: timeString = `${$currentTime + 1}/${noteNumber}`;
</script>

<div class="status">
	<span><span class="label">Time</span> {timeString}</span>
	<span
		><span class="label">Note duration</span>
		{$currentBeat.noteDuration} ms</span
	>
	<span>
		<label>
			<span class="label">Scrolling</span>
			<input type="checkbox" bind:checked={$beatScrolls} />
		</label>
	</span>
</div>

<style lang="scss">
	.status {
		width: 100%;
		display: flex;
		justify-content: space-evenly;
		padding-block: 5px;
		gap: 5px;
		@media (min-width: 640px) {
			justify-content: center;
			gap: 35px;
		}
	}
	.label {
		color: var(--dark-font-color);
	}
	input[type="checkbox"] {
		accent-color: var(--button-color);
	}
</style>
