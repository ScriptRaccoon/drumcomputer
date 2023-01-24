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
		column-gap: 0.125rem;
		position: relative;
		padding: 1rem 1rem 1rem 0rem;
	}
	.empty-message {
		margin-top: 2rem;
	}
</style>
