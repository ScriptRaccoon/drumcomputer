<script lang="ts">
	import { beatAmount, currentTrack } from "@/ts/stores";
	import InstrumentBar from "@/components/InstrumentBar.svelte";
	import Beat from "@/components/Beat.svelte";
	import TimelineMenu from "./TimelineMenu.svelte";
	import { scrollRight } from "@/ts/utils";

	export let timelineElement: HTMLElement;
</script>

<section aria-label="timeline" bind:this={timelineElement}>
	{#if $beatAmount > 0}
		<InstrumentBar />
		{#each $currentTrack.beats as beat, beatIndex}
			<Beat bind:beat {beatIndex} />
		{/each}
	{:else}
		<p>Add a beat</p>
	{/if}
	<TimelineMenu on:beatAdded={() => scrollRight(timelineElement)} />
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
