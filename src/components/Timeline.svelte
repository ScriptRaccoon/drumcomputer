<script lang="ts">
	import { blockAmount, currentTrack } from "@/ts/stores";
	import InstrumentBar from "@/components/InstrumentBar.svelte";
	import Block from "@/components/Block.svelte";
	import TimelineMenu from "./TimelineMenu.svelte";
	import { scrollRight } from "@/ts/utils";

	export let timelineElement: HTMLElement;
</script>

<section aria-label="timeline" bind:this={timelineElement}>
	{#if $blockAmount > 0}
		<InstrumentBar />
		{#each $currentTrack.blocks as block, blockIndex}
			<Block bind:block {blockIndex} />
		{/each}
	{:else}
		<p>Add a block</p>
	{/if}
	<TimelineMenu
		on:blockAdded={() => scrollRight(timelineElement)}
	/>
</section>

<style>
	section {
		max-width: 100%;
		overflow-x: auto;
		display: flex;
		column-gap: 0.75rem;
		position: relative;
		padding: 1rem 1rem 1rem 0rem;
	}
	p {
		align-self: center;
	}
</style>
