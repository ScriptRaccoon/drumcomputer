<script lang="ts">
	import { currentBeat, currentTime } from "@/ts/stores";
</script>

<div aria-label="time counter">
	{$currentTime + 1}/{$currentBeat.notes.length}
</div>

<style>
	div {
		color: var(--dark-font-color);
		position: absolute;
		top: -20px;
		font-size: 14px;
		font-family: monospace;
	}
</style>
