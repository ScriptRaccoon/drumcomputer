<script lang="ts">
	import { Instrument } from "@/ts/Instrument";
</script>

<aside>
	{#each Instrument.list as instrument}
		<div>{instrument.name}</div>
	{/each}
</aside>

<style lang="scss">
	aside {
		position: sticky;
		left: 0;
		display: flex;
		flex-direction: column;
		row-gap: 0.125rem;
		color: var(--dark-font-color);
		background-image: linear-gradient(
			to right,
			var(--bg-color) 30%,
			transparent
		);
	}

	div {
		width: 6rem;
		height: var(--note-size);
		display: flex;
		align-items: center;
	}
</style>
