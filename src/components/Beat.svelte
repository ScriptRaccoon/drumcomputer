<script>
	import { currentBeat } from "@/ts/stores";
	import Time from "@/components/Time.svelte";
	import Instruments from "./Instruments.svelte";
</script>

{#if $currentBeat.notes.length > 0}
	<div class="beat">
		<Instruments />
		{#each $currentBeat.notes as _, time}
			<Time {time} />
		{/each}
	</div>
{:else}
	<p class="empty-message">The beat is empty</p>
{/if}

<style>
	.beat {
		max-width: 100%;
		overflow-x: auto;
		display: flex;
		row-gap: 20px;
		column-gap: 2px;
		position: relative;
		padding: 30px 20px 10px 0px;
	}
	.empty-message {
		margin-top: 30px;
	}
</style>
