<script>
	import { currentBeat } from "@/ts/stores";
	import Time from "@/lib/Time.svelte";
	import TimeCounter from "./TimeCounter.svelte";
</script>

{#if $currentBeat.notes.length > 0}
	<div class="beat">
		<TimeCounter />
		{#each $currentBeat.notes as _, time}
			<Time {time} />
		{/each}
	</div>
{:else}
	<p>The beat is empty</p>
{/if}

<style>
	.beat {
		display: flex;
		flex-wrap: wrap;
		row-gap: 10px;
		column-gap: 2px;
		position: relative;
	}
</style>
