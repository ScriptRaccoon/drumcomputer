<script lang="ts">
	import { currentBeat, currentTime } from "@/ts/stores";
	$: noteNumber = $currentBeat.notes.length;
	$: timeString = `${$currentTime + 1}/${noteNumber}`;
</script>

<div class="status">
	<span class="time">Time: {timeString}</span>
	<span>Note duration: {$currentBeat.noteDuration} ms</span>
</div>

<style lang="scss">
	@use "../scss/mixins.scss" as *;
	.status {
		@include flex-center();
		color: var(--dark-font-color);
		padding-block: 5px;
	}
	.time {
		min-width: 100px;
	}
</style>
