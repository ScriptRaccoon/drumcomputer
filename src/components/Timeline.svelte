<script>
	import { currentBeat } from "@/ts/stores";
	import InstrumentBar from "@/components/InstrumentBar.svelte";
	import Block from "@/components/Block.svelte";
	import TimelineMenu from "./TimelineMenu.svelte";
</script>

{#if $currentBeat.blocks.length > 0}
	<section aria-label="timeline">
		<InstrumentBar />
		{#each $currentBeat.blocks as block, blockIndex}
			<Block bind:block {blockIndex} />
		{/each}
		<TimelineMenu />
	</section>
{:else}
	<p class="empty-message">The timeline is empty</p>
{/if}

<style>
	section {
		max-width: 100%;
		overflow-x: auto;
		display: flex;
		column-gap: 0.75rem;
		position: relative;
		padding: 1rem 1rem 1rem 0rem;
	}
	.empty-message {
		margin-top: 2rem;
	}
</style>
