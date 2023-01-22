<script>
	import { currentBeat } from "@/ts/stores";
	import Time from "@/components/Time.svelte";
	import TimeCounter from "@/components/utils/TimeCounter.svelte";
</script>

{#if $currentBeat.notes.length > 0}
	<div class="beat">
		<TimeCounter />
		{#each $currentBeat.notes as _, time}
			<Time {time} />
		{/each}
	</div>
{:else}
	<p class="empty-message">The beat is empty</p>
{/if}

<style>
	.beat {
		display: flex;
		flex-wrap: wrap;
		row-gap: 20px;
		column-gap: 2px;
		position: relative;
		margin-top: 30px;
	}
	.empty-message {
		margin-top: 30px;
	}
</style>
