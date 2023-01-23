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
	<span>Time: {timeString}</span>
	<span>Note duration: {$currentBeat.noteDuration} ms</span>
	<span>
		<label>
			Beat scrolls
			<input type="checkbox" bind:checked={$beatScrolls} />
		</label>
	</span>
</div>

<style lang="scss">
	@use "../scss/mixins.scss" as *;
	.status {
		@include flex-center();
		color: var(--dark-font-color);
		padding-block: 5px;
		column-gap: 25px;
	}
	input[type="checkbox"] {
		accent-color: var(--button-color);
	}
</style>
