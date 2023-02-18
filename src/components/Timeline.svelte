<script lang="ts">
	import { currentBeat } from "@/ts/stores";
	import InstrumentBar from "@/components/InstrumentBar.svelte";
	import Block from "@/components/Block.svelte";
	import TimelineMenu from "./TimelineMenu.svelte";
	import { tick } from "svelte";

	let timelineElement: HTMLElement;

	export async function scrollLeft() {
		await tick();
		timelineElement.scrollLeft = 0;
	}

	async function scrollRight() {
		await tick();
		timelineElement.scrollLeft = timelineElement.scrollWidth;
	}
</script>

<section aria-label="timeline" bind:this={timelineElement}>
	{#if $currentBeat.blocks.length > 0}
		<InstrumentBar />
		{#each $currentBeat.blocks as block, blockIndex}
			<Block bind:block {blockIndex} />
		{/each}
	{:else}
		<p>Add a block</p>
	{/if}
	<TimelineMenu on:blockAdded={scrollRight} />
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
