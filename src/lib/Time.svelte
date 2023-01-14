<script lang="ts">
	import { instruments } from "@/ts/instruments";
	import Note from "@/lib/Note.svelte";
	export let time: number;
</script>

<div class="time">
	{#each instruments as instrument}
		<Note {time} {instrument} />
	{/each}
</div>

<style>
	.time {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}
</style>
